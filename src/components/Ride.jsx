
const Ride=({ride})=>{
   
    return(
        <div className='ride-wrapper'>
            <div className="image-detail-container">
            <div className="image-container">
                <img className="ride-image" src={ride.map_url} alt={ride.id} ></img>
            </div>
            <div className="ride-detail-container">
                <span>Ride Id : {ride.id}</span>
                <span>Origin Station : {ride.origin_station_code}</span>
                <span>station_path : {ride.station_path.map(path=> <span>{path}</span>)}</span>
                <span>Date : {ride.date}</span>
                <span>Distance : 2</span>  
            </div>
            </div>
            <div className="state-city-container">
                <div className="city">{ride.city}</div>
                <div className="state">{ride.state}</div>
            </div>
        </div>
    )
}

export default Ride

