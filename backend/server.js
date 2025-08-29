import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

//Database file
import connectToDB from './lib/connectToDB.js';

//Routes
import landlordRoutes from './routes/landlord.routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/landlord', landlordRoutes);

app.listen(PORT, async () => {
    try{
        await connectToDB();
        console.log(`Server is running on http://localhost:${PORT}`);
    }
    catch(err){
        console.log("Error in running the server: ", err.message);
    }
})