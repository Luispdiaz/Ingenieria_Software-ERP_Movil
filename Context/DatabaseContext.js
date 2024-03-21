import { createContext, useContext, useState } from "react";
import { Supabase } from "../Supabase/supabaseCompany";


export const DatabaseContext = createContext()

export const useDatabase = () =>{
    const context = useContext(DatabaseContext)
    return context
}

export const DatabaseContextProvider = ({children}) =>{

    const [Database, setDatabase] = useState([])
    const [Empresa_url, setEmpresa_url] = useState("https://vsdhddvwfeuuhqdscygz.supabase.co");
    const [Empresa_token, setEmpresa_token] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZGhkZHZ3ZmV1dWhxZHNjeWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjM3MDksImV4cCI6MjAyNTk5OTcwOX0.FE-0zUqoMrH204EwZKKCBhDzR9uLQGAp2XX3S8Sv2jw");
    
    const buscarDatabase = async (id_empresa) => {
        console.log("ID", id_empresa)
        try {
          const { data: empresa, error } = await Supabase
            .from('empresa')
            .select('database_url,database_token')
            .eq('id', id_empresa)
          
          if (error) {
            console.log(error)
            return;
          }
          setDatabase(empresa)
          setEmpresa_url(empresa[0].database_url)
          setEmpresa_token(empresa[0].database_token)
        } catch (error) {
          console.error('Error general:', error.message);
        }
      };
    return(
        <DatabaseContext.Provider value={{Database, buscarDatabase, Empresa_url, Empresa_token}}>
        {children}
        </DatabaseContext.Provider>
    )
}