import About from "./components/About"
import Header from "./components/Header"
import Hero from "./components/Hero"

function App() {
  return (
    <div className="bg-[#242424] text-white h-screen snap-y snap-proximity overflow-scroll z-0">
      
      <Header />
      
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>
    </div>
  )
}

export default App
