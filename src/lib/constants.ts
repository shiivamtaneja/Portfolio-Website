import { House, MailCheck } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const navItems = [
  {
    link: '/',
    icon: House,
    heading: 'Home'
  },
  {
    link: '/contact',
    icon: MailCheck,
    heading: 'Contact'
  }
];

export const socialItems = [
  {
    link: 'https://www.linkedin.com/in/shivam-taneja/',
    icon: FaLinkedin,
    heading: 'Linkedin'
  },
  {
    link: 'https://github.com/shiivamtaneja/',
    icon: FaGithub,
    heading: 'Github'
  },
  {
    link: 'https://twitter.com/shiivamtaneja/',
    icon: FaTwitter,
    heading: 'Twitter / X'
  }
];

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

export const delays = {
  'pre-loader-first-load': 1.0,
  'pre-loader': 1.35,
};

export const aboutMeContent = [
  "22-year-old B-Tech graduate from India.",
  "Working as an Associate Software Developer at NTT Data.",
  "Specializes in full-stack development with expertise in MERN.",
  "Currently pursuing certifications in AWS and Microsoft Azure.",
  "Interests: gaming, content creation, music, video editing.",
  "Passionate about tech, software engineering, and UI/UX design.",
  "Always learning and adapting to new tech."
];


export const experiences = [
  {
    title: 'Associate Software Development Engineer',
    companyName: 'NTT Data',
    workLocation: "Remote",
    desc: "",
    start: 'June, 2024',
    end: null,
  },
  {
    title: 'Software Developer Intern',
    companyName: 'Seovigil (powered by Botpresso)',
    workLocation: "Remote",
    desc: "Developed an admin platform to optimize data collection for analytics and decisions.",
    start: 'January, 2024',
    end: 'June, 2024',
  },
  {
    title: 'Web Application Developer',
    companyName: 'Ginger Partners',
    workLocation: "Remote",
    desc: "Developed API endpoints and an ATS, boosting efficiency by 80% and enabling candidate scoring with internal logic.",
    start: 'October, 2023',
    end: 'January, 2024',
  },
  {
    title: 'Full Stack Developer',
    companyName: 'MRIIRS',
    workLocation: "Faridabad, Haryana",
    desc: "Created a portal for teachers to track submitted research papers.",
    start: 'September, 2022',
    end: 'February, 2023',
  },
];

export const sideProjects = [
  {
    title: 'Chat Mingle',
    projLink: 'https://chat-mingle.vercel.app/',
    desc: "a fun, experimental chat app.",
    userCount: '19 users',
    activelyWorking: false,
  },
  {
    title: 'Circle Catcher',
    projLink: 'https://circle-game-sooty.vercel.app/',
    desc: "a game where you grow by eating smaller circles while avoiding larger ones.",
    userCount: '09 users',
    activelyWorking: false,
  },
  {
    title: 'Freelance Project - Personalized Career Guidance Platform',
    projLink: 'https://www.saina.co.in/',
    desc: "a web app with assessments to provide personalized career recommendations, empowering student decisions.",
    userCount: null,
    activelyWorking: false,
  },
];

export const openSourceContribution = [
  {
    logo: '/open-source-contribution/meshery-logo.png',
    logoAlt: 'Meshery - logo',
    title: 'Meshery/meshery.io',
    link: 'https://github.com/meshery/meshery.io/pull/1430',
    desc: "Resolved responsiveness issue related to filtered catalog results.",
    date: 'Sep 21, 2023',
  }
];