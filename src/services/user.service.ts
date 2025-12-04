// import bcrypt from "bcryptjs";
// import User from "../lib/model/user";



// export class UserService {
//   static async createUser(data: SignupDTO) {
//     const existingUser = await User.findOne({ email: data.email });

//     if (existingUser) {
//       throw new Error("Email already exists");
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     const newUser = await User.create({
//       firstname: data.firstname,
//       lastname: data.lastname,
//       email: data.email,
//       password: hashedPassword,
//     });

//     return newUser;
//   }


//   static async  validateUser(data:LoginDTO) {
//     const existingUser = await User.findOne({email: data.email})
//     if(!existingUser){
//         throw new Error('no email found')

//     }

//     const hashed = await bcrypt.compare( data.password , existingUser.password )
    
//     if (!hashed) throw new Error("Invalid email or password");

//     return existingUser;

//   }

// }
