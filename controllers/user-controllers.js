const User = require('../model/User');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const signup = async (req,resp,next)=>{
    const {name, email, password, cpassword } = req.body;

    if(!name || !email || !password || !cpassword){
        return resp.status(422).json({error: "Incorrect Input Field"});
    }

    if(password !== cpassword){
        return resp.status(422).json({error: "Password is not Mathing"});
    }

    try{
       let existingUser = await User.findOne({email: email});

       if(existingUser){
            return resp.status(400).json({message:"User Already Exisits"})
        }

        const hashedPassword = bcrypt.hashSync(password,saltRounds);
        const hashedCpassword = bcrypt.hashSync(cpassword,saltRounds)

        const user = new User({
            name:name,
            email:email,
            password:hashedPassword,
            cpassword:hashedCpassword
        });

        const userRegister = await user.save();

        if(userRegister){
            resp.status(201).json({message:user})
        }

    } catch (err){
        console.log(err);
    }
}

const login = async (req,resp,next)=>{
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    } catch (err){
        console.log(err);
    }

    if(!existingUser){
        return resp.status(400).json({message:"Invalid Input"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return resp.status(400).json({message:"Inavalid Email / Password"})
    }

   
    return resp.status(200).json({existingUser})
}


exports.signup = signup ;
exports.login = login;
