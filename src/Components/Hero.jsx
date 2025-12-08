import image from "../assets/hero.jpg"


function Hero()
{
  return(
    <header
    className="pt-6 h-screen bg-cover bg-center"
    style={{backgroundImage : `url(${image})`}}
    >
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center -translate-y-33 ">
      <h1 className="text-3xl font-bold text-blue-950 md:text-5xl">Explore the World with AI</h1>
      <p className="text-xl italic font-mono text-blue-950 mt-5 md:text-2xl">Plan your perfect trip based on your budget,preferences and time.</p>

      <button
      onClick={()=>{
        window.scrollBy({
          top:700,
          behavior:"smooth",
        })
        
      }}

      className = "bg-blue-900/30 text-white backdrop-blur-md px-4 py-2 rounded-lg border border-blue-400/50 mt-5 hover:bg-blue-900/90 hover:scale-105 transition-all duration-300">Let's Explore Together</button>
      
    </div>


    </header>
  )
}

export default Hero;