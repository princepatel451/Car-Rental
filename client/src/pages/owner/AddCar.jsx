import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../Context/AppContext'

const AddCar = () => {

  const {axios, currency} = useAppContext()

  const [image,setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '', 
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    if(isLoading) return null

    setIsLoading(true)
    try{
      const formData = new formData()
      formData.append('image',image)
      formData.append('carData', JSON.stringyfy(car))

      const {data} = await axios.post('/api/owner/add-car',formData)

      if(data.success){
        toast.succes(data.message)
        setCar({
        brand: '',
        model: '',
        year: '',
        pricePerDay: '', 
        category: '',
        transmission: '',
        fuel_type: '',
        seating_capacity: '',
        location: '',
        description: '',
        })
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
       toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title='Add New Car' subTitle='Fill in details to list a new car for booking, including pricing, avalability and car specifications.'/>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        <div className="flex items-center gap-2 w-full">

        <label htmlFor="car-image">
          <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-30 rounded cursor-pointer'/>
          <input type='file' id='car-image' accept='image/*' hidden onChange={(e)=>setImage(e.target.files[0])}/>
        </label>
        <p className='text-sm text-gray-500'>Upload a picture of your car</p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col w-full">
            <label >Brand</label>
            <input type='text' placeholder='e.g. BMW, Mercedes, Audi...' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.brand} onChange={(e)=>setCar({...car, brand: e.target.value})}/>
          </div>

          <div className="flex flex-col w-full">
            <label >Model</label>
            <input type='text' placeholder='e.g. X5, E-Class, M4...' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.model} onChange={(e)=>setCar({...car, model: e.target.value})}/>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <div className="flex flex-col w-full">
            <label >Year</label>
            <input type='number' placeholder='e.g. 2025' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.year} onChange={(e)=>setCar({...car, year: e.target.value})}/>
          </div>

          <div className="flex flex-col w-full">
            <label >Daily Price ({currency})</label>
            <input type='number' placeholder='e.g. 100'required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.pricePerDay} onChange={(e)=>setCar({...car, pricePerDay: e.target.value})}/>
          </div>

          <div className="flex flex-col w-full">
            <label >Category</label>
            <select className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.category} onChange={(e)=>setCar({...car, category: e.target.value})}>
              <option value="">Choose a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          <div className="flex flex-col w-full">
            <label >Transmission</label>
            <select className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.transmission} onChange={(e)=>setCar({...car, transmission: e.target.value})}>
              <option value="">Choose Transmission type</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="semi-automatic">Semi-Automatic</option>
            </select>
          </div>
          
          <div className="flex flex-col w-full">
            <label >Fuel Type</label>
            <select className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.fuel_type} onChange={(e)=>setCar({...car, fuel_type: e.target.value})}>
              <option value="">Choose Fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          
          <div className="flex flex-col w-full">
            <label >Seating Capacity</label>
            <input placeholder='e.g. 4' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.seating_capacity} onChange={(e)=>setCar({...car, seating_capacity: e.target.value})} />
          </div>
          
        </div>

        <div className="flex flex-col w-full">
          <label >Location</label>
          <select className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.location} onChange={(e)=>setCar({...car, location: e.target.value})}>
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea rows={5} placeholder='A Luxurious SUV with spacious interior and powerful engine' className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={car.description} onChange={(e)=>setCar({...car, description: e.target.value})}></textarea>

          <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
            <img src={assets.tick_icon} alt="" />
            {isLoading ? 'Listing...' : 'List Your Car'}
          </button>
        </div>




      </form>
     
    </div>
  )
}

export default AddCar