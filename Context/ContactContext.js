import { createContext, useContext, useState } from "react";
import { Supa } from "../Supabase/supabase";

export const ContactContext = createContext()

export const useContact = () =>{
    const context = useContext(ContactContext)
    return context
}


export const ContactContextProvider = ({children}) =>{

    const [Contactos, setContactos] = useState([])

    const getContacts = async () => {
        const {error, data} = await Supa.from("Contacto").select();
        
        if (error) throw error;
        const contactosOrdenados = [...data].sort((a, b) => a.nombre.localeCompare(b.nombre));
        setContactos(contactosOrdenados)
    }

    const buscarContactos = async (searchText) => {
        try {

          const { data, error } = await Supa
            .from("Contacto")
            .select('*')
            .or(`nombre.ilike."*${searchText}*",correo.ilike."*${searchText}*",direccion.ilike."*${searchText}*"`);
          
          if (error) {
            console.log(error)
            return;
          }
          const contactosOrdenados = [...data].sort((a, b) => a.nombre.localeCompare(b.nombre));
          setContactos(contactosOrdenados)
        } catch (error) {
          console.error('Error general:', error.message);
        }
      }

      const buscarContactosporTipo = async (Tipo) => {
        try {
          const { data, error } = await Supa
            .from("Contacto")
            .select('*')
            .eq(Tipo, true)
      
          if (error) {
            return;
          }
          
          const contactosOrdenados = [...data].sort((a, b) => a.nombre.localeCompare(b.nombre));
          setContactos(contactosOrdenados);
        } catch (error) {
          console.error('Error general:', error.message);
        }
      }
      
      const createContact = async (cont_tipo_documento,
        cont_id_fiscal,
        nombre,
        fecha_nacimiento,
        cod_telefono,
        telefono,
        correo,
        direccion,
        contribuyente,
        condicion_venta,
        credito_total,
        credito_vence,
        vendedor,
        fecha_ingreso,
        cliente,
        empleado,
        proveedor,
        imagen,
        Contacto_pkey) => {
        try {
            const {error, data} = await Supa.from('Contacto').insert([
                {cont_tipo_documento:cont_tipo_documento,
                  cont_id_fiscal:cont_id_fiscal,
                  nombre:nombre,
                  fecha_nacimiento:fecha_nacimiento,
                  cod_telefono:cod_telefono,
                  telefono:telefono,
                  correo:correo,
                  direccion:direccion,
                  contribuyente:contribuyente,
                  condicion_venta:condicion_venta,
                  credito_total:credito_total,
                  credito_vence:credito_vence,
                  vendedor:vendedor,
                  fecha_ingreso:fecha_ingreso,
                  cliente:cliente,
                  empleado:empleado,
                  proveedor:proveedor,
                  imagen:imagen,
                  Contacto_pkey:Contacto_pkey}
            
            ]).select()
          if (error) throw error
          const contactosOrdenados = [...data].sort((a, b) => a.nombre.localeCompare(b.nombre));
          setContactos(contactosOrdenados);

        } catch (error) {
          console.error(error);
        }

    }
    const UpdateContact = async (id, CamposActualizados) => {
      const {error , data } = await Supa.from("Contacto").update(CamposActualizados).eq("cont_tipo_documento",id).select()

      if (error) throw error

      const contactosActualizados = Contactos.map(contacto =>
        contacto.cont_tipo_documento === id ? { ...contacto, ...CamposActualizados } : contacto
      );
      const contactosOrdenados = [...contactosActualizados].sort((a, b) => a.nombre.localeCompare(b.nombre));
      
      setContactos(contactosOrdenados);
  }


    return(
        <ContactContext.Provider value={{Contactos, getContacts, buscarContactos, buscarContactosporTipo, createContact, UpdateContact}}>
        {children}
        </ContactContext.Provider>
    )
}