import LeafletMap from './MapComponents/LeafletMap'
import L from "leaflet";

function MapContainer(props) {
    

    return (
        <div className='mapContainer'>
            <div className='mappp'>
                <div id="mapid">
                    <LeafletMap lat={v.props.lat} lan={v.props.lan} />
                </div>
            </div>

        </div>
    )

}

export default MapContainer