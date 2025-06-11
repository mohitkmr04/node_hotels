import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import Person from './models/Person.js';

passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
  try{
    console.log('Received credentials: ',USERNAME,password);
    const user =await Person.findOne({username: USERNAME});
    if(!user){
      return done(null, false, {message:'Incorrect username.'});
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(isPasswordMatch) return done(null,user);
    else  return done(null,false, {message: 'Incorrect password.'});
  }catch(err){
    return done(err);
  }
}))

export default passport;