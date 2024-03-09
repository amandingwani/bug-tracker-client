import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import { Ticket, TicketPriorityArr, TicketStatusArr, TicketType } from 'src/redux/types';
import { CreateTicketApiData } from 'src/services/projects';
import { demoUser } from 'src/redux/constants';

const ticketTitleAndDesc: { title: string; description: string; type: TicketType }[] = [
  {
    title: 'Bug in Algorithmic Logic',
    type: 'BUG',
    description:
      'The algorithm is producing incorrect results under certain edge cases. Investigate and fix the logic flaw.',
  },
  {
    title: 'UI Rendering Issue in Mobile View',
    type: 'BUG',
    description:
      'Elements are not rendering properly on mobile devices. Adjust the CSS to ensure a responsive design.',
  },
  {
    title: 'Security Vulnerability: SQL Injection Risk',
    type: 'BUG',
    description:
      'Identify and patch a potential SQL injection vulnerability in the database interaction layer.',
  },
  {
    title: 'Compatibility Bug: Internet Explorer',
    type: 'BUG',
    description:
      'Identify and fix issues causing the application to malfunction in Internet Explorer.',
  },
  {
    title: 'Memory Leak in Background Service',
    type: 'BUG',
    description:
      'There is a memory leak in a background service. Investigate and optimize resource usage.',
  },
  {
    title: 'Data Synchronization Bug',
    type: 'BUG',
    description:
      'Data is not synchronizing correctly between the server and client applications. Address the synchronization issue.',
  },
  {
    title: 'Broken Link in User Documentation',
    type: 'BUG',
    description:
      'A link in the user documentation is broken. Update the link to the correct location.',
  },
  {
    title: 'Cross-Browser CSS Bug',
    type: 'BUG',
    description:
      'Resolve a bug causing CSS issues in certain browsers. Ensure a consistent appearance across browsers.',
  },
  {
    title: 'Authentication Token Expiry Bug',
    type: 'BUG',
    description:
      'Users are being unexpectedly logged out due to token expiry issues. Adjust the token expiration settings.',
  },
  {
    title: 'Error Handling Bug in API',
    type: 'BUG',
    description:
      'Improve error handling and messaging in the API to provide more informative responses.',
  },
  {
    title: 'Implement User Authentication System',
    type: 'TASK',
    description:
      'Develop a secure user authentication system, including registration, login, and password recovery.',
  },
  {
    title: 'Refactor Legacy Codebase',
    type: 'TASK',
    description: 'Conduct a codebase refactoring to improve maintainability and readability.',
  },
  {
    title: 'Integrate Third-Party API',
    type: 'TASK',
    description: "Integrate a third-party API to enhance the application's functionality.",
  },
  {
    title: 'Code Documentation',
    type: 'TASK',
    description:
      'Generate comprehensive code documentation to assist developers in understanding and contributing to the codebase.',
  },
  {
    title: 'Create Unit Tests for Core Modules',
    type: 'TASK',
    description:
      'Develop unit tests for critical modules to ensure robustness and prevent regressions.',
  },
  {
    title: 'Implement User Profile Management',
    type: 'TASK',
    description:
      'Allow users to manage their profiles, including profile pictures and account settings.',
  },
  {
    title: 'Optimize Database Queries',
    type: 'TASK',
    description:
      'Identify and optimize slow-performing database queries to improve overall application performance.',
  },
  {
    title: 'Implement Email Notification System',
    type: 'TASK',
    description:
      'Develop a system for sending email notifications to users for various events and updates.',
  },
  {
    title: 'Design and Implement Dashboard',
    type: 'TASK',
    description:
      'Create an interactive dashboard to provide users with a visual overview of project metrics and progress.',
  },
  {
    title: 'Implement Version Control Integration',
    type: 'TASK',
    description:
      'Integrate version control systems (e.g., Git) to streamline collaboration and code management.',
  },
  {
    title: '404 Error on Password Reset Page',
    type: 'BUG',
    description:
      'Users are encountering a 404 error when attempting to reset their passwords. Investigate and resolve the issue.',
  },
  {
    title: 'Authentication Token Refresh Bug',
    type: 'BUG',
    description:
      'Fix a bug that prevents authentication tokens from being properly refreshed, leading to unexpected logouts.',
  },
  {
    title: 'Concurrency Bug in User Profile Updates',
    type: 'BUG',
    description:
      'Resolve a concurrency issue where simultaneous updates to user profiles may lead to data inconsistency.',
  },
  {
    title: 'Graphical Distortion on High-Resolution Displays',
    type: 'BUG',
    description:
      'Correct graphical distortion issues that occur when the application is displayed on high-resolution screens.',
  },
  {
    title: 'Incomplete Error Messages in Logs',
    type: 'BUG',
    description:
      'Enhance error logging by providing more detailed and informative error messages for easier debugging.',
  },
  {
    title: 'Unnecessary Database Queries',
    description:
      'Review and eliminate unnecessary database queries to improve overall system efficiency.',
    type: 'BUG',
  },
  {
    title: 'Logout Button Functional Bug',
    description:
      'Fix a bug where the logout button is not functioning as expected in certain scenarios.',
    type: 'BUG',
  },
  {
    title: 'Notification Preferences Bug',
    description:
      'Users are unable to update their notification preferences. Investigate and fix the bug in the preferences system.',
    type: 'BUG',
  },
  {
    title: 'Incorrect Email Notifications',
    description:
      'Resolve inconsistencies in the delivery of email notifications for different user actions.',
    type: 'BUG',
  },
  {
    title: 'CSS Styling Conflict with External Library',
    description:
      'Identify and address styling conflicts that arise when integrating with a third-party CSS library.',
    type: 'BUG',
  },
  {
    title: 'Broken Link in Documentation',
    description:
      'Identify and fix a broken link in the project documentation leading to a missing resource.',
    type: 'BUG',
  },
  {
    title: 'Data Validation Bug',
    description:
      'Enhance data validation to prevent incorrect or malicious data from being processed.',
    type: 'BUG',
  },
  {
    title: 'Slow Response Time in Dashboard',
    description:
      'Improve the response time of the dashboard, which is currently experiencing delays in loading data.',
    type: 'BUG',
  },
  {
    title: 'Inconsistent Styling Across Browsers',
    description:
      'Address styling inconsistencies that occur when the application is accessed using different web browsers.',
    type: 'BUG',
  },
  {
    title: 'Implement Feature Flagging System',
    description:
      'Introduce a feature flagging system to enable or disable specific features dynamically.',
    type: 'TASK',
  },
  {
    title: 'Enhance User Account Settings',
    description: 'Provide users with additional options and settings to customize their accounts.',
    type: 'TASK',
  },
  {
    title: 'Integrate Code Profiling Tools',
    description:
      'Integrate tools for code profiling to identify performance bottlenecks and areas for improvement.',
    type: 'TASK',
  },
  {
    title: 'Implement Project Templates',
    description:
      'Create a system for defining and using project templates for faster project setup.',
    type: 'TASK',
  },
  {
    title: 'Enhance Search Algorithm with Autocomplete',
    description:
      'Improve the search algorithm by adding autocomplete functionality for quicker and more accurate results.',
    type: 'TASK',
  },
  {
    title: 'Implement Single Sign-On (SSO)',
    description:
      'Integrate single sign-on capabilities to streamline user authentication across multiple applications.',
    type: 'TASK',
  },
  {
    title: 'Automated Security Scans',
    description:
      'Set up automated security scans to identify and address potential vulnerabilities in the codebase.',
    type: 'TASK',
  },
  {
    title: 'Enhance Logging for Audit Trail',
    description:
      'Improve logging to create a comprehensive audit trail for user actions and system events.',
    type: 'TASK',
  },
  {
    title: 'Integration with Project Management Tools',
    description:
      'Integrate with popular project management tools to enhance collaboration and task management.',
    type: 'TASK',
  },
  {
    title: 'Implement Rate Limiting for API',
    description:
      'Introduce rate limiting on API requests to prevent abuse and ensure fair resource usage.',
    type: 'TASK',
  },
  {
    title: '404 Error on Password Reset Page',
    description:
      'Users are encountering a 404 error when attempting to reset their passwords. Investigate and resolve the issue.',
    type: 'BUG',
  },
  {
    title: 'Notification Email Spelling Error',
    description:
      'Fix a spelling error in notification emails that may cause confusion among users.',
    type: 'BUG',
  },
  {
    title: 'Responsive Design Bug on Tablets',
    description:
      'Address a bug in the responsive design that affects the layout on tablet devices.',
    type: 'BUG',
  },
  {
    title: 'Incomplete Error Handling for File Uploads',
    description:
      'Enhance error handling for file uploads to provide clearer messages in case of failures.',
    type: 'BUG',
  },
  {
    title: 'Access Control Bug: Unauthorized Access',
    description: 'Identify and fix a bug allowing unauthorized access to certain features or data.',
    type: 'BUG',
  },
  {
    title: 'Performance Lag in Real-Time Features',
    description:
      'Investigate and optimize performance issues in real-time features, such as live updates.',
    type: 'BUG',
  },
  {
    title: 'Mobile App UI Misalignment Bug',
    description:
      'Correct misalignments in the user interface that are specifically noticeable on mobile devices.',
    type: 'BUG',
  },
  {
    title: 'Localization Bug: Date Format Issue',
    description:
      'Resolve a bug related to date formatting inconsistencies when switching between different language settings.',
    type: 'BUG',
  },
  {
    title: 'Cross-Site Scripting (XSS) Vulnerability',
    description: 'Identify and patch a potential XSS vulnerability in user input fields.',
    type: 'BUG',
  },
  {
    title: 'Error Handling Bug in API Responses',
    description:
      'Improve error responses from the API to provide more meaningful information for troubleshooting.',
    type: 'BUG',
  },
  {
    title: 'Dashboard Widget Rendering Issue',
    description: 'Fix a bug where certain widgets on the dashboard are not rendering correctly.',
    type: 'BUG',
  },
  {
    title: 'Project Deletion Confirmation Bug',
    description:
      'Users are experiencing issues with confirming project deletions. Investigate and address the confirmation bug.',
    type: 'BUG',
  },
  {
    title: 'Password Complexity Bug',
    description:
      'Adjust the password complexity requirements to align with security best practices.',
    type: 'BUG',
  },
  {
    title: 'Implement Role-Based Access Control (RBAC)',
    description:
      'Introduce role-based access control to manage user permissions and access levels more effectively.',
    type: 'TASK',
  },
  {
    title: 'Code Splitting for Improved Loading Times',
    description:
      'Implement code splitting to optimize the loading times of the application, particularly for large codebases.',
    type: 'TASK',
  },
  {
    title: 'Implement Dark Mode Theme',
    description:
      'Add a dark mode theme option to enhance user experience and accommodate different user preferences.',
    type: 'TASK',
  },
  {
    title: 'Integration with Cloud Storage for File Uploads',
    description:
      'Integrate the application with cloud storage services to handle file uploads more efficiently.',
    type: 'TASK',
  },
  {
    title: 'User Activity Logging',
    description:
      'Implement user activity logging to keep track of significant user interactions for auditing and analysis.',
    type: 'TASK',
  },
  {
    title: 'Enhanced User Notifications',
    description: 'Improve user notifications by providing more context and actionable information.',
    type: 'TASK',
  },
  {
    title: 'Implement Real-Time Chat Feature',
    description:
      'Introduce a real-time chat feature to facilitate communication among project team members.',
    type: 'TASK',
  },
  {
    title: 'Automated Code Review Tool Integration',
    description:
      'Integrate an automated code review tool to streamline the code review process and ensure code quality.',
    type: 'TASK',
  },
  {
    title: 'Improve Cross-Browser Compatibility',
    description:
      'Conduct further testing and adjustments to improve compatibility with various web browsers.',
    type: 'TASK',
  },
  {
    title: 'Implement Rate Limiting for API Endpoints',
    description:
      'Introduce rate limiting for API endpoints to prevent abuse and ensure fair usage.',
    type: 'TASK',
  },
];

export const demoPartialTickets: Partial<Ticket>[] = [...Array(ticketTitleAndDesc.length)].map(
  (_, index) => ({
    id: faker.number.int({ min: 1000, max: 8999 }),
    title: ticketTitleAndDesc[index].title,
    description: ticketTitleAndDesc[index].description,
    type: ticketTitleAndDesc[index].type,
    priority: sample(TicketPriorityArr),
    status: sample(TicketStatusArr),
    createdAt: faker.date.recent({ days: 360 }).toISOString(),
  })
);

export const generateAddTicketPartialApiResponse = (data: CreateTicketApiData): Ticket => {
  return {
    id: faker.number.int({ min: 9000, max: 9999 }),
    title: data.title,
    description: data.description,
    type: data.type,
    priority: data.priority,
    status: data.status,
    createdAt: new Date().toISOString(),
    author: {
      id: demoUser.id,
      firstName: demoUser.firstName,
      lastName: demoUser.lastName,
      email: demoUser.email,
      registered: true,
    },
    assignee: data.assigneeId
      ? {
          id: data.assigneeId,
        }
      : undefined,
    project: {
      id: data.projectId,
    },
  };
};
