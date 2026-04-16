import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import type {User} from "../Types/Interface";
function Overview (){

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const fetchUsers = async () =>{

            try{

                const url = `http://localhost:3000/api/users/user/me`;
                const token = sessionStorage.getItem("token");
                if (!token){
                 return alert("User not logged in");
                }
                const res = await fetch(url, {
                    method: "GET",
                    headers: {Authorization: `Bearer ${token}`},
                });

                const data = await res.json();
                setUser(data);
                setIsLoading(false);
                
            } catch (error){
                setIsLoading(true);
                console.error('Error fetching user data', error);
            }
        }

        fetchUsers();
    }, []);

    return (

        <>
        
        <div>

      
        <Sidebar/>
        <div>


<div>
   

{isLoading && <p>Loading...</p>}

{user && (
<div className="flex flex-row items-center justify-center">
    <p>{user.username}</p>
    </div>
)}
        

</div>
</div>

            
  
        </div>

       
        </>
    )
}

export default Overview;