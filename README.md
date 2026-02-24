# Shivam Taneja's Portfolio Website

This is the official repository for my personal website built with Next.js 15, featuring a modern design and an AI-powered chatbot to interact with visitors.

## 🌟 About the project

This branch (`design-v2`) contains the latest design updates for my portfolio website. The site showcases my work, skills, and provides a unique way for visitors to interact with an AI assistant that can answer questions about me and my work.

## 🧊 Visual Effects

### 3D Folding Scroll ("The Origami Effect")

The home page features a custom-built 3D folding scroll effect. This creates the illusion of the website being a continuous sheet of paper folding through space as you scroll.

**How it works:**
1.  **Three Layers:** The content is rendered onto three distinct layers:
    *   **Top Fold:** Rotated -90° (facing up).
    *   **Center Fold:** Facing the user (viewport).
    *   **Bottom Fold:** Rotated +90° (facing down).
2.  **Synchronization:** A layout manager intercepts the native scroll position and synchronizes it with the `translateY` properties of all three layers instantly.
3.  **The Illusion:** As content leaves the Center layer, it immediately enters the angled Top or Bottom layers, creating a seamless 3D folding animation.

**Visual Diagram:**
```text
      /  <-- Top Copy (Tilted -90deg)
     /       (Shows the content that has scrolled past)
    /

    |    <-- Center Copy (Flat)
    |        (Shows the current content)
    |

    \
     \       (Shows the content coming up next)
      \  <-- Bottom Copy (Tilted +90deg)
```

## ✨ Key Features

- Modern, responsive design built with Next.js 15
- AI-powered chatbot using Groq and vector embeddings
- Email contact form
- MDX support for rich content

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Styling**: GSAP for animations, Shadcn UI for components
- **AI**: Groq AI, MongoDB Vector Search
- **Backend**: Next.js API routes, MongoDB
- **Authentication**: NextAuth.js
- **State Management**: Zustand, React Query

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- yarn
- MongoDB database (local or Atlas)
- Groq AI API key (for chatbot functionality)

### Installation

1. Clone the repository
```bash
git clone https://github.com/username/shivam-portfolio-website.git
cd shivam-portfolio-website
git checkout design-v2
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory, take reference from `.env.sample` file.

1. Run the development server
```bash
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 💬 Chatbot Functionality

The AI chatbot is powered by Groq AI and uses MongoDB vector search to find relevant information about me to answer visitor questions.

For detailed information on how the chatbot works, please see the [Chatbot Documentation](/docs/chatbot.md).

### Running without the chatbot

If you don't want to set up the chatbot functionality, you can comment out the chatbot component in `src/components/wrapper.tsx`:

```tsx
{/* Temporarily disable chatbot
    <ChatBot /> 
*/}
```

## 🔐 Admin Dashboard

The website includes an admin dashboard (accessible only to authorized users) with features for chat monitoring.

For detailed information on the dashboard functionality, please see the [Dashboard Documentation](/docs/dashboard.md).

## 🤖 Content Crawler

This project includes an automated content crawler that processes website content and generates embeddings for the chatbot.

For detailed information on how the crawler works, please see the [Crawler Documentation](/docs/crawler.md).

## 📧 Email Functionality

To see the email designs locally, run:

```bash
yarn email
```

This will start a local server to preview email templates.

## 📚 Technical Documentation

For more detailed technical documentation, please refer to the following:

- [Architecture Overview](/docs/architecture.md)

## 🔧 Customization

To customize the website for your own use:
1. Update personal information in the relevant data files
2. Replace images in the public directory
3. Modify the theme in the tailwind configuration
4. Update content in the MDX files

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Feel free to reach out to me at business.shivamtaneja@gmail.com if you have any questions or feedback.

---

Built with ❤️ by Shivam Taneja