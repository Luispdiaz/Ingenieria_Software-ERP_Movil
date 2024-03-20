import React, { createContext, useContext } from 'react';
import { Supa } from '../Supabase/supabase'; // Ajusta la ruta según tu estructura de archivos

const CompanyContext = createContext();

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext debe ser usado dentro de un CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  // No necesitas useState para un solo registro
  const obtenerEmpresa = async () => {
    try {
      const { data: empresa, error } = await Supa.from('Empresa').select('*').single();
      if (error) throw error;
      return empresa;
    } catch (error) {
      console.error('Error al obtener empresa:', error.message);
      return null; // O devuelve un objeto vacío según lo que necesites en tu app
    }
  };

  // No necesitas useEffect para obtener el registro al iniciar la app
  const empresa = obtenerEmpresa(); // Llama a la función para obtener el registro

  return (
    <CompanyContext.Provider value={{ empresa }}>
      {children}
    </CompanyContext.Provider>
  );
};
