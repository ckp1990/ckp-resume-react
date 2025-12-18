# Social Media Integration Setup


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
Go to your GitHub Repo -> Settings -> Secrets and variables -> Actions -> New repository secret.
- **Name:** `INSTAGRAM_ACCESS_TOKEN`
- **Value:** (Your Long-Lived Access Token)
- **Name:** `INSTAGRAM_ACCOUNT_ID`
- **Value:** (Your Instagram Business Account ID)

---

## Troubleshooting

- **No Image:** Instagram requires an image. If your blog post markdown does not contain an image (e.g., `![alt](/images/pic.jpg)`), the script will skip Instagram posting.
- **Token Expiry:** Facebook/Instagram tokens expire (usually every 60 days). If posting stops working, regenerate the tokens and update the GitHub Secrets.
- **Token Expiry:** Both LinkedIn and Facebook/Instagram tokens expire. If posting stops working, regenerate the tokens and update the GitHub Secrets.
