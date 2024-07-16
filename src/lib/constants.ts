import calculateDateOfBirth from "@/utils/calculateDateOfBirth";

export const socialIcons = [
  {
    link: 'https://www.linkedin.com/in/shivam-taneja/',
    label: 'Linkedin',
  },
  {
    link: 'https://twitter.com/shiivamtaneja',
    label: 'X/Twitter',
  },
  {
    link: 'https://github.com/shiivamtaneja',
    label: 'Github',
  },
];

export const delays = {
  'pre-loader': 1.0,
  'hero-description': 1.0 + 0.25 // pre-loader + delay
};

export const navLinks = [
  {
    path: '/',
    name: 'Home',
    showOnHeader: false
  },
  {
    path: '/experience',
    name: 'experience',
    showOnHeader: true
  },
  {
    path: '/projects',
    name: 'projects',
    showOnHeader: true
  },
  {
    path: '/contact',
    name: 'contact',
    showOnHeader: true
  },
];

export const homePageInformation = {
  description: `A ${calculateDateOfBirth('2002-05-31')}-year-old full-stack developer passionate about experimenting with cutting-edge technologies, currently working as an Associate Software Development Engineer in NTT Data.`
};

type PathNamesType = {
  [key: string]: {
    [key: string]: string;
  };
};

export const pathNames: PathNamesType = {
  true: {
    '/': 'Shivam Taneja',
    '/contact': 'Contact',
    '/experience': 'Experience',
    '/projects': 'Projects',
  },
  false: {
    '/': '<Home />',
    '/contact': '<Contact />',
    '/experience': '<Experience />',
    '/projects': '<Projects />',
  }
};