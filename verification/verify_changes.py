from playwright.sync_api import sync_playwright, expect
import re

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:5173")

        # Check H1 color
        # We need to wait for the H1 to appear
        h1 = page.get_by_role("heading", level=1).first
        expect(h1).to_be_visible()

        # Check if it has the text-red-600 class
        # We can check class attribute
        expect(h1).to_have_class(re.compile(r"text-red-600"))

        # Verify logos are present
        # We scroll to affiliations
        page.locator("#affiliations").scroll_into_view_if_needed()

        # Check for logos (images)
        # Assuming they are rendered as img tags
        # We can check if specific src attributes are present and if they load

        # List of logos to check
        logos = [
            "cws-logo.png",
            "mahe-logo.png",
            "ncbs-logo.png",
            "wsa-logo.png",
            "tnpn-logo.png",
            "sjce-logo.png",
            "iisc-logo.png"
        ]

        for logo in logos:
            # Look for img with src containing the logo filename
            img = page.locator(f"img[src*='{logo}']").first
            if img.count() > 0:
                print(f"Logo element found for {logo}")
                # Optional: Check if naturalWidth > 0 to verify it loaded
                is_visible = img.is_visible()
                print(f"Logo {logo} visible: {is_visible}")
            else:
                print(f"Logo element NOT found for {logo}")

        # Take a screenshot
        page.screenshot(path="verification/verification_logos_h1.png")
        print("Screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
