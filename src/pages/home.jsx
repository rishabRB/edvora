import {useEffect, useState} from 'react'
import Ride from '../components/Ride'




const Home=({user,RideData})=>{

const [showNearest,setshowNearest]=useState(true)
const [nearestRide,setNearestRide]=useState([])
const [pastride,setPastRide]=useState([])
const [upcommingRide,setUpcommingRide]=useState([])
const [showRide,setshowRide]=useState([])

 useEffect(()=>{
    NearRide()
    UpcommingRide()
    PastRide()
  },[user.station_code])



//Today's  Date for comparing
var dates=new Date()
var date=dates.getDate()
var month=dates.getMonth()


const UpcommingRide=()=>{
  setUpcommingRide(RideData.filter(ride=> parseInt(ride.date.split("/")[0]) >= month && parseInt(ride.date.split("/")[1]) > date )) 
}

const PastRide=()=>{
  setPastRide(RideData.filter(ride=> parseInt(ride.date.split("/")[0]) <= month && parseInt(ride.date.split("/")[1]) < date )) 
}



const NearRide=()=>{
  for(var i=user.station_code-2;i<=user.station_code+2;i++)
  setNearestRide(RideData.filter(ride=>ride.station_path.includes(i)))

}


//handling type of ride 

const handleClick=(type)=>{
  if(type==='near'){
    setshowRide(nearestRide)
  }

  if(type==='upcomming'){
    setshowNearest(false)
    setshowRide(upcommingRide)
  }

  if(type==='past'){
    setshowNearest(false)
    setshowRide(pastride)
  }
}

// state and city

const [filters,setfilters]=useState({
  state:null,
  city:null
})

var State=[]
var city=[]
RideData.filter((ride)=>{
  if(!State.includes(ride.state))
  State.push(ride.state)
  if(!city.includes(ride.city))
  city.push(ride.city)
})


//for showing filter dropdown
const [showFilters,setShowFilter]=useState(false)
    
  const ChangeFilter=()=>{
      setShowFilter(!showFilters)
      
  }


//handling filters

const handleChange=(e)=>{
  setfilters({...filters,[e.target.name]:e.target.value})
}

const handleFilter=()=>{

  if(showNearest){
    setNearestRide(nearestRide.filter(ride=> ride.state===filters.state || ride.city === filters.city))
    setShowFilter(!showFilters)
    return
  }
  
  setshowRide(showRide.filter(ride=> ride.state===filters.state || ride.city === filters.city))
  setShowFilter(!showFilters)
}




  return(
    <div>
        <div className='nav-bar'>
             <div className='logo-container'>Edvora</div>
             <div className='user-container'>
                 <div><h2>{user.name}</h2></div>
                 <div className='user-img'>
                   <img className="user-photo" src={user.url} alt={user.name} />
                 </div>
             </div>
        </div>




    <div className='ride-filter-wrapper'>
       <div className='ride-filter-container'>
          <div className='ride-type-container'>
            <div className="nearest-ride" onClick={()=>handleClick('near')}>Nearest rides ({nearestRide.length})</div>
            <div className='"upcomming-ride' onClick={()=>handleClick('upcomming')}>Upcomming rides ({upcommingRide.length})</div>
            <div className='past-rides' onClick={()=>handleClick('past')}>Past rides ({pastride.length})</div>
          </div>

         <div className='filter-container'>
         < div className='filters' onClick={ChangeFilter}>Filters</div>
         {showFilters && 

         <div className="filter-card">
             <div className='filter-heading'>Filters</div>
             <div className='filters-container'>
               <div className='filter-state'>
                 <select name='state' onChange={handleChange}>
                   {State.map(state=><option  value={state}>{state}</option>)}
                 </select>
               </div>
              <div className='filter-city'>
                <select name='city' onChange={handleChange}>
                  {city.map(state=><option value={state}>{state}</option>)}
               </select>
              </div> 
             </div>
             <div className='filter-btn' onClick={handleFilter}> Filter </div>
         </div>
         
         }
         </div>
  
      </div>
    
    <div className='ride-container'>
      {showNearest && nearestRide.map((ride)=><Ride  ride={ride} />)}
      {showRide && showRide.map((ride)=><Ride  ride={ride} />)}
    </div>

    </div>


    </div>
  )    
}

export default Home







