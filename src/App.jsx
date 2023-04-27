import { RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Route } from "react-router-dom"
import Layouts from "./layouts/Layouts"
import Hero from "./pages/Hero"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layouts />}> 
      <Route index element={<Hero />}/>
      <Route path="about" element={""} />
      <Route path="experience" element={""} />
      <Route path="skills" element={""} />
      <Route path="projects" element={""} />

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
