import { PageInformations } from "@/types";
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

export const pageInformations: PageInformations = {
  homepageDescription: `
    A ${calculateDateOfBirth('2002-05-31')}-year-old full-stack developer from India, working as an Associate Software Development Engineer at NTT Data. Driven by a passion for innovation, I'm always exploring cutting-edge tech to build scalable and impactful digital solutions.
  `,
  aboutpageDescription: {
    myJourney: [
      {
        hasOffset: {
          sub_heading: null,
          content: [
            {
              text: "This is my story — alongside some snapshots from my journey through life.",
            }
          ],
          image: '/assets/me_grad_30_nov_24.png',
          imageAlt: "Shivam in a graduation gown and cap smiling, holding a red convocation certificate folder at an graduation ceremony with red and white decorations and buildings in the background.",
          imageText: "MRIIRS - Graduation, November 24'"
        },
        hasNoOffset: {
          sub_heading: "Where It All Began",
          content: [
            {
              text: "My tech journey started at Manav Rachna International Institute, but it wasn't just about sitting in lectures. I dove headfirst into the world of coding, turning caffeine into code and ideas into reality.",
            },
            {
              text: "Being a Computer Science student wasn't just about learning - it was about creating."
            }
          ],
          image: '/assets/me_ooty_march_24.jpg',
          imageAlt: "Headshot of Shivam wearing a white shirt with mountains in the background.",
          imageText: "Ooty Trip, March 24'"
        },
      },
      {
        hasOffset: {
          sub_heading: "The Music in My Code.",
          content: [
            {
              text: "Here's something not many developers can say: I'm a trained Indian Classical musician! Those endless hours of practice taught me something unexpected - the same patterns that make beautiful music make beautiful code.",
            },
            {
              text: "When I'm not pushing commits, you might find me performing at events or just jamming with friends or practicing at home."
            }
          ],
          image: '/assets/me_dalgrak_7_dec_24.png',
          imageAlt: "Shivam smiling and sitting at a wooden table in a cozy cafe dalgrak, wearing a denim jacket with a sherpa collar and a white t-shirt, with chairs and a window in the background.",
          imageText: "Dalgrak, December 24'"
        },
        hasNoOffset: {
          sub_heading: "Building Dreams, One Line at a Time.",
          content: [
            {
              text: "From 9 to 5, I'm an Associate Software Development Engineer at NTT Data, where I work with Java, Spring Boot, and cloud technologies, mainly Azure.",
            },
            {
              text: `
                After hours, I dive into various projects to experiment and explore new technologies. My latest creation is a dynamic <a target="_blank" href="/projects/resume-builder">resume builder</a> designed to help professionals showcase their best selves.
              `,
            }
            // "Utilizing OpenAI for ATS checking, I've implemented a resume parser and LinkedIn optimizer, all built with advanced React and Next.js. It's exciting to see how my code transforms ideas into practical tools that people use every day."
          ],
          image: '/assets/me_mongo_db_event_12_sep_24.png',
          imageAlt: "Shivam wearing a white patterned shirt and event lanyard standing in front of a MongoDB logo wall.",
          imageText: "MongoDB Local, September 24"
        },
      },
      {
        hasOffset: {
          sub_heading: "The Creative Spark.",
          content: [
            {
              text: "But wait, there's another plot twist! I'm also a graphic designer. Those YouTube thumbnails and channel arts you might have scrolled past? Some of them could be my creations!",
            },
            {
              text: "I love how design and development come together to create something greater than the sum of its parts."
            }
          ],
          image: '/assets/me_sunder_nursery_7_dec_24.png',
          imageAlt: "Shivam in denim jacket and white t-shirt sitting outdoors at sunder nursery.",
          imageText: "Sunder Nursery, December 24'"
        },
        hasNoOffset: {
          sub_heading: "Making an Impact.",
          content: [
            {
              text: "Leadership isn't just about code. As a College Representative and Orientation Leader, I've had the chance to guide others on their tech journeys.",
            },
            {
              text: `
              Being <a target="_blank" href="https://manavrachna.edu.in/latest/winners-of-code-innovation-series-cis-hackathon">featured on my university website</a> for securing second place in the Code Innovation Series (CIS) Hackathon was just the beginning. These challenges, where we compete, create, and sometimes stay up all night coding - that's what gets my adrenaline pumping!
              `,
            }
          ],
          image: '/assets/me_blr_5_oct_24.png',
          imageAlt: "Shivam in a white patterned short-sleeve shirt drinking from a cocktail glass at an restaurant in Bengaluru.",
          imageText: "Bengaluru Trip, October 24'"
        },
      },
      {
        hasNoOffset: {
          sub_heading: "The Journey Continues.",
          content: [
            {
              text: "I'm always excited to take on new challenges and connect with fellow creators. Whether you want to collaborate on a project, talk about tech, or just share some music recommendations, I'd love to hear from you!",
            },
            {
              text: "Thanks for stopping by!"
            },
          ],
          image: '/assets/me_usa_14_july_23.png',
          imageAlt: "Shivam in white t-shirt and cargo pants standing next to 49 Street subway station sign on brick wall in New York City.",
          imageText: "New York Trip, June 23'"
        },
        hasOffset: {
          sub_heading: "In my spare time,",
          content: [
            {
              text: "You'll find me at the gym or hanging out on Discord.",
            },
            {
              text: "Other than that, you'll find me hitting the gym, gaming, and trying to get my hands on the latest tech.",
            },
            {
              text: "Life's too short to just do one thing, right?",
            },
          ],
          image: '/assets/me_usa_22_june_23.png',
          imageAlt: "Shivam in light blue short-sleeve shirt and sunglasses standing at waterfront with New York City skyline and yacht in background",
          imageText: "New York Trip, June 23'"
        },
      },
    ]
  }
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