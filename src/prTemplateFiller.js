
/**
 * Annotated bookmarklet
 */
function() {
  // team variables
  const teamName = 'Domains';
  const teamCode = 'DOMS';
  // get branch name and pr description
  const branchName = document.querySelector('details#head-ref-selector span').value;
  let prDescription = document.querySelector('textarea#pull_request_body').innerHTML;
  // check branch name for jira ticket number
  const [ticketId] = branchName.match(/[a-zA-Z]{3,6}\-\d{1,6}/) || [];
  let prTitle = branchName;

  if (ticketId) {
    const [prefix = '', description = ''] = branchName.split(ticketId);
    const capitalizedDescription = description[0].toUpperCase() + description.slice(1);
    prTitle = prefix + ticketId.toUpperCase() + capitalizedDescription.replace(/\-/g, ' ');
    
    // format jira ticket link
    const jiraTicketLink = 'https://squarespace.atlassian.net/browse/' + ticketId;
    prDescription = prDescription.replace('(Fill in the PR Title here)', jiraTicketLink);
  }
  
  // format PR title with branch name and jira ticket number
  document.querySelector('input#pull_request_title').value = prTitle;

  // Format and update team jira link
  const teamJiraLink = `[${teamName}](https://squarespace.atlassian.net/browse/${teamCode})`;
  prDescription = prDescription.replace(/###\s(.*?)\n/, '### ' + teamJiraLink + '\n');

  // replace PR title and team link with formatted versions
  document.querySelector('textarea#pull_request_body').value = prDescription;
}

/**
 * Formatted bookmarklet without annotations. Copy-paste this into the location of a bookmark to save functionality.
 */

javascript:(function(){
  const teamName = 'Domains';
  const teamCode = 'DOMS';
  const branchName = document.querySelector('details#head-ref-selector span').innerHTML;
  let prDescription = document.querySelector('textarea#pull_request_body').value;

  const [ticketId] = branchName.match(/[a-zA-Z]{3,6}\-\d{1,6}/) || [];
  let prTitle = branchName;

  if (ticketId) {
    const [prefix = '', description = ''] = branchName.split(ticketId);
    const capitalizedDescription = description[0].toUpperCase() + description.slice(1);
    prTitle = prefix + ticketId.toUpperCase() + capitalizedDescription.replace(/\-/g, ' ');
    
    const jiraTicketLink = 'https://squarespace.atlassian.net/browse/' + ticketId;
    prDescription = prDescription.replace('(Fill in the PR Title here)', jiraTicketLink);
  }
  
  document.querySelector('input#pull_request_title').value = prTitle;

  const teamJiraLink = `[${teamName}](https://squarespace.atlassian.net/browse/${teamCode})`;
  prDescription = prDescription.replace(/###\s(.*?)\n/, '### ' + teamJiraLink + '\n');

  document.querySelector('textarea#pull_request_body').value = prDescription;
})();