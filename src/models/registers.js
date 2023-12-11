const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    username : {
        type:String,
        required: true
    },
    email :{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required: true
    }

});


//


const appointmentSchema = new mongoose.Schema({
    patientname: {
        type: String,
        required: true
    },
    doctorname : {
        type: String,
        required: true
        
    },
    clinicname: {
        type: String,
        required: true,
    },
    timeslot: {
        type:String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
       
    },
    symptoms: {
        type: String,
        required: true
    },
    appointmentdate: {
        type: String,
        required: true
    }
});

//addpatsiuuuuuuuuuu
const patientSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    pemail: {
      type: String,
      required: true,
    },
    pnumber: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    streetAddress1: {
      type: String,
      required: true,
    },
    streetAddress2: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    document: {
      type: String,
    },
  });
  
  

// collection


const Register = mongoose.model("Register", employeeSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const Patient = mongoose.model('Patient', patientSchema);
module.exports = { Register, Appointment , Patient};