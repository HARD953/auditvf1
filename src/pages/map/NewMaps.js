/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import "leaflet/dist/leaflet.css"



import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Image } from 'primereact/image';
// import { useQuery } from '@tanstack/react-query';
// import { getSupportsLocation } from 'src/api/supports/supports';
import { useEffect, useState } from 'react';
import { attacheImageUrl } from 'src/api/axiosInstance';
import { Chip } from 'primereact/chip';

import marker_icon1 from "src/assets/images/marker_icon1.png";
import marker_icon2 from "src/assets/images/marker_icon2.png";



function NewMapsContainer({ supportsData, filtersPayload }) {
  const [mapsData, setMapsData] = useState([]);

  // const { data: mapsData } = useQuery({
  //   queryKey: ["location-maps"],
  //   queryFn: getSupportsLocation,
  // });

  let DefaultIcon = L.icon({
    iconUrl: marker_icon1,
    // shadowUrl: iconShadow,
    iconSize: [30, 40],
    iconAnchor: [22, 44],
    popupAnchor: [-3, -76],
    shadowSize: [38, 45],
    shadowAnchor: [22, 94],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const markerIcon = (iconMarker) =>
    L.icon({
      iconUrl: !!iconMarker ? iconMarker : icon,
      // shadowUrl: iconShadow,
      iconSize: [30, 40],
      iconAnchor: [22, 44],
      popupAnchor: [-3, -76],
      shadowSize: [38, 45],
      shadowAnchor: [22, 94],
    });


  useEffect(() => {
    setMapsData(supportsData);
    // eslint-disable-next-line no-undef
  }, [supportsData, filtersPayload]);
  return (
    <section className="shadow rounded m-md-3 ">
      <MapContainer
        center={[5.359951, -4.008256]}
        zoom={13}
        style={{ height: "calc(80vh - 32px)", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {(mapsData || []).map((location, index) => {
          const _icon = !!location?.anciennete ? marker_icon2 : marker_icon1;
          const _image = !!location?.image_support ? location?.image_support : !!location?.image_support_s ? location?.image_support_s: null;
          return (
            <Marker
              icon={markerIcon(_icon)}
              key={index}
              position={[location?.latitude, location?.longitude]}
            >
              <Tooltip className="shadow rounded">
                <div className="">
                  {!!_image && (
                    <Image
                      height={80}
                      src={`${attacheImageUrl(_image)}`}
                      alt={location?.entreprise}
                      className="img-fluid rounded"
                    />
                  )}
                  <Chip label={`${location?.entreprise}`} />
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
}

export default NewMapsContainer;