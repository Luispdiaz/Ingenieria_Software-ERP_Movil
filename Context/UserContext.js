import { createContext, useContext, useState } from "react";
// import { Supabase } from "../Supabase/supabaseCompany";
import { SupaClient } from "../Supabase/supabase";

export const UserContext = createContext()

export const useUser = () =>{
    const context = useContext(UserContext)
    return context
}

export const UserContextProvider = ({children}) =>{
    const Supa = SupaClient();
    const [User, setUser] = useState([])

    const buscarUser = async (user_email) => {
      
        try {
            const { data: { user } } = await Supa.auth.getUser()
          
        //   if (error) {
        //     console.log(error)
        //     return;
        //   }
          setUser(user)
        } catch (error) {
          console.error('Error general:', error.message);
        }
      };
    return(
        <UserContext.Provider value={{User, buscarUser}}>
        {children}
        </UserContext.Provider>
    )
}