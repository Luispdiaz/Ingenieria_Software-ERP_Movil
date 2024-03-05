import { createContext, useContext, useState } from "react";
import { Supa } from "../Supabase/supabase";

export const VentaContext = createContext()


export const useVenta = () =>{
    const context = useContext(VentaContext)
    return context
}


export const VentaContextProvider = ({children}) =>{
  const [Cliente, setCliente] = useState(null);
  const [ProductosVenta, setProductosVenta] = useState([])

    
  const AgregarProductoVenta = async (ProductoNuevo) => {
    setProductosVenta([...ProductosVenta, ProductoNuevo]);
  };

  const EliminarProductoVenta = async (ProductoNuevo) => {
    const nuevosProductos = ProductosVenta.filter(
      (producto) => producto.id_producto !== ProductoNuevo.id_producto
    );
    setProductosVenta(nuevosProductos);
  };

  const ModificarCantidadProducto = async (productoId, nuevaCantidad) => {
    const productosActualizados = ProductosVenta.map((producto) => {
      if (producto.id_producto === productoId) {
        // Actualiza solo la cantidad del producto específico
        return {...producto, cantidad: nuevaCantidad};
      }
      return producto;
    });

    setProductosVenta(productosActualizados);
  };

  const VerificarProductoExistente = (productoId) => {
    return ProductosVenta.some((producto) => producto.id_producto === productoId);
  }

  const CrearCliente = (contacto) => {
    setCliente(contacto);
  };

  const EliminarCliente = () => {
    setCliente(null);
  };

  const ReiniciarVariables = () => {
    setCliente(null);
    setProductosVenta([]);
  };

    return(
        <VentaContext.Provider value={{ProductosVenta, Cliente, AgregarProductoVenta, EliminarProductoVenta, ModificarCantidadProducto, VerificarProductoExistente, CrearCliente, ReiniciarVariables}}>
        {children}
        </VentaContext.Provider>
    )
}