

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [places, setPlaces] = useState([]);
  const [placeNames, setPlaceNames] = useState([]);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error('Error getting location', error)
    );
  }, []);

  // Fetch nearby tourism places
  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const query = `
      [out:json];
      (
        node["tourism"](around:20000,${latitude},${longitude});
        way["tourism"](around:20000,${latitude},${longitude});
        relation["tourism"](around:20000,${latitude},${longitude});
      );
      out center;
    `;

    const url =
      "https://overpass-api.de/api/interpreter?data=" +
      encodeURIComponent(query);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.elements.filter((el) => {
          const type = el.tags?.tourism;
          const name = el.tags?.name?.toLowerCase() || "";

          return (
            [
              "hotel",
              "guest_house",
              "motel",
              "museum",
              "attraction",
              "viewpoint",
              "picnic_site",
              "theme_park",
              "information",
              "zoo",
              "camp_site",
              "gallery",
              "park",
            ].includes(type) &&
            !name.includes("house") &&
            !name.includes("residence")
          );
        });

        setPlaces(filtered);
      })
      .catch((err) => console.error(err));
  }, [latitude, longitude]);

  // Convert coordinates → place names
  useEffect(() => {
    if (!places.length) return;

    setPlaceNames([]);

    const fetchNamesSequentially = async () => {
      for (let place of places.slice(0, 20)) {
        let lat = place.lat || place.center?.lat;
        let lon = place.lon || place.center?.lon;
        if (!lat || !lon) continue;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await res.json();

          const displayName =
            data.name ||
            place.tags?.name ||
            place.tags?.tourism ||
            "Unknown Place";

          if (
            displayName.toLowerCase().includes("house") ||
            displayName.toLowerCase().includes("residence")
          )
            continue;

          setPlaceNames((prev) => [...prev, { id: place.id, lat, lon, name: displayName }]);

          await new Promise((r) => setTimeout(r, 200));
        } catch (err) {
          console.error("Error fetching name:", err);
        }
      }
    };

    fetchNamesSequentially();
  }, [places]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center p-9 bg-gradient-to-r from-white to-gray-300">
        <div className="md:w-1/2 w-full">
          <h1 className="text-3xl md:text-4xl italic font-bold text-blue-900 p-6 text-center md:text-left">
            Discover What's Around You
          </h1>

          <p className="text-sm md:text-xl italic font-mono p-3">
            Travel is more than moving from one place to another it’s a journey into yourself. Every new horizon, every unfamiliar street, and every sunrise teaches you something the familiar never could. Step beyond the known, and you’ll find courage, wonder, and a world wider than your fears. The mountains remind you of your smallness, the oceans whisper freedom, and the cities hum stories you’ve never heard. Don’t wait for the perfect moment go, explore, and let the journey quietly change you, for the world has a way of showing what your heart has always been seeking.
          </p>
        </div>

        {latitude && longitude && (
          <div className="md:w-1/2 w-full">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              style={{ width: "100%", height: "650px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <Marker position={[latitude, longitude]}>
                <Popup>Your location</Popup>
              </Marker>

              {placeNames.map((place) => (
                <Marker key={place.id} position={[place.lat, place.lon]}>
                  <Popup>{place.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default Map;
