import imagekit from "../config/imageKit.js"
import Booking from "../models/Booking.js"
import Car from "../models/Car.js"
import User from "../models/User.js"
import fs from 'fs'

// Change the role from user to owner
export const changeRoleToOwner = async (req, res)=>{
    try{
        const {_id} = req.user
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "You can now list cars"})

    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})

    }
}

//API to list the car
export const addCar = async (req, res) => {
    try{
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({success: false, message: 'Please upload an image'})
        }

        //Upload image to imageKit using stream
        const fileStream = fs.createReadStream(imageFile.path)
        const uploadMethod = (imagekit.files && typeof imagekit.files.upload === 'function') 
            ? imagekit.files.upload.bind(imagekit.files) 
            : imagekit.upload.bind(imagekit);

        const response = await uploadMethod({
            file: fileStream,
            fileName: imageFile.originalname,
            folder: '/cars'
        });

        //optimisation through imageKit 
        const optimisedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: 1280},
                {quality: 'auto'},
                {format: 'webp'},
            ]
        }) || response.url;

        // Clean up temporary local uploaded file
        try { fs.unlinkSync(imageFile.path) } catch (e) {}

        const image = optimisedImageUrl;
        await Car.create({...car, owner: _id, image})
        res.json({success: true, message:'Car Added'})

    }
    catch(error){
         console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

//API to list owner cars
export const getOwnerCars = async (req,res)=>{
    try{
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})
        res.json({success: true, cars})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }

}

// API to toggle car availability
export const toggleCarAvailability = async (req,res) => {
    try{
        const {_id} = req.user
        const {carId} = req.body

        const car = await Car.findById(carId)

        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: 'Unauthorised'})
        }

        car.isAvailable = !car.isAvailable
        await car.save()

        res.json({success: true, message: 'Availability Toggled'})


    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

//API to delete the car
export const deleteCar = async (req,res) => {
    try{
        const {_id} = req.user
        const {carId} = req.body

        const car = await Car.findById(carId)

        if(car.owner.toString() !== _id.toString()){
            return res.json({success: false, message: 'Unauthorised'})
        }

        car.owner = null
        car.isAvailable = false

        await car.save()

        res.json({success: true, message: 'Car Removed'})
 
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
} 

//API to get dashboard data
export const getDashboardData = async (req,res) => {
    try{
        const {_id, role} = req.user;

        if(role !== 'owner'){
            return res.json({success: false, message: "Unauthorised"})
        }

        const cars = await Car.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('car')
        .sort({createdAt: -1})

        const pendingBookings = await Booking.find({owner: _id, status: "pending"})
        const completedBookings = await Booking.find({owner: _id, stauts: "confirmed"})

        const monthlyRevenue = bookings.slice.filter(booking => 
        booking.status === "confirmed").reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue,
        }
        res.json({success: true, dashboardData})

    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }

}

export const updateUserImage = async (req, res) => {
    try{
        const {_id} = req.user

        const imageFile = req.file;
        if (!imageFile) {
            return res.json({success: false, message: 'Please upload an image'})
        }

        //Upload image to imageKit using stream
        const fileStream = fs.createReadStream(imageFile.path)
        const uploadMethod = (imagekit.files && typeof imagekit.files.upload === 'function') 
            ? imagekit.files.upload.bind(imagekit.files) 
            : imagekit.upload.bind(imagekit);

        const response = await uploadMethod({
            file: fileStream,
            fileName: imageFile.originalname,
            folder: '/users'
        });

        //optimisation through imageKit 
        const optimisedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: 1280},
                {quality: 'auto'},
                {format: 'webp'},
            ]
        }) || response.url;

        // Clean up temporary local uploaded file
        try { fs.unlinkSync(imageFile.path) } catch (e) {}

        const image = optimisedImageUrl;

        await User.findByIdAndUpdate(_id, {image})
        res.json({success: true, message: 'Image Updated'})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }

}
