import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


//Function to check Availability of car at a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate}
        //existingPickup <= newReturn AND existingReturn >= newPickup
    })
    return bookings.length === 0;
}

//API to check Availability of cars for the given date and location
export const checkAvailabiltyOfCar = async (req, res) => {
    try{
        const {location, pickupDate, returnDate} = req.body
        const cars = await Car.find({location, isAvailable: true})

        const availableCarPromises = cars.map(async (car) =>{
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true)
        return res.json({success: true, availableCars})

    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

//API to create booking--------------N
export const createBooking = async(req, res) => {
    try{
        const {_id} = req.user
        const {car, pickupDate, returnDate} = req.body

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvailable){
            res.json({success: false, message: 'Car is not Available'})
        }

        const carData = await Car.findById(car)

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const NoOfDays = Math.ceil((returned - picked) / (1000 * 24 * 60 * 60))

        const price = carData.pricePerDay * NoOfDays

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})
        res.json({success: true, message: "Booking Created Successfully"})

    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

//API to list User Bookings------------N
export const getUserBookings = async (req, res) => {
    try{
        const {_id} = req.user
        const bookings = await Booking.find({user: _id}).populate('car').sort({createdAt: -1})
        res.json({success: true, bookings})

    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

//API to get Owner Bookings-------N
export const getOwnerBookings = async (req, res) => {
    try{
        if(req.user.role !== 'owner'){
            res.json({success: false, message: 'Unauthorised'})
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password")
        .sort({createdAt: -1})
        res.json({success: true, bookings})

    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

// API to change the booking status
export const changeBookingStatus = async (req, res) => {
    try{
        const {_id} = req.user
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
             return res.json({success: false, message: 'Unauthorised'})
        }

        booking.status = status
        await booking.save();
        res.json({success: true, message: 'Status Updated'})

    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}




