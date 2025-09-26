const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to standard desktop size
  await page.setViewportSize({ width: 1280, height: 720 });

  // Navigate to login page
  await page.goto('http://localhost:3000/login');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ path: 'login-after.png', fullPage: true });
  console.log('Screenshot saved as login-after.png');

  await browser.close();
})();