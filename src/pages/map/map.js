import React, { useEffect } from 'react';
import L from 'leaflet';
import markerIcon from '../../images/map-marker.342x512.png';

const MyMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([5.359951, -4.008256], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const locations = [
      { name: 'Lieu 1', lat: 5.343197, lng: -4.020950 },
      { name: 'Lieu 2', lat: 5.358903, lng: -4.008768 },
    ];

    locations.forEach(location => {
      L.marker([location.lat, location.lng], {
        icon: L.icon({
          iconUrl: markerIcon,
          iconSize: [20, 32],
        }),
      })
        .addTo(map)
        .bindPopup(location.name);
    });
  }, []);

  return (
    <div>
         <div id="map" style={{ height: 'calc(42vh - 32px)' }}></div>
    </div>
  );
};

export default MyMap;
