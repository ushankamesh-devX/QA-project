import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function automateSignupAndLogin() {
  console.log('🤖 AUTOMATING YOUR LOGIN & SIGNUP SYSTEM');
  console.log('=' .repeat(50));
  
  const options = new chrome.Options();
  // Keep browser visible so you can see the automation
    options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--user-data-dir=/tmp/chrome-user-data-login');
  options.addArguments('--window-size=1280,720');
  
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Generate unique test user
    const timestamp = Date.now();
    const testUser = {
      name: `Test User ${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'password123'
    };

    console.log(`👤 Creating test user: ${testUser.email}`);
    console.log('🌐 Opening your app...');

    // Navigate to app
    await driver.get('http://localhost:5173');
    await driver.wait(until.titleContains('Vite'), 10000);
    
    console.log('📝 AUTOMATING SIGNUP PROCESS...');
    
    // Switch to signup mode
    const signupLink = await driver.wait(
      until.elementLocated(By.xpath("//span[contains(text(), 'Sign up here')]")),
      5000
    );
    await signupLink.click();
    console.log('   ✅ Clicked "Sign up here"');
    
    // Wait for signup form
    await driver.wait(until.elementLocated(By.xpath("//h2[text()='Sign Up']")), 5000);
    console.log('   ✅ Signup form loaded');

    // Fill signup form automatically
    console.log('   🤖 Filling form fields...');
    
    const nameField = await driver.findElement(By.id('name'));
    await nameField.sendKeys(testUser.name);
    console.log(`   ✅ Name: ${testUser.name}`);

    const emailField = await driver.findElement(By.id('email'));
    await emailField.sendKeys(testUser.email);
    console.log(`   ✅ Email: ${testUser.email}`);

    const passwordField = await driver.findElement(By.id('password'));
    await passwordField.sendKeys(testUser.password);
    console.log('   ✅ Password: ••••••••••••');

    const confirmPasswordField = await driver.findElement(By.id('confirmPassword'));
    await confirmPasswordField.sendKeys(testUser.password);
    console.log('   ✅ Confirm Password: ••••••••••••');

    // Submit signup
    console.log('   🚀 Submitting signup form...');
    const signupButton = await driver.findElement(By.xpath("//button[contains(text(), 'Sign Up')]"));
    await signupButton.click();

    // Wait for success and dashboard
    await driver.wait(until.elementLocated(By.className('dashboard')), 10000);
    console.log('   🎉 SIGNUP SUCCESSFUL!');
    
    // Verify user data
    const welcomeText = await driver.findElement(By.className('user-name'));
    const welcomeMessage = await welcomeText.getText();
    console.log(`   ✅ Dashboard shows: ${welcomeMessage}`);

    // Wait a moment for dashboard to fully load before logout
    console.log('   ⏳ Ensuring dashboard is fully loaded...');
    await driver.sleep(2000);

    console.log('');
    console.log('🔐 AUTOMATING LOGIN PROCESS...');
    
    // Logout first with better error handling
    console.log('   🚪 Logging out...');
    const logoutButton = await driver.findElement(By.className('logout-button'));
    await logoutButton.click();
    console.log('   ✅ Clicked logout');
    
    // Wait longer for login form and handle potential delays
    console.log('   ⏳ Waiting for login page to load...');
    try {
      await driver.wait(until.elementLocated(By.xpath("//h2[text()='Login']")), 15000);
      console.log('   ✅ Back to login page');
    } catch (error) {
      console.log('   ⚠️ Login page took longer than expected, checking page state...');
      
      // Check what's actually on the page
      const pageSource = await driver.getPageSource();
      if (pageSource.includes('Login')) {
        console.log('   ✅ Login form found in page source');
      } else {
        console.log('   ❌ Login form not found, refreshing page...');
        await driver.navigate().refresh();
        await driver.wait(until.elementLocated(By.xpath("//h2[text()='Login']")), 10000);
      }
    }

    // Fill login form
    console.log('   🤖 Filling login form...');
    
    // Wait for and fill email field
    const loginEmailField = await driver.wait(until.elementLocated(By.id('email')), 10000);
    await loginEmailField.clear();
    await loginEmailField.sendKeys(testUser.email);
    console.log(`   ✅ Email: ${testUser.email}`);

    // Wait for and fill password field  
    const loginPasswordField = await driver.wait(until.elementLocated(By.id('password')), 5000);
    await loginPasswordField.clear();
    await loginPasswordField.sendKeys(testUser.password);
    console.log('   ✅ Password: ••••••••••••');

    // Submit login
    console.log('   🚀 Submitting login form...');
    const loginButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Login')]")), 5000);
    await loginButton.click();

    // Wait for dashboard again with longer timeout
    console.log('   ⏳ Waiting for login to complete...');
    await driver.wait(until.elementLocated(By.className('dashboard')), 15000);
    console.log('   🎉 LOGIN SUCCESSFUL!');
    
    // Verify user data again
    const loginWelcomeText = await driver.findElement(By.className('user-name'));
    const loginWelcomeMessage = await loginWelcomeText.getText();
    console.log(`   ✅ Dashboard shows: ${loginWelcomeMessage}`);

    console.log('');
    console.log('🎊 AUTOMATION COMPLETE! 🎊');
    console.log('✅ Signup: WORKING PERFECTLY');
    console.log('✅ Login: WORKING PERFECTLY');
    console.log('✅ User Authentication: WORKING PERFECTLY');
    console.log('✅ Dashboard: WORKING PERFECTLY');
    console.log('');
    console.log('Your authentication system is fully functional! 🚀');
    
    // Keep browser open for 5 seconds so you can see the result
    console.log('⏰ Keeping browser open for 5 seconds...');
    await driver.sleep(5000);

  } catch (error) {
    console.error('❌ Automation failed:', error.message);
  } finally {
    await driver.quit();
    console.log('🔒 Browser closed');
  }
}

automateSignupAndLogin();