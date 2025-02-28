const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const JobsRouter=require("./Routes/getJobListRouter")
const UserAuthRouter=require('./Routes/UserRouter');
const allowedOrigins = ['https://job-portal-web-app-pratik-daymas-projects.vercel.app',
                        'https://job-portal-web-app-git-main-pratik-daymas-projects.vercel.app'];
app.use(cors({
     origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
             callback(new Error('Not allowed by CORS'));
                                }
        },
        credentials: true,
         methods: 'POST,GET',
}));
app.use(express.json());



app.use(JobsRouter);
app.use(UserAuthRouter)
app.listen(4000,()=>{
    console.log("App is listening at prot 4000");
})
mongoose.connect('mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/Jobs_WebPortal_Database')
.then(()=>{console.log("DB Connected Successfully");
})
.catch((error)=>{console.log("Error connection Db",error);
})





// This is use to import the existing data file to your mongoDb database

// cd "C:\Users\Pratik\Desktop\Job Portal Task\Backend"
// mongoimport --uri="mongodb://localhost:27017/Jobs_WebPortal_Database" --collection=job_list_collection --file=jobsList.json --jsonArray

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const Admin = require('./models/Admin'); // Admin model

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/adminAuth', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Register Admin Route (Only if no admin exists)
// app.post('/register', async (req, res) => {
//     const existingAdmin = await Admin.findOne();
//     if (existingAdmin) return res.status(403).json({ message: 'Admin already registered. Please login.' });
    
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const admin = new Admin({ username, password: hashedPassword });
//     await admin.save();
//     res.status(201).json({ message: 'Admin registered successfully' });
// });

// // Login Admin Route
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const admin = await Admin.findOne({ username });
//     if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
//     const token = jwt.sign({ id: admin._id }, 'secretkey', { expiresIn: '1h' });
//     res.json({ token });
// });

// app.listen(5000, () => console.log('Server running on port 5000'));

// // React Frontend (Basic Authentication Handling)
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function Auth() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isRegistered, setIsRegistered] = useState(false);

//     useEffect(() => {
//         const checkAdmin = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/check-admin');
//                 setIsRegistered(res.data.exists);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         checkAdmin();
//     }, []);

//     const handleRegister = async () => {
//         try {
//             await axios.post('http://localhost:5000/register', { username, password });
//             setIsRegistered(true);
//             alert('Admin registered! Please login.');
//         } catch (error) {
//             alert(error.response.data.message);
//         }
//     };

//     const handleLogin = async () => {
//         try {
//             const res = await axios.post('http://localhost:5000/login', { username, password });
//             localStorage.setItem('token', res.data.token);
//             alert('Login successful!');
//         } catch (error) {
//             alert(error.response.data.message);
//         }
//     };

//     return (
//         <div>
//             <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             {!isRegistered ? (
//                 <button onClick={handleRegister}>Register</button>
//             ) : (
//                 <button onClick={handleLogin}>Login</button>
//             )}
//         </div>
//     );
// }

// export default Auth;
