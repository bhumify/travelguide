import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPhone,faEnvelope,faCompass,faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";


function Footer()
{
  return(
    <div className="bg-gray-800 text-white p-6 space-y-7  ">

    <div className=" flex flex-col items-center text-center  justify-center md:flex-row  md:items-start md:text-left ">


    <div className="p-4 md:m-7">
       <h3 className=" font-semibold text-base md:text-xl "> <FontAwesomeIcon icon={faCompass} className="text-blue-500 text-2xl mr-2"/>AI Travel Guide</h3>
       <h3 className="max-w-xs p-2 text-gray-400 md:max-w-sm ">Your intelligent companion for planning amazing adventures around the world.</h3>
    </div>


    <div className="p-4  md:m-7">
      <h3 className="">Contact Info</h3>
      <h3 className=" space-x-4 mt-2 text-gray-400"><FontAwesomeIcon icon={faPhone} className="text-blue-400 text-base"></FontAwesomeIcon> +977-9800123456</h3>
      <h3 className=" space-x-4 mt-2 text-gray-400"><FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-base "></FontAwesomeIcon> travel@gmail.com</h3>
    </div>


    <div className="p-4 space-x-2 md:m-7">
      <h3>Follow Us</h3>
      <a href="https://www.facebook.com/" target="_blank ">
      
        <FontAwesomeIcon icon={faFacebook} className=" hover:text-blue-800 text-xl mt-2"></FontAwesomeIcon>
      </a>
      <a href="https://www.instagram.com/" target="_blank">
        <FontAwesomeIcon icon={faInstagram} className="hover:text-pink-700 text-xl mt-2"></FontAwesomeIcon>
      </a>
      <a href="https://twitter.com/" target="_blank">
        <FontAwesomeIcon icon={faTwitter} className="hover:text-blue-800 text-xl mt-2"></FontAwesomeIcon>
      </a>

    </div>
    </div>


    <div className=" w-full flex flex-col items-center text-center mt-9">
      <h3 className="text-gray-400"><FontAwesomeIcon icon={faTriangleExclamation} className="text-yellow-600 text-base"></FontAwesomeIcon>
      <span  className="text-yellow-600">Disclaimer:</span>This is AI-generated content.Please verify all information before booking your trip.</h3>
      <h3 className="text-gray-400">@2025 AI Travel Guide. All rights reserved.</h3>
    </div>


    </div>

     
  )
}

export default Footer;