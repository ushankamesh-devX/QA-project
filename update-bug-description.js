import JiraApi from 'jira-client';

const jira = new JiraApi({
  protocol: 'https',
  host: 'devx.atlassian.net',  // Replace with your Jira instance
  username: 'ushankamesh33@gmail.com',    // Replace with your Jira email
  password: 'ATATT3xFfGF0HKiUWRLZz09efEaqyZqcZgHOkg9IUr8P2cGL6dkaZPCxxfo42brQ0TXCYWB74Cw3y6tACN9-pVwJwsKVkmAMX13WuyTlmccRT_N832EW8LueyVFBGEGoCRXQA3buXfr2FPHNZu4d0_ZjCe831vPx_LHpKvFiDy92sloe3qyowtc=706F1FF8',  
  apiVersion: '2',
  strictSSL: true
});

const updatedDescription = `h2. Bug Description
Missing critical security feature: Password Reset functionality in the authentication system.

h2. Severity
Major - Users cannot recover accounts if passwords are forgotten, leading to potential account lockouts.

h2. Detailed Steps to Reproduce
# Prerequisites:
* A registered user account
* Access to the application's login page
* Browser: Chrome/Firefox/Safari (latest version)

# Test Scenario 1 - Login Page:
# Navigate to http://localhost:3000/login
# Look for "Forgot Password" or similar link
# Expected: Should find a password reset link
# Actual: No password reset option available

# Test Scenario 2 - User Settings:
# Log in to the application with valid credentials
# Navigate to user profile or settings page
# Look for password change/reset option
# Expected: Should find password management options
# Actual: No password management features found

# Test Scenario 3 - API Endpoints:
# Using Postman or similar tool
# Check for password reset endpoints:
## GET /api/reset-password
## POST /api/reset-password
# Expected: Endpoints should exist
# Actual: No password reset endpoints implemented

h2. Expected Results
* "Forgot Password" link on login page
* Password reset request form
* Email-based password reset flow
* Secure token-based reset process
* Password change option in user settings

h2. Actual Results
* No password reset functionality exists
* No "Forgot Password" link on login page
* No API endpoints for password reset
* No user settings for password management

h2. Environment Details
* Frontend: React.js application
* Backend: Node.js/Express
* Database: SQLite
* Browser: Chrome 116.0.5845.188
* OS: Windows 10/11

h2. Impact
* Users cannot recover forgotten passwords
* Increased support requests for account recovery
* Poor user experience
* Security risk if users reuse passwords
* Potential loss of users who cannot access accounts

h2. Additional Notes
* Feature is standard in modern authentication systems
* Required for security compliance
* Critical for user account management`;

async function updateBugDescription() {
  try {
    console.log('Updating QP-4 with detailed reproduction steps...');
    await jira.updateIssue('QP-4', {
      fields: {
        description: updatedDescription
      }
    });
    console.log('Bug description updated successfully');
  } catch (error) {
    console.error('Error updating bug description:', error);
  }
}

// Run the update
updateBugDescription();