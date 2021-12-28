import mongoose from 'mongoose';
import User from './model/User.js';


const connect = () => {
	mongoose.connect('mongodb://localhost:27017/midnigt')
};



export {connect, User};
