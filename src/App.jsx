import { RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Route } from "react-router-dom"
import Layouts from "./layouts/Layouts"
import Hero from "./pages/Hero"
import About from "./pages/About/index"
import WorkExperience from "./pages/Experience/WorkExperience"
import Skills from "./pages/Skills/index"
import Projects from "./pages/Project/index"
import Contact from "./pages/Contact/index"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layouts />}> 
      <Route index element={<Hero />}/>
      <Route path="about" element={<About />} />
      <Route path="experience" element={<WorkExperience />} />
      <Route path="skills" element={<Skills />} />
      <Route path="projects" element={<Projects />} />
      <Route path="contact" element={<Contact />} />

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
