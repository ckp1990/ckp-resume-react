const fs = require('fs');
const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

// Configuration
const BLOG_FILE_PATH = 'src/data/blog.json';
const WEBHOOK_URL = process.env.GAS_WEBHOOK_URL;
const SITE_URL = process.env.SITE_URL || 'https://chandankp.com';
const BASE_SHA = process.env.BASE_SHA || 'HEAD^'; // Default to HEAD^ if not provided

// Social Media Configuration
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID;

// Helper function for making HTTPS requests (Promise-based)
function makeRequest(url, method, headers, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: headers
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch (e) {
            resolve(body); // Return raw body if not JSON
          }
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

// Function to extract the first image from markdown content
function extractImage(content) {
  if (!content) return null;
  // Match standard markdown image: ![alt](url)
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = content.match(regex);
  if (match && match[1]) {
    let imageUrl = match[1];
    // If it's a relative path, prepend the site URL
    if (imageUrl.startsWith('/')) {
      imageUrl = `${SITE_URL}${imageUrl}`;
    } else if (!imageUrl.startsWith('http')) {
      // Assuming relative without slash is also from root or check context
      // For safety, prepend slash if missing and site url
      imageUrl = `${SITE_URL}/${imageUrl}`;
    }
    return imageUrl;
  }
  return null;
}

// LinkedIn Publishing
async function postToLinkedIn(post, link) {
  if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_PERSON_URN) {
    console.log('Skipping LinkedIn: Missing credentials.');
    return;
  }

  console.log(`Posting to LinkedIn: ${post.title}`);

  const payload = {
    author: `urn:li:person:${LINKEDIN_PERSON_URN}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: `${post.title}\n\n${post.excerpt || ''}\n\nRead more: ${link}`
        },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            description: {
              text: post.excerpt || post.title
            },
            originalUrl: link,
            title: {
              text: post.title
            }
          }
        ]
      }
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  };

  try {
    await makeRequest(
      'https://api.linkedin.com/v2/ugcPosts',
      'POST',
      {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      payload
    );
    console.log('Successfully posted to LinkedIn.');
  } catch (error) {
    console.error('Error posting to LinkedIn:', error.message);
  }
}

// Instagram Publishing
async function postToInstagram(post, link, imageUrl) {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_ACCOUNT_ID) {
    console.log('Skipping Instagram: Missing credentials.');
    return;
  }

  if (!imageUrl) {
    console.log('Skipping Instagram: No image found in post.');
    return;
  }

  console.log(`Posting to Instagram: ${post.title}`);

  // Step 1: Create Media Container
  try {
    const containerParams = new URLSearchParams({
      image_url: imageUrl,
      caption: `${post.title}\n\n${post.excerpt || ''}\n\nLink in bio!`,
      access_token: INSTAGRAM_ACCESS_TOKEN
    });

    const containerResponse = await makeRequest(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media?${containerParams.toString()}`,
      'POST'
    );

    const creationId = containerResponse.id;
    if (!creationId) throw new Error('Failed to create media container');

    console.log(`Instagram Media Container created ID: ${creationId}`);

    // Step 2: Publish Media
    const publishParams = new URLSearchParams({
      creation_id: creationId,
      access_token: INSTAGRAM_ACCESS_TOKEN
    });

    await makeRequest(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish?${publishParams.toString()}`,
      'POST'
    );

    console.log('Successfully posted to Instagram.');

  } catch (error) {
    console.error('Error posting to Instagram:', error.message);
  }
}

// Main Logic
async function main() {
  // Select http or https module based on the URL (Legacy GAS webhook support)
  const client = WEBHOOK_URL && WEBHOOK_URL.startsWith('http:') ? http : https;

  // 1. Get Current Content
  let currentBlogData;
  try {
    const currentContent = fs.readFileSync(BLOG_FILE_PATH, 'utf8');
    currentBlogData = JSON.parse(currentContent);
  } catch (e) {
    console.error('Error reading current blog.json:', e);
    process.exit(1);
  }

  // 2. Get Previous Content (via git)
  let previousBlogData;
  try {
    const previousContent = execSync(`git show ${BASE_SHA}:${BLOG_FILE_PATH}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    previousBlogData = JSON.parse(previousContent);
  } catch (e) {
    console.log(`Could not read previous version of blog.json from ${BASE_SHA}. Assuming all posts are new.`);
    previousBlogData = { posts: [] };
  }

  // 3. Find New or Newly Published Posts
  const currentPosts = currentBlogData.posts || [];
  const previousPosts = previousBlogData.posts || [];
  const previousPostsMap = new Map();
  previousPosts.forEach(p => previousPostsMap.set(p.id, p));

  const postsToNotify = currentPosts.filter(post => {
    if (!post.published) return false;
    const previousPost = previousPostsMap.get(post.id);
    if (!previousPost) return true;
    if (!previousPost.published) return true;
    return false;
  });

  if (postsToNotify.length === 0) {
    console.log('No new or newly published posts detected.');
    process.exit(0);
  }

  // 4. Process each post
  for (const post of postsToNotify) {
    console.log(`Processing post: ${post.title}`);
    const postLink = `${SITE_URL}/#blog/${post.slug}`;
    const imageUrl = extractImage(post.content);

    // Send Email Notification (Legacy)
    if (WEBHOOK_URL) {
      console.log(`Triggering email notification for: ${post.title}`);
      const payload = JSON.stringify({
        action: "new_post",
        title: post.title,
        summary: post.excerpt,
        link: postLink
      });

      const url = new URL(WEBHOOK_URL);
      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = client.request(options, (res) => {
        console.log(`Email notification sent. Status: ${res.statusCode}`);
      });
      req.on('error', (e) => console.error(`Error sending email notification: ${e}`));
      req.write(payload);
      req.end();
    } else {
      console.log('No GAS_WEBHOOK_URL set. Skipping email notification.');
    }

    // Post to Social Media
    await postToLinkedIn(post, postLink);
    await postToInstagram(post, postLink, imageUrl);
  }
}

main().catch(err => {
  console.error('Script execution failed:', err);
  process.exit(1);
});
