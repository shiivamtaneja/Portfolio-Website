import Header from "./components/Header"
import Hero from "./components/Hero"

function App() {
  return (
    <div className="bg-[#242424] text-white h-screen snap-y snap-mandatory overflow-scroll z-0">
      
      <Header />
      <section id="hero" className="snap-center">
        <Hero />
      </section>
    </div>
  )
}

export default App
