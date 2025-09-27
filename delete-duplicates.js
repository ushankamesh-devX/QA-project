import JiraApi from 'jira-client';

const jira = new JiraApi({
  protocol: 'https',
  host: 'kpathum616.atlassian.net',
  username: 'kushandisnaka44@gmail.com',
  password: 'ATATT3xFfGF06SMi6JXN-5uN11QOKi7IPBOkTmF_-HQQeISx5vtwotgkDUpYfNl98kGHmThZmltqqMvd9sJf3xMvghCKh7kgXGJmKg-d0io_eK7ZAnC-HuXb3ZUk2r1sFnhZj3SdoqHGcWVHMl9vZAaz0i_iIiSF354Pide1lb808mC4-AfoRgo=BCFB4F7F',
  apiVersion: '2',
  strictSSL: true
});

async function deleteDuplicateIssues() {
  try {
    console.log('Deleting QP-1...');
    await jira.deleteIssue('QP-1');
    console.log('QP-1 deleted successfully');

    console.log('Deleting QP-2...');
    await jira.deleteIssue('QP-2');
    console.log('QP-2 deleted successfully');

    console.log('All duplicate issues have been deleted');
  } catch (error) {
    console.error('Error deleting issues:', error);
  }
}

// Run the cleanup
deleteDuplicateIssues();