const express = require('express');
const path = require("path");
const session = require('express-session');
const hbs = require("hbs");
const _  = require('lodash'); // Import Lodash
const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds for hashing
const app = express();
require("./db/conn"); 
const { Register, Appointment,Patient} = require('./models/registers');
const twilio = require('twilio');
const port = process.env.PORT || 3000;
const multer = require('multer');
const nodemailer = require('nodemailer');
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const crypto = require('crypto');
const uuid = require('uuid');
const mongoose = require("mongoose");
const validObjectId = new mongoose.Types.ObjectId();



app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use('/uploads', express.static('uploads'));



app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.get('/', (req, res) => {
  res.render('index')
});
app.use(session({
  secret: 'ykh22C',
  resave: false,
  saveUninitialized: true,
}));

//handling get
app.get('/index', (req, res) => {
  res.render('index')
});
app.get('/admin', async (req, res) => {
 res.render('admin')

});
app.get('/readmore', async (req, res) => {
 res.render('readmore')

});
app.get('/maker', async (req, res) => {
 res.render('presmaker')

});
app.get('/reports', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    const patients = await Patient.find({});
    res.render('reports', { x:appointments, patients });
  } catch (error) {
    return res.status(500).send("An error occurred while fetching data: " + error.message);
  }
});
app.get('/pat', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    const patients = await Patient.find({});
    res.render('patients', { x:appointments, patients });
  } catch (error) {
    return res.status(500).send("An error occurred while fetching data: " + error.message);
  }
});
app.get('/appoint', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    const patients = await Patient.find({});
    res.render('appointments', { x:appointments, patients });
  } catch (error) {
    return res.status(500).send("An error occurred while fetching data: " + error.message);
  }
});


app.get('/thecert' , (req, res) => {
  res.render('thecert');
})
app.get('/cert' , (req, res) => {
  res.render('cert');
})
app.get('/pass' , (req, res) => {
  res.status(201).send("adminpassword");
})
app.get('/login-page', (req, res) => {
  res.render('login-page')
});
// app.get('/book', (req,res)=> {
//   res.render('index');
// });
app.get('/userpage', (req, res) => {
  res.render('userpage');
});
app.get('/rlogin', (req, res) => {
  res.render('rlogin');
});
app.get('/invalid', (req, res) => {
  res.render('invalid');
});
app.get('/messagesent', (req, res) => {
  res.render('messagesent');
});
app.get('/verified', (req, res) => {
  res.render('verified');
});
app.get('/notsent', (req, res) => {
  res.render('notsent');
});
app.get('/addpat', (req, res) => {
  res.render('addpat');
});
app.get('/admin-login', (req, res) => {
  res.render('admin-login');
});


app.get('/signup', (req, res) => {
  res.render('signup')
});
app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/doctor', (req, res) => {
  res.render('doctor')
});
app.get('/treatment', (req, res) => {
  res.render('treatment')
});
app.get('/sms', (req, res) => {
  res.render('sms')
});
app.get('/inverified', (req, res) => {
  res.render('inverified')
});
app.get('/forgot-password', (req, res) => {
  res.render('forgot')
});
app.get('/feedback', (req, res) => {
  res.render('feedback')
});
app.get('/reset-password', (req, res) => {
  const resetToken = req.query.token;
  console.log(resetToken);
  // You can render a password reset form here
  res.render('reset-password-form'); // Replace with the actual view or template for the reset password form
});



app.get('/contact', (req, res) => {
  res.render('contact')
});
app.get('/health', (req, res) => {
  res.render('health')
});


app.get('/', (req, res) => {
  res.render('index', {   ted: req.session.isAuthenticated || false });
});

