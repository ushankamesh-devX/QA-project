import JiraApi from 'jira-client';

const jira = new JiraApi({
  protocol: 'https',
  host: 'devx.atlassian.net',  // Replace with your Jira instance
  username: 'ushankamesh33@gmail.com',    // Replace with your Jira email
  password: 'ATATT3xFfGF0HKiUWRLZz09efEaqyZqcZgHOkg9IUr8P2cGL6dkaZPCxxfo42brQ0TXCYWB74Cw3y6tACN9-pVwJwsKVkmAMX13WuyTlmccRT_N832EW8LueyVFBGEGoCRXQA3buXfr2FPHNZu4d0_ZjCe831vPx_LHpKvFiDy92sloe3qyowtc=706F1FF8',  
  apiVersion: '2',
  strictSSL: true
});

const rootCauseAnalysis = `h2. Detailed Root Cause Analysis for SQL Injection Vulnerability

h3. 1. Why It Happened
* *Direct Cause:*
** Direct use of user input in SQL queries without proper parameterization
** Current code in server/index.js directly concatenates user input into SQL queries
** Example of vulnerable code:
{code}
db.get('SELECT * FROM users WHERE email = ' + email)
{code}

* *Contributing Factors:*
** Lack of input validation middleware
** Missing security review process
** Absence of automated security testing
** No standardized database access patterns

h3. 2. How It Was Fixed
* *Implementation of Fix:*
** Replaced direct string concatenation with parameterized queries:
{code}
// Before (vulnerable):
db.get('SELECT * FROM users WHERE email = ' + email)

// After (secure):
db.get('SELECT * FROM users WHERE email = ?', [email])
{code}

* *Additional Security Measures:*
** Added input validation middleware
** Implemented request sanitization
** Added error handling for malformed inputs
** Updated all database queries to use parameterized statements

h3. 3. Prevention Strategies
* *Code Level Prevention:*
** Implement an ORM (Object-Relational Mapping) like Sequelize or Prisma
** Use prepared statements for all database queries
** Add input validation middleware for all routes
** Implement request sanitization

* *Process Level Prevention:*
** Establish security review checkpoints in development process
** Regular security training for development team
** Implement automated security testing in CI/CD pipeline
** Regular code audits focusing on security patterns

* *Testing Level Prevention:*
** Add automated security testing suite
** Include SQL injection tests in QA process
** Regular penetration testing
** Automated vulnerability scanning

h3. 4. Validation & Monitoring
* *Testing Conducted:*
** Penetration testing with various SQL injection payloads
** Unit tests for input validation
** Integration tests for database queries
** Security scanner verification

* *Ongoing Monitoring:*
** Log analysis for suspicious patterns
** Regular security assessments
** Database query monitoring
** Input validation error tracking

h3. 5. Long-term Recommendations
* Implement Database Access Layer
* Regular security training
* Automated security testing in CI/CD
* Regular third-party security audits
* Keep dependencies updated
* Document security best practices`;

async function addDetailedRootCauseAnalysis() {
  try {
    console.log('Adding detailed root cause analysis to QP-3...');
    await jira.addComment('QP-3', rootCauseAnalysis);
    console.log('Root cause analysis added successfully');
  } catch (error) {
    console.error('Error adding root cause analysis:', error);
  }
}

// Run the update
addDetailedRootCauseAnalysis();