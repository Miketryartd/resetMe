
import React, { useState } from "react";
import AuthSideBar from "../Components/AuthSideBar";
import { Link, useNavigate } from "react-router";


function Signin(){


  
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const nav = useNavigate();

    const handleSignin = async (e: React.FormEvent) =>{
           e.preventDefault();
           
           try{

            

            const url = `http://localhost:3000/api/users/sign-in`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if (res.ok){
                sessionStorage.setItem('token', data.token);
                nav('/Dashboard');
                return;
            } else {
                console.log(data.error);
            };
           } catch (error){
            console.error('Error fetching api', error);
           }

           
    }

    
    return(

        <>

        <div>


         <div className="flex flex-row w-full h-screen">

       <AuthSideBar></AuthSideBar>
           
    
       <div className=" flex  justify-center items-center ">
   
            <form onSubmit={handleSignin} method="POST" className="flex flex-col w-125 m-5 p-5 gap-5"  >
            <h1>Log in</h1>
            <h5>Make your business boom!</h5>
                <input onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email"  className="border border-gray-300 transition ease-in-out delay-150 duration-200 hover:bg-gray-100 bg-gray-50 rounded-md p-5 outline-orange-500"></input>
                <input onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password"  className="border border-gray-300 transition ease-in-out delay-150 duration-200 hover:bg-gray-100 bg-gray-50 rounded-md p-5 outline-orange-500"></input>
                <button type="submit" className="cursor-pointer p-5 bg-amber-500 text-sm transition ease-in-out delay-150 duration-200  hover:bg-amber-400  text-white font-bold rounded-2xl">Sign in</button>
                <div className="flex flex-row gap-1">
                    <p>Don't have an account?</p>
                    <Link className="text-orange-500 hover:underline" to='/Signup'>Sign up here</Link>
                </div>
            </form>
            </div>

            
            
         </div>

        </div>
        </>
    )

   
    }



export default Signin;