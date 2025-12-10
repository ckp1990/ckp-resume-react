from playwright.sync_api import sync_playwright

def verify_h1_color():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")

        # --- Light Mode Verification ---
        # Ensure we are in light mode (default or forced)
        # Note: The app defaults to system preference or local storage.
        # We can force light mode by clicking the toggle if it's currently dark, or setting local storage.

        # Let's try to detect current state by checking the 'dark' class on <html>
        is_dark = page.evaluate("document.documentElement.classList.contains('dark')")
        if is_dark:
            print("Currently in dark mode, switching to light mode...")
            page.get_by_label("Toggle dark mode").first.click()
            page.wait_for_timeout(500) # wait for transition

        print("Verifying Light Mode...")
        h1 = page.get_by_role("heading", level=1)
        expect_color(h1, "rgb(0, 0, 0)") # text-black is usually rgb(0,0,0)

        page.screenshot(path="verification/h1_light_mode.png")

        # --- Dark Mode Verification ---
        print("Switching to Dark Mode...")
        page.get_by_label("Toggle dark mode").first.click()
        page.wait_for_timeout(500) # wait for transition

        print("Verifying Dark Mode...")
        # Check if 'dark' class is added
        is_dark_now = page.evaluate("document.documentElement.classList.contains('dark')")
        if not is_dark_now:
            print("Failed to switch to dark mode!")
        else:
            # text-red-500 in tailwind is typically rgb(239, 68, 68)
            # text-red-600 is rgb(220, 38, 38)
            # The user requested 'red'. Let's verify it's red-ish.
            expect_color(h1, "rgb(239, 68, 68)")

        page.screenshot(path="verification/h1_dark_mode.png")

        browser.close()

def expect_color(locator, expected_rgb):
    # Get computed style
    color = locator.evaluate("element => window.getComputedStyle(element).color")
    print(f"Computed color: {color}, Expected: {expected_rgb}")
    # Simple check
    if color != expected_rgb:
        print(f"WARNING: Color mismatch! Expected {expected_rgb}, got {color}")

if __name__ == "__main__":
    verify_h1_color()
