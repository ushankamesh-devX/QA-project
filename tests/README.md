# Selenium Test Guide for QA App

This guide explains how to run automated Selenium tests for the login and signup functionality of your QA App.

## 🧪 Test Overview

The test suite includes comprehensive automation for:

### **Signup Tests** (`signup.test.js`)
- ✅ **Valid signup scenarios** - Creating new accounts with valid data
- ✅ **Form validation** - Password mismatch, short passwords, duplicate emails
- ✅ **Required field validation** - Empty field handling
- ✅ **UI interactions** - Error clearing, mode switching
- ✅ **Button states** - Loading states during submission

### **Login Tests** (`login.test.js`)
- ✅ **Valid login scenarios** - Successful authentication
- ✅ **Session persistence** - Token storage and validation
- ✅ **Invalid login scenarios** - Wrong credentials, empty fields
- ✅ **Form interactions** - Error handling, mode switching
- ✅ **Logout functionality** - Session cleanup

### **Integration Tests** (`integration.test.js`)
- ✅ **Full user journey** - Signup → Login → Logout → Login again
- ✅ **Multi-user scenarios** - User isolation and data integrity

## 🚀 Prerequisites

1. **Make sure your application is running:**
   ```bash
   npm run dev:full
   ```
   This should start:
   - Frontend on `http://localhost:5174`
   - Backend API on `http://localhost:3001`

2. **Chrome browser installed** (tests use Chrome WebDriver)

## 🎯 Running Tests

### **Run All Tests**
```bash
npm run test:selenium:all
```

### **Run Specific Test Suites**

**Signup Tests Only:**
```bash
npm run test:selenium:signup
```

**Login Tests Only:**
```bash
npm run test:selenium:login
```

**Integration Tests Only:**
```bash
npm run test:selenium:integration
```

### **Individual Test Files**
```bash
# Run specific test file
npx mocha tests/selenium/signup.test.js --timeout 30000
```

## 📊 Test Configuration

### **Browser Settings**
- **Headless Mode**: Tests run in headless Chrome (no visible browser window)
- **Window Size**: 1280x720 for consistent rendering
- **Timeouts**: 30 seconds for most tests, 45 seconds for integration tests

### **Test Data**
- **Unique Users**: Each test generates unique email addresses using timestamps
- **Test Passwords**: Default password is 'password123' (meets 6+ character requirement)
- **Cleanup**: Tests create and cleanup their own data

## 🔧 Test Architecture

### **TestHelper Class** (`testHelper.js`)
Central utility class providing:
- Browser initialization and cleanup
- Element waiting and interaction methods
- Custom helper methods for authentication flows
- Screenshot capabilities for debugging

### **Test Structure**
```
tests/
├── selenium/
│   ├── testHelper.js      # Utility functions
│   ├── signup.test.js     # Signup functionality tests
│   ├── login.test.js      # Login functionality tests
│   └── integration.test.js # End-to-end integration tests
├── screenshots/           # Screenshots for debugging
└── .mocharc.json         # Mocha configuration
```

## 📋 Test Cases Covered

### **Signup Functionality**
1. **Valid Account Creation**
   - Creates new user with valid data
   - Verifies successful redirect to dashboard
   - Validates user information display

2. **Form Validation**
   - Password mismatch detection
   - Minimum password length enforcement
   - Duplicate email prevention
   - Required field validation

3. **UI Behavior**
   - Error message clearing on input
   - Mode switching between login/signup
   - Button state changes during submission

### **Login Functionality**
1. **Valid Authentication**
   - Login with correct credentials
   - Session persistence across page refresh
   - User information display verification

2. **Invalid Authentication**
   - Wrong email handling
   - Wrong password handling
   - Empty field validation

3. **Session Management**
   - Token storage and validation
   - Logout functionality
   - Session cleanup verification

### **Integration Scenarios**
1. **Complete User Journey**
   - Signup → Dashboard → Logout → Login → Dashboard
   - Verifies end-to-end flow works seamlessly

2. **Multi-User Testing**
   - Creates multiple users
   - Verifies user data isolation
   - Prevents cross-contamination

## 🐛 Debugging

### **Screenshots**
Tests can capture screenshots for debugging:
```javascript
await helper.takeScreenshot('debug-screenshot.png');
```

### **Non-Headless Mode**
To see the browser during testing (for debugging), modify `testHelper.js`:
```javascript
// Comment out this line in testHelper.js
// options.addArguments('--headless');
```

### **Console Output**
Tests provide detailed console output showing:
- Test progress and status
- User accounts created during testing
- Success confirmations for each test step

## ⚠️ Important Notes

1. **Application Must Be Running**: Tests expect the app to be running on `http://localhost:5174`

2. **Database State**: Tests create real data in your SQLite database. Each test creates unique users so they don't interfere with each other.

3. **Browser Dependencies**: Tests require Chrome browser and ChromeDriver (installed via npm)

4. **Network Timing**: Tests include appropriate waits for network requests and UI updates

5. **Cleanup**: Tests handle their own cleanup (logout, etc.) but database entries persist

## 🚀 Example Test Run Output

```
  Signup Functionality Tests
    Valid Signup Scenarios
      ✅ should successfully create a new user account with valid data
      ✅ should display user information correctly after signup
    Form Validation Tests
      ✅ should show error when passwords do not match
      ✅ should show error when password is too short
      ✅ should show error when trying to register with existing email

  Login Functionality Tests
    Valid Login Scenarios
      ✅ should successfully login with valid credentials
      ✅ should maintain session and show dashboard when already logged in
    Invalid Login Scenarios
      ✅ should show error with incorrect email
      ✅ should show error with incorrect password

  Full Authentication Flow Integration Tests
    ✅ should complete full user journey: signup -> login -> logout -> login again
    ✅ should handle multiple users and prevent cross-contamination

  15 passing (45s)
```

## 📈 Extending Tests

To add new test cases:

1. **Add to existing files** for related functionality
2. **Create new test files** for new features
3. **Update TestHelper** with new utility methods
4. **Add npm scripts** for new test categories

### Example: Adding a new test
```javascript
it('should test new functionality', async function() {
  // Arrange
  const testData = helper.generateTestData();
  
  // Act
  await helper.goToHomePage();
  // ... test steps
  
  // Assert
  expect(result).to.equal(expected);
  console.log('✅ New test passed');
});
```

This comprehensive test suite ensures your authentication system works correctly across all user scenarios and edge cases!