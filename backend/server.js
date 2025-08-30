import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

//Database file
import connectToDB from './lib/connectToDB.js';

//Routes
import landlordRoutes from './routes/landlord.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import { isLoggedIn } from './middlewares/isLoggedIn.middleware.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/landlord', landlordRoutes);
app.use('/api/tenant', tenantRoutes);

app.post('/api/logout', isLoggedIn, (req, res) => {
    try{
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "User logged out successfully" });
    }
    catch(err){
        console.log("Error in logoutProfileController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

app.listen(PORT, async () => {
    try{
        await connectToDB();
        console.log(`Server is running on http://localhost:${PORT}`);
    }
    catch(err){
        console.log("Error in running the server: ", err.message);
    }
});