import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import markerIcon from '../../images/map-marker.342x512.png';
import { useQuery } from '@tanstack/react-query';
import { getSupportsLocation } from 'src/api/supports/supports';
import { Image } from 'primereact/image';

const Carto = () => {
  const [locationAPIs, setLocationAPIs] = useState([]);
  const mapRef = useRef(null);

  const {data: mapsData} = useQuery({
    queryKey: ["location"],
    queryFn: getSupportsLocation
  })



  const customisedMapData = (maps)=>{
    if(!!maps.length){
       return maps?.map(result => ({
        name: result.entreprise,
        image: result?.image_support,
        lat: result.latitude,
        lng: result.longitude,
      }))
    }else{
      return []
    }
  }

  useEffect(() => {
    const mapsDataResponse = mapsData?.results || []
    const mapsDataCstomized = customisedMapData(mapsDataResponse)
    setLocationAPIs(mapsDataCstomized)

  }, [mapsData]);






  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([5.359951, -4.008256], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Nettoyer la carte en supprimant les couches précédentes
    map.eachLayer(layer => {
      if (!layer._url) map.removeLayer(layer);
    });

    console.log(locationAPIs)
    // Ajouter les nouveaux marqueurs
    locationAPIs.forEach(location => {
      L.marker([location.lat, location.lng], {
        icon: L.icon({
          iconUrl: markerIcon,
          iconSize: [20, 32],
        }),
      })
        .addTo(map)
        .bindTooltip(((Layer)=>{
          return `${
          <Image 
            src={location?.image}
            alt={location?.name}
            className="img-fluid"
          />}
          `
        }))
    });
  }, [locationAPIs]);

  return (
    <div>
      <div id="map" style={{ height: 'calc(85vh - 32px)' }}></div>
    </div>
  );
};

export default Carto;
