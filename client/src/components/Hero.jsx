import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const Hero = () => {
    const [pickupLocation,setPickupLocation] = useState('')
    const {pickupDate,setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()

    const today = new Date().toISOString().split('T')[0]

    const handlePickupDateChange = (e) => {
        const selected = e.target.value
        setPickupDate(selected)
        if (returnDate && returnDate < selected) {
            setReturnDate(selected)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (!pickupLocation) {
            toast.error('Please select a pickup location')
            return
        }
        if (returnDate < pickupDate) {
            toast.error('Return date must be greater than or equal to pickup date')
            return
        }
        navigate('/cars?pickupLocation=' + encodeURIComponent(pickupLocation) + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
        <h1 className='text-4xl md:text-5xl font-semibold'>Luxury Cars on Rent</h1>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8">

                <div className='flex flex-col items-start gap-2'>
                    <select value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)} required>
                        <option value="">Pickup Location</option>
                        {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>
                    <p className='px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : "Please Select Location"}</p>
                </div>

                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='pickup-date'>Pick-up Date</label>
                    <input value={pickupDate} onChange={handlePickupDateChange} type="date" id="pickup-date" min={today} className='text-sm text-gray-500' required/>
                </div>

                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='return-date'>Return Date</label>
                    <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} type="date" id="return-date" min={pickupDate || today} className='text-sm text-gray-500' required/>
                </div>


            </div>

                <button className='flex items-center justify-center gap-1 px-9 py-3 bg-primary rounded-full max-sm:mt-4 hover:bg-primary-dull cursor-pointer text-white'>
                    <img className='brightness-300' src={assets.search_icon} alt="search" />
                    Search
                </button>
                
        </form>

        <img src={assets.main_car} alt="car"  className="max-h-80"/>

    </div>
  )
}

export default Hero