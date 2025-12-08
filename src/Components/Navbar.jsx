import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons"; 
import {faBars,faTimes} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navbar()
{

  const[isOpen,setIsOpen] = useState(false);

  function click()
  {
    setIsOpen(!isOpen);
  }

  return(
    <nav className="absolute top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md flex justify-between items-center p-4">
      
      <div className="space-x-2 flex items-center">
       <FontAwesomeIcon icon={faCompass} className="text-blue-500 text-2xl md:text-3xl " />
        <h3 className="font-semibold text-lg md:text-xl">AI Travel Guide</h3>
      </div>
    

        <ul className=" hidden md:flex space-x-6 font-medium text-base">
          <li onClick={()=>{
            window.scrollBy({
              top:1,
              behavior:"smooth",
            })
          }} className="hover:text-blue-500 cursor-pointer">Home</li>
          <li onClick={()=>{
            window.scrollBy({
              top:650,
              behavior:"smooth",
            })

          }} className="hover:text-blue-500 cursor-pointer">Plan</li>
          <li onClick={()=>{
            window.scrollBy({
              top:1350,
              behavior:"smooth",
            })
          }}
           className="hover:text-blue-500 cursor-pointer">Gallery</li>
          <li onClick={()=>{
            window.scrollBy({
              top:2050,
              behavior:"smooth",
            })
          }}
          className="hover:text-blue-500 cursor-pointer">Map</li>
        </ul>



        {/*only visible on mobile  */}
        <button  onClick={()=>click()}  className="md:hidden text-2xl focus:outline-none">
          <FontAwesomeIcon icon={isOpen?faTimes :faBars}/>         
        </button>

        {
          isOpen &&(

          <ul className=" absolute top-16 left-0 w-full bg-gradient-to-r from-white to-blue-200 flex flex-col items-center space-y-4 md:hidden">
          <li onClick={()=>{
            window.scrollBy({
              top:1,
              behavior:"smooth",
              
            })
          }}          
          className="hover:text-blue-700 cursor-pointer">Home</li>
          <li onClick={()=>{
            window.scrollBy({
              top:680,
              behavior:"smooth",
            })
          }}
           className="hover:text-blue-500 cursor-pointer">Plan</li>
          <li onClick={()=>{
            window.scrollBy({
              top: 1700,
              behavior:"smooth",
            })
          }}
          className="hover:text-blue-500 cursor-pointer">Gallery</li>
          <li onClick={()=>{
            window.scrollBy({
              top:2600,
              behavior:"smooth",
            })
          }}
          className="hover:text-blue-500 cursor-pointer">Map</li>
        </ul>
          )
        }
    </nav>
  )
}
export default Navbar;



