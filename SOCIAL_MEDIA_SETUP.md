# Social Media Integration Setup

To enable automated posting to LinkedIn and Instagram when a new blog post is published, you need to configure the following secrets in your GitHub repository.

## 1. LinkedIn Setup

### Step 1: Create a LinkedIn App
1. Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/).
2. Create a new app (you'll need a LinkedIn Company Page to associate it with, but you can post to your personal profile).
3. Under the **Products** tab, request access to **Share on LinkedIn**.

### Step 2: Get Access Token (OAuth 2.0)
You need to generate an access token. Since this script runs on a server, you generally need a long-lived token.
1. Use the "Token Generator" tool in the Developer Portal (under "Tools" -> "OAuth Token Generator").
2. Select your app and the scope `w_member_social`.
3. Copy the **Access Token**.

*Note: LinkedIn tokens expire (usually after 60 days). You will need to regenerate and update this secret periodically.*

### Step 3: Get Your Person URN
1. Make a request to `https://api.linkedin.com/v2/me` using your access token.
   - You can do this via `curl` or Postman:
     ```bash
     curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://api.linkedin.com/v2/me
     ```
2. Look for the `id` field in the response (e.g., `12345ABCD`).
3. Your URN is `12345ABCD`. (The script adds the `urn:li:person:` prefix automatically, so just provide the ID, or if you provide the full URN, ensure the script handles it. **The current script expects just the ID part if it appends the prefix, but checking the code, it expects the ID part.**)
   - *Clarification:* The code uses `urn:li:person:${LINKEDIN_PERSON_URN}`, so please set `LINKEDIN_PERSON_URN` to just the ID (e.g., `12345ABCD`).

### Step 4: Add GitHub Secrets
Go to your GitHub Repo -> Settings -> Secrets and variables -> Actions -> New repository secret.
- **Name:** `LINKEDIN_ACCESS_TOKEN`
- **Value:** (Your Access Token)
- **Name:** `LINKEDIN_PERSON_URN`
- **Value:** (Your Person ID)

---

## 2. Instagram Setup

### Requirements
- An **Instagram Business** or **Creator** account.
- A **Facebook Page** connected to that Instagram account.

### Step 1: Create a Meta App
1. Go to [Meta for Developers](https://developers.facebook.com/).
2. Create a new app (Type: "Business").
3. Add the **Instagram Graph API** product.

### Step 2: Get Access Token
1. Go to the **Graph API Explorer** tool.
2. Select your Meta App.
3. Select "Get Token" -> "Get User Access Token".
4. Select the permissions: `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`.
5. Click "Generate Access Token".
6. **Important:** This is a short-lived token (1 hour). To get a long-lived token (60 days):
   - Click the "Info" icon next to the token string -> "Open in Access Token Tool".
   - Click "Extend Access Token".

### Step 3: Get Instagram Account ID
1. In the Graph API Explorer, run a GET request to:
   ```
   me/accounts?fields=instagram_business_account
   ```
2. Find the ID under `instagram_business_account.id`. This is your `INSTAGRAM_ACCOUNT_ID`.

### Step 4: Add GitHub Secrets
- **Name:** `INSTAGRAM_ACCESS_TOKEN`
- **Value:** (Your Long-Lived Access Token)
- **Name:** `INSTAGRAM_ACCOUNT_ID`
- **Value:** (Your Instagram Business Account ID)

---

## Troubleshooting

- **No Image:** Instagram requires an image. If your blog post markdown does not contain an image (e.g., `![alt](/images/pic.jpg)`), the script will skip Instagram posting.
- **Token Expiry:** Both LinkedIn and Facebook/Instagram tokens expire. If posting stops working, regenerate the tokens and update the GitHub Secrets.
