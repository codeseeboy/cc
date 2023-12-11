// const express = require('express');
// const router = express.Router(); // Create a router for this route
// const { Patient } = require('../models/registers'); // Import the Patient model

// // Handle POST request to update a patient's record
// router.post('/update-patient', async (req, res) => {
//   const patientId = req.body.patientId; // Get the patient's ID from the form
//   const updates = {
//     fullName: req.body.fullName,
//     pemail: req.body.pemail,
//     pnumber: req.body.pnumber,
//     birthDate: req.body.birthDate,
//     gender: req.body.gender,
//     streetAddress1: req.body.streetAddress1,
//     streetAddress2: req.body.streetAddress2,
//     country: req.body.country,
//     city: req.body.city,
//     region: req.body.region,
//     postalCode: req.body.postalCode,
//     document: req.file ? req.file.filename : null, // Update the document if a new one is provided
//   };

//   try {
//     // Update the patient's record in the database
//     const updatedPatient = await Patient.findByIdAndUpdate(patientId, updates);

//     if (!updatedPatient) {
//       return res.status(404).send('Patient not found.');
//     }

//     res.redirect('/admin'); // Redirect to the admin page after updating the patient's record
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while updating the patient.');
//   }
// });

// module.exports = router;
