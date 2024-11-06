// import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import "leaflet/dist/leaflet.css"



import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Image } from 'primereact/image';



function SupportMapDetail({position,image=""}) {

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  // const [markerPosition,setMarkerPosition] = useState([0,0])

  // useEffect(()=>{
  //   const positionItems = !!position?.length ? position : [0,0]
  //   setMarkerPosition(positionItems)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[position])

    return ( 
        <section className='shadow rounded m-md-3 ' >
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker  position={position}>
                <Tooltip className="shadow rounded" >
                  <div className=''>
                    <Image 
                      height={80}
                     src={image}
                     alt={image}
                     className="img-fluid rounded"
                     />
                  </div>
                </Tooltip>
            </Marker>
        </MapContainer>
        </section>
     );
}

export default SupportMapDetail;