//creating Signup page with bcrypt password siu
// creating database
app.post('/signup', async (req, res) => {
  try {
    const password = req.body.password;

    if (password.length > 12) {
      const existingUser = await Register.findOne({
        $or: [
          { email: req.body.email },
          { phone: req.body.phone }
        ]
      });
      if (existingUser) {
        return res.status(409).send("Email or phone number already in use. Please use a different one.");
      } else {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newSignupregister = new Register({
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPassword // Save the hashed password
        });

        const savedUser = await newSignupregister.save();
        return res.status(201).render("index");
      }
    } else {
      return res.status(403).send("Password must be more than 12 characters!");
    }
  } catch (error) {
    return res.status(400).send("An error occurred while processing your request: " + error.message);
  }
});
//
app.post('/login-page', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Register.findOne({ email: email });

    if (!user) {
      return res.status(200).render("invalid");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, user is authenticated
      // Store the username in the session
      req.session.isAuthenticated = true;
      req.session.username = user.username;
      return res.render('userpage', { username: req.session.username });
    } else {
      return res.status(200).render("invalid");
    }
  } catch (error) {
    return res.status(500).send("An error occurred during authentication: " + error.message);
  }
});
//
app.post('/book', async (req, res) => {

  try {
    const phone = req.body.phonenumber
    const user = await Register.findOne({ phone});

    if (!user) {
      return res.status(200).render("invalidbooking");
    }
    
    const phonenumber = req.body.phonenumber.trim();


    if (_.isEmpty(phonenumber)) {
      return res.status(400).send("Phone number is required.");
    }

   else {
      const newBookregister = new Appointment({
        patientname: req.body.patientname,
        doctorname: req.body.doctorname,
        phonenumber: req.body.phonenumber,
        symptoms: req.body.symptoms,
        appointmentdate: req.body.appointmentdate, // Include 'appointmentdate'
        clinicname: req.body.clinicname, // Include 'clinicname'
        timeslot: req.body.timeslot, // Include 'timeslot'
      });

      const savedPatient = await newBookregister.save();
      return res.status(202).render("index");
    }
  } catch (error) {
    return res.status(400).send("An error occurred while processing your request: " + error.message);
  }
}); 

app.get('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy(err => {
    if (err) {
      console.log('Error destroying session:', err);
    }
    // Redirect the user to the index page after logout
    res.redirect('/index');
  });
});

const accountSid = 'AC57d81e41b409a08d363b2e59953db1d5';
const authToken = '79a53e2968dab47596aa400d5442cc7b';
const client = new twilio(accountSid, authToken);

// Handle form submission
app.post('/send-message', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const message = 'Cliniconnect has a message for you - ' + req.body.message; // Prepend your custom message

  // Send the message using Twilio
  client.messages.create({
    to: phoneNumber,
    from: '+12017404485',
    body:  message
    })
  .then((message) => {
    
    res.render('messagesent');
  })
  .catch((error) => {
    
    res.status(500).render('notsent');
  });
});
//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Ensure the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('File type not supported!'));
    }
  }
});
//addpatsiuuu
app.post('/addpat', upload.single('document'), (req, res) => {
  
  const { fullName, pemail, pnumber, birthDate, gender, streetAddress1, streetAddress2, country, city, region, postalCode } = req.body;
  const document = req.file ? req.file.filename : null;

  const newPatient = new Patient({
    fullName,
    pemail,
    pnumber,
    birthDate,
    gender,
    streetAddress1,
    streetAddress2,
    country,
    city,
    region,
    postalCode,
    document,
  });

  newPatient.save()
    .then(() => {
      res.status(200).render('padded');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error adding patient');
    });
});
//
app.post('/rlogin', async (req, res) => {
  try {
    const pnumber = req.body.pnumber;
   

    const user = await Patient.findOne({ pnumber: pnumber });

    if (!user) {
      return res.status(200).render("inverified");
    }
  else {
      res.status(200).render('verified');
    }
  } catch (error) {
    return res.status(500).send("An error occurred during authentication: " + error.message);
  }
});
//
//
app.post('/intouch', (req, res) => {
  const { fullname, phone, message } = req.body;

  // Send an SMS using Twilio
  client.messages
    .create({
      body: `Name: ${fullname}, Phone: ${phone}, Message: ${message}`,
      from: '12017404485',
      to: '+919975836366',
    })
    .then(message => {
      console.log(`SMS sent with SID: ${message.sid}`);
      res.send('<h1 style="text-align:center;"> Message Sent ! Doctor Will Soon Response to Your Message ! <br> THANKS FOR VISITING ! <br> <button type="button" onclick="goBack()">Back</button> </h1> <script> function goBack() { window.history.back(); } </script>');

    })
    .catch(error => {
      console.error('Error sending SMS:', error);
      res.status(500).send('Error sending SMS');
    });
});

