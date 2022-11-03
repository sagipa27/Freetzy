import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    });

    console.log('Connected to DB');
}

