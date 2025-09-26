how import JiraApi from 'jira-client';

// Jira configuration
const jira = new JiraApi({
  protocol: 'https',
  host: 'kpathum616.atlassian.net',
  username: 'kushandisnaka44@gmail.com',
  password: 'ATATT3xFfGF06SMi6JXN-5uN11QOKi7IPBOkTmF_-HQQeISx5vtwotgkDUpYfNl98kGHmThZmltqqMvd9sJf3xMvghCKh7kgXGJmKg-d0io_eK7ZAnC-HuXb3ZUk2r1sFnhZj3SdoqHGcWVHMl9vZAaz0i_iIiSF354Pide1lb808mC4-AfoRgo=BCFB4F7F',
  apiVersion: '2',
  strictSSL: true
});

// Bug descriptions
const sqlInjectionDescription = `h2. Issue Overview
The login and signup endpoints are vulnerable to SQL injection attacks due to direct parameter usage in SQL queries.

h2. Steps to Reproduce
# Send a POST request to /api/login with payload:
{code}
{
  "email": "' OR '1'='1",
  "password": "anypassword"
}
{code}
# The application may expose user data due to SQL injection

h2. Expected Result
* The application should safely handle special characters in input
* SQL injection attempts should be blocked

h2. Actual Result
* The application directly uses user input in SQL queries without proper parameterization

h2. Impact
* Potential unauthorized access to user accounts
* Possible data breach
* Security compliance issues

h2. Environment
* Node.js Backend
* SQLite Database
* Express.js Framework`;

const passwordResetDescription = `h2. Issue Overview
The application lacks password reset functionality, preventing users from recovering their accounts.

h2. Steps to Reproduce
# Log into the application
# Look for password reset options in:
 * Login page
 * User profile
 * Account settings
# Check all authentication-related endpoints

h2. Expected Result
* A secure password reset mechanism should be available
* Users should be able to request password reset via email

h2. Actual Result
* No password reset functionality exists
* Users cannot recover forgotten passwords

h2. Impact
* Users cannot recover forgotten passwords
* Increased support tickets
* Poor user experience

h2. Environment
* Node.js Backend
* React Frontend
* Express.js Framework`;

const rootCauseAnalysis = `h2. Root Cause Analysis

h3. Technical Details
* Current Implementation:
** Uses basic query string with parameters
** Relies on Node.js sqlite3 parameter binding, but not consistently

h3. Why It Happened
* Incomplete implementation of security best practices
* Lack of security review in development process
* Missing input validation and sanitization

h3. Fix Implementation
# Use parameterized queries consistently
# Implement input validation middleware
# Add request sanitization

h3. Prevention Strategies

*Code Level:*
* Use ORM (e.g., Sequelize, Prisma)
* Implement strict input validation
* Use prepared statements

*Process Level:*
* Regular security audits
* Automated security testing in CI/CD
* Developer security training

*Testing Level:*
* Add security testing suite
* Regular penetration testing
* Automated vulnerability scanning`;

// Issue definitions
const sqlInjectionBug = {
  fields: {
    project: { key: 'QP' },  // Your QA project key
    summary: 'SQL Injection Vulnerability in Authentication System',
    description: sqlInjectionDescription,
    issuetype: { name: 'Bug' },
    labels: ['security', 'authentication', 'critical-bug']
  }
};

const passwordResetBug = {
  fields: {
    project: { key: 'QP' },  // Your QA project key
    summary: 'Missing Password Reset Functionality',
    description: passwordResetDescription,
    issuetype: { name: 'Bug' },
    labels: ['feature-request', 'user-experience']
  }
};

// Create issues
async function createJiraIssues() {
  try {
    console.log('Creating SQL Injection bug...');
    const issue1 = await jira.addNewIssue(sqlInjectionBug);
    console.log('SQL Injection bug created:', issue1.key);

    console.log('Creating Password Reset bug...');
    const issue2 = await jira.addNewIssue(passwordResetBug);
    console.log('Password Reset bug created:', issue2.key);

    // Add root cause analysis as a comment to SQL Injection bug
    console.log('Adding root cause analysis...');
    await jira.addComment(issue1.key, rootCauseAnalysis);
    console.log('Root cause analysis added');

    console.log('All issues created successfully!');
  } catch (error) {
    console.error('Error creating issues:', error);
  }
}

// Run the automation
createJiraIssues();