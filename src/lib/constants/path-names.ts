export const pathNames = {
  common: {
    '/contact': 'Contact',
    '/experience': 'Experience',
  },
  projects: {
    'chat-mingle': 'Project | Chat Mingle',
    'circle-catcher': 'Project | Circle Catcher',
    'career-guidance': 'Project | Career Guidance',
  },
};

export const excludedPaths = [
  '/auth/error',
  '/auth/signin',
  '/dashboard',
  '/chat'
];

export const chatIdRegex = /^\/chat\/[a-f\d]{24}$/i;