import { useEffect, useState } from "react";
import DestinationCard from "./DestinationCard";

function Gallery()
{
  const[images,setImages]=useState([])
  const[currentIndex,setcurrentIndex]=useState(0)
  const[imagesPerPage,setImagesPerPage] = useState(1);

  useEffect(()=>{
    function updateLayout()
    {
      const width = window.innerWidth;

      if(window<640)
      {
        setImagesPerPage(1);
      } else if (width<768){
        setImagesPerPage(2);
      }
      else{
        setImagesPerPage(3);
      }
    }

    updateLayout();
    window.addEventListener("resize",updateLayout);

    return () => window.removeEventListener("resize",updateLayout);


  },[]);

  useEffect(()=>
{
 
  const url = "https://api.unsplash.com/photos/random?count=70&query=travel&client_id=cHKBv1BGh8b1cmi0o_3M3kr9sWBzsXdQthSqu6nadto";
  fetch(url)
  .then(res => res.json())
  .then (data =>{
    const photosWithLocation = data.filter(photo=>photo.location && photo.location.name)
    setImages(photosWithLocation);
  })

},[])

const handleNext = ()=>{
  if(currentIndex + 3 <images.length)
  {
    setcurrentIndex(currentIndex+3);
  }
}

const handlePrev = ()=>{
  if(currentIndex - 3 >=0)
  {
    setcurrentIndex(currentIndex-3);
  }
}


  return(
    <div className="bg-gradient-to-r from-white to-gray-400 p-9"> 
      <h1 className="text-3xl italic flex justify-center md:text-4xl font-bold text-blue-900 p-6 ">A Gallery of World Waiting For You</h1>

      <h2 className=" text-xl md:text-2xl flex justify-center text-amber-900 italic font-mono">Discover new places with every click.</h2>

      <div className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 ">

          {images.slice(currentIndex,currentIndex+imagesPerPage).map((image) => (
            <DestinationCard
             key={image.id} 
               image={image.urls.small}
                name={image.location?.name}/>

          ))}

        </div>
      </div>
      
      <div className="flex justify-center mt-6 mb-6 gap-4">


      <button 
      onClick={handlePrev} 
      disabled={currentIndex === 0}
      className={`px-5 py-2 rounded-lg transition ${
        currentIndex === 0
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-orange-500 text-white hover:bg-orange-300"
      }`}
      
      >      
        Backward</button>

       <button
        onClick={handleNext}
        disabled={currentIndex + 3 >=images.length}
      className={`px-5 py-2 rounded-lg transition ${
        currentIndex + 3>= images.length
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-orange-500 text-white hover:bg-orange-300"
      }`}
        >

          Forward</button>
      </div>

    </div>

    
  )
}

export default Gallery;