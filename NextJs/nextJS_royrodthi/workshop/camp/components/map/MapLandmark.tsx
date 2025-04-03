'use client'

import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L, { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react';


const iconUrl = "https://img2.pic.in.th/pic/locationa2da66a7af629dee.png";
const markerIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [70, 70],
});


type Latlng = [number, number]
type LocationMarkerProps = {
    position: Latlng | null
    setPosition: (position: Latlng | null) => void
}

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
    const map = useMapEvents({
        click(e) {
            const newLocation: Latlng = [e.latlng.lat, e.latlng.lng]
            setPosition(newLocation)
            map.flyTo(e.latlng)
        }
    })

    return position === null ? null : (
        <Marker position={position} icon={markerIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}


const MapLandmark = ({ location }: { location?: { lat: number, lng: number } }) => {
    const defaultLocation: Latlng = [13.724668575126328, 100.53588867187501] // Bangkok
    const [position, setPosition] = useState<Latlng | null>(null)
    console.log(position)
    return (
        <>
            <h1 className='mt-4 font-semibold'>Where are You?</h1>
            <input type='hidden' name='lat' value={position ? position[0] : defaultLocation[0]} />
            <input type='hidden' name='lng' value={position ? position[1] : defaultLocation[1]} />
            <MapContainer
                className='h-[50vh] rounded-lg z-0 relative mb-2'
                center={location || defaultLocation}
                zoom={10}
                scrollWheelZoom={true}
            >
                <Marker position={location || defaultLocation} icon={markerIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

                <LocationMarker position={position} setPosition={setPosition} />

                <LayersControl>
                    <LayersControl.BaseLayer name='Openstreetmap' checked>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    
                    <LayersControl.BaseLayer name='ESRI Imagery'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </>
    )
}
export default MapLandmark