//
app.post('/update-patient', async (req, res) => {
  const patientId = req.body.patientId; // Get the patient's ID from the form
  const updates = {
    fullName: req.body.fullName,
    pemail: req.body.pemail,
    pnumber: req.body.pnumber,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    streetAddress1: req.body.streetAddress1,
    streetAddress2: req.body.streetAddress2,
    country: req.body.country,
    city: req.body.city,
    region: req.body.region,
    postalCode: req.body.postalCode,
    document: req.file ? req.file.filename : null, // Update the document if a new one is provided
  };

  try {
    // Update the patient's record in the database
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updates);

    if (!updatedPatient) {
      return res.status(404).send('Patient not found.');
    }

    res.redirect('/admin'); // Redirect to the admin page after updating the patient's record
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the patient.');
  }
});
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '===':
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case '!==':
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
//token
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'shashi2005.rajput@gmail.com',
    pass: 'pqps whet fhdl opyw', // Replace with your Gmail password
  },
});
//forgot password
app.post('/forgot-password', async (req, res) => {
  const email = req.body.email; // Get the user's email from the form

  // Check if the email exists in your database (using the Register model)
  const user = await Register.findOne({ email });

  if (!user) {
    // If the email doesn't exist in the database, show an error message
    return res.status(404).send('User not found. Please check your email.');
  }

  // Generate a unique token for the password reset request
  const resetToken = uuid.v4();// Replace with a unique token generator

  // Compose the email message
  const mailOptions = {
    from: 'shashi2005.rajput@gmail.com', // Sender's email address
    to: email, // Recipient's email address
    subject: 'Password Reset Request',
    html: `Click the following link to reset your password: <a href="http://localhost:3000/reset-password?token=${resetToken}">Reset Password</a>`,

  };

  // Send the password reset email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Handle email sending error
      console.error(error);
      res.status(500).send('Failed to send the password reset email.');
    } else {
      // Email sent successfully
      console.log('Password reset email sent:', info.response);
      res.status(200).send('Password reset email sent successfully.');
    }
  });
});
//
app.post('/reset-password', async (req, res) => {
  const newPassword = req.body['new-password'];
  const confirmPassword = req.body['confirm-password'];
  const resetToken = req.query.token; // Get the reset token from the query parameter

  // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }

  // Find the user associated with the reset token
  console.log('Reset Token from Request:', resetToken);

const user = await Register.findOne({ resetToken: resetToken });

if (!user) {
  console.log('No matching user found for the reset token:', resetToken);
  return res.status(404).send('Invalid reset token.');
}
else{
  console.log('Found matching')
}

  // Hash the new password and save it
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  console.log('Updating the user in the database.');
  // Update the user's password and resetToken in your database
  user.password = hashedPassword;
  user.resetToken = null; // Remove the reset token
  await user.save();
console.log(req.body.password)
  res.redirect('/login-page'); // Redirect the user to the login page
});
//

// Handle admin login form submission
app.post('/admin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Replace with your admin credentials validation logic
    if (email === 'admin123@email.com' && password === 'adminpassword') {
      // Successful admin login
      req.session.isAdminAuthenticated = true;
      res.redirect('admin');
    } else {
      // Invalid admin credentials
      res.status(401).send('Invalid admin credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during admin login');
  }
});

app.get('/dashboard', async (req, res) => {
  try {
    const appointmentCount = await Appointment.countDocuments();
    const patientCount = await Patient.countDocuments();
    const prescriptionCount = await Register.countDocuments();

    // Render the admin dashboard and pass the dynamic data to the 'dashboard' partial
    res.render('dashboard', {
      appointmentCount,
      patientCount,
      prescriptionCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data');
  }
});
//deleteing 
app.post('/delete-appointment', async (req, res) => {
  try {
    const appointmentId = req.body.appointmentId; // Get the appointment ID from the request body

    // Validate the appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).send('Invalid appointmentId. Please provide a valid ObjectId.');
    }

    // Use Mongoose to find and remove the appointment by its ID
    const deletedAppointment = await Appointment.findByIdAndRemove(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).send('Appointment not found.');
    }

    return res.status(200).send('Appointment deleted successfully.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while deleting the appointment.');
  }
});
//
// Add this route to your Express app
app.post('/delete-patient', async (req, res) => {
  const patientId = req.body.patientId; // Get the patient's ID from the request body
  try {
    // Use Mongoose to find and remove the patient by ID
    const deletedPatient = await Patient.findByIdAndRemove(patientId);

    if (!deletedPatient) {
      // Handle the case where the patient was not found
      return res.status(404).send('Patient not found.');
}

    // Handle the case where the patient was successfully deleted
    res.status(200).send('Patient deleted successfully.');
  } catch (error) {
    // Handle any errors that occur during the delete operation
    console.error(error);
    res.status(500).send('An error occurred while deleting the patient.');
}
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000')
});