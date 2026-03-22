export const pathNames = {
  common: {
    "/contact": "Contact",
    "/experience": "Experience",
    "/projects": "Projects",
    "/certificates": "Certificates",
  },
  projects: {
    "chat-mingle": "Project | Chat Mingle",
    "circle-catcher": "Project | Circle Catcher",
    "career-guidance": "Project | Career Guidance",
    "chat-bot": "Project | Ask Shivam",
    "tilt-bot": "Project | Tilt Bot",
    "nagar-iq": "Project | Nagar IQ",
    "collab-write": "Project | Collab Write",
    "decode-mycode": "Project | DecodeMyCode",
    eznotify: "Project | EZNotify",
    graphmyself: "Project | GraphMySelf",
  },
};

export const excludedPaths = [
  "/auth/error",
  "/auth/signin",
  "/dashboard",
  "/chat",
];

export const chatIdRegex = /^\/chat\/[a-f\d]{24}$/i;
