from playwright.sync_api import sync_playwright, expect
import time

def verify_subscribe():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Navigate to home
            print("Navigating to home page...")
            page.goto("http://localhost:5173")

            # Wait for content to load
            page.wait_for_selector("header#home")
            print("Home page loaded.")

            # Click Subscribe link
            print("Clicking Subscribe link...")
            page.get_by_role("link", name="Subscribe").click()

            # Wait for Subscribe component
            print("Waiting for Subscribe form...")
            heading = page.get_by_role("heading", name="Subscribe to my Newsletter")
            expect(heading).to_be_visible()

            # Screenshot of the form
            print("Taking screenshot of Subscribe form...")
            page.screenshot(path="verification/subscribe_form.png")

            # Fill form
            print("Filling form...")
            page.fill("input#name", "Test User")
            page.fill("input#email", "test@example.com")

            # Submit
            print("Submitting form...")
            page.get_by_role("button", name="Subscribe").click()

            # Verify success
            print("Verifying success message...")
            success_heading = page.get_by_role("heading", name="Thank You!")
            expect(success_heading).to_be_visible()

            # Screenshot of success
            print("Taking screenshot of success message...")
            page.screenshot(path="verification/subscribe_success.png")

            # Click Return to Home
            print("Clicking Return to Home...")
            page.get_by_text("Return to Home").click()

            # Verify back at home
            expect(page.locator("header#home")).to_be_visible()
            print("Returned to home successfully.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_subscribe()
