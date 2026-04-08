
import { useState } from "react";
import AuthSideBar from "../Components/AuthSideBar";
import { Link } from "react-router";


function Signup(){


  
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const createAccount = async (e: React.FormEvent) =>{
                e.preventDefault();

                

                try{
                      const userData = {
                        username: name,
                        email: email,
                        password: password,
                  

                    }

                    const url = `http://localhost:3000/api/users/create`;
                    const res = await fetch(url, {
                        method: "POST",
                        headers: {
                            'Content-type' : 'application/json',
                        },
                        body: JSON.stringify(userData),
                    })
                    const data = res.json()
                   if (!data){
                    throw new Error("User-data trouble:");
                   }
                  


                  
                    
                } catch (error){
                    console.error('Error fetching server user-api data', error);
                }
    }

    return(

        <>

        <div>


         <div className="flex flex-row w-full h-screen">

        <AuthSideBar>

        </AuthSideBar>
           
    
       <div className=" flex  justify-center items-center ">
   
            <form onSubmit={createAccount} method="POST" className="flex flex-col w-125 m-5 p-5 gap-5"  >
            <h1>Create your account</h1>
            <h5>You're one step away from building your dream business venture!</h5>
                <input onChange={(e) => setName(e.target.value)} required type="text" placeholder="Full Name" className="border border-gray-300 transition ease-in-out delay-150 duration-200 hover:bg-gray-100 bg-gray-50 rounded-md p-5 outline-orange-500"></input>
                <input onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email"  className="border border-gray-300 transition ease-in-out delay-150 duration-200 hover:bg-gray-100 bg-gray-50 rounded-md p-5 outline-orange-500"></input>
                <input onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password"  className="border border-gray-300 transition ease-in-out delay-150 duration-200 hover:bg-gray-100 bg-gray-50 rounded-md p-5 outline-orange-500"></input>
                <button type="submit" className="cursor-pointer p-5 bg-amber-500 text-sm transition ease-in-out delay-150 duration-200  hover:bg-amber-400  text-white font-bold rounded-2xl">Create account</button>

                <div className="flex flex-row gap-1">
                    <p>Already have an account?</p>
                    <Link className="text-orange-500 hover:underline" to='/Signin'>Sign in here</Link>
                </div>
            </form>
            </div>

            
            
         </div>

        </div>
        </>
    )
}

export default Signup;