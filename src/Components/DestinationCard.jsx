


function DestinationCard({image,name})
{
  return(
    <div className=" relative w-full flex justify-center p-2">

      <img  className="w-full aspect-[4/3] object-cover rounded-xl shadow-md" src={image} alt={name} />

      <div className="absolute bottom-0 text-white text-center py-4 text-sm">
        {name}
      </div>

    </div>
  )
}

export default DestinationCard;