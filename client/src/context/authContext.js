import { createContext, useEffect, useState } from "react";
import httpsRequest from "../api/axios";
export const UserContext = createContext();
export const UserContextProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const login = async (inputs) => {
           try {
            const {data} = await httpsRequest.post('/auth/login', inputs);
            setCurrentUser(data.information
               )
           }catch(err) {
               console.log(err);
           }
        
    }
    const logout = () => {
        setCurrentUser(null);
    }
    useEffect(() => {
       localStorage.setItem('user', JSON.stringify(currentUser))
        },[currentUser])
    return (
        <UserContext.Provider value={{currentUser , login , logout , setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}