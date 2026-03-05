import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {

    const testimonials = [
        {
            name: "Emma Rodriguez", 
            location: "New York", 
            image: assets.testimonial_image_1, 
            review: "I've rented cars from various companies but the experience with CarRental was exceptional." 
        },
        {
            name: "John Smith", 
            location: "Los Angeles", 
            image: assets.testimonial_image_2, 
            review: "Car Rental make my trip so much easier.The car was delivered right to my door and the customer service was fantastic." 
        },
        {
            name: "Ava Johnsom", 
            location: "California", 
            image: assets.testimonial_image_1, 
            review: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service." 
        },

       
    ];


  return (
    <div>
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
            <Title title='What our customer say' subTitle='Discover why discerning travellers choose StayVenture for the luxury accomodations around the world' />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial,index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">

                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star "/>
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
    </div>
  )
}

export default Testimonial