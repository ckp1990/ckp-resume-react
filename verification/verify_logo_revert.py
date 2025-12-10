from playwright.sync_api import sync_playwright

def verify_logo_change():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:5173")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # Take a screenshot of the hero section where the logo (profile image) is
        # The hero section has id="home"

        # Wait for the image to be visible
        # The image has an alt text of "Chandan Kumar Pandey" (from personal.json name field)
        image_locator = page.get_by_alt_text("Chandan Kumar Pandey")
        image_locator.wait_for(state="visible")

        # Take a screenshot of the whole page, or just the hero section
        # Let's take the whole page first
        page.screenshot(path="verification/page_screenshot_reverted.png")

        # Take a screenshot of just the profile image
        image_locator.screenshot(path="verification/profile_image_screenshot_reverted.png")

        print("Screenshots taken.")
        browser.close()

if __name__ == "__main__":
    verify_logo_change()
