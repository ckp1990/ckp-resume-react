const fs = require('fs');
const https = require(process.env.GAS_WEBHOOK_URL.startsWith("http:") ? "http" : "https");
const { execSync } = require('child_process');

// Configuration
const BLOG_FILE_PATH = 'src/data/blog.json';
const WEBHOOK_URL = process.env.GAS_WEBHOOK_URL;
const SITE_URL = process.env.SITE_URL || 'https://chandankp.com';
const BASE_SHA = process.env.BASE_SHA || 'HEAD^'; // Default to HEAD^ if not provided

if (!WEBHOOK_URL) {
  console.log('No GAS_WEBHOOK_URL environment variable set. Skipping notification.');
  process.exit(0);
}

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
// We use the BASE_SHA passed from GitHub Actions (the commit before the push)
// to ensure we capture changes even if multiple commits were pushed at once.
let previousBlogData;
try {
  // Use git show to get the file from the base commit
  const previousContent = execSync(`git show ${BASE_SHA}:${BLOG_FILE_PATH}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  previousBlogData = JSON.parse(previousContent);
} catch (e) {
  console.log(`Could not read previous version of blog.json from ${BASE_SHA}. Assuming all posts are new.`);
  previousBlogData = { posts: [] };
}

// 3. Find New or Newly Published Posts
const currentPosts = currentBlogData.posts || [];
const previousPosts = previousBlogData.posts || [];

// Create a Map of previous posts by ID for easy lookup
const previousPostsMap = new Map();
previousPosts.forEach(p => previousPostsMap.set(p.id, p));

// Identify posts that should trigger a notification
const postsToNotify = currentPosts.filter(post => {
  // Must be currently published
  if (!post.published) return false;

  const previousPost = previousPostsMap.get(post.id);

  // Scenario A: Post is completely new (ID not in previous)
  if (!previousPost) return true;

  // Scenario B: Post existed but was previously a draft (published: false)
  if (!previousPost.published) return true;

  // Scenario C: Post existed and was published. We do NOT notify.
  // (Even if title changed, we generally don't blast emails for edits)
  return false;
});

if (postsToNotify.length === 0) {
  console.log('No new or newly published posts detected.');
  process.exit(0);
}

// 4. Notify for each identified post
postsToNotify.forEach(post => {
  console.log(`Triggering notification for: ${post.title}`);

  const postLink = `${SITE_URL}/#blog/${post.slug}`;

  const payload = JSON.stringify({
    action: "new_post",
    title: post.title,
    summary: post.excerpt,
    link: postLink
  });

  const url = new URL(WEBHOOK_URL);

  const options = {
    hostname: url.hostname, port: url.port,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Notification sent for "${post.title}". Status: ${res.statusCode}`);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(`Error sending notification: ${e}`);
  });

  req.write(payload);
  req.end();
});
