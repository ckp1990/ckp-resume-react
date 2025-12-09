from playwright.sync_api import sync_playwright, expect
import re

def verify_dark_mode():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:5173")

        # Check if the dark mode toggle button exists
        toggle_button = page.get_by_label("Toggle dark mode").first
        expect(toggle_button).to_be_visible()

        # Click the toggle button to enable dark mode
        toggle_button.click()

        # Check if the dark class is added to the html element
        # We can just check if the class attribute contains 'dark'
        html_element = page.locator("html")
        expect(html_element).to_have_class(re.compile(r"dark"))

        # Verify the affiliations link is present
        aff_link = page.locator("a[href='https://www.thenaturepeoplenetwork.org/']")
        page.locator("#affiliations").scroll_into_view_if_needed()
        expect(aff_link).to_be_visible()

        print("Verification successful: Dark mode toggled and affiliation link found.")

        browser.close()

if __name__ == "__main__":
    verify_dark_mode()
