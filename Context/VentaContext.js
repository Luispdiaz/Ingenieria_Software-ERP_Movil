import { createContext, useContext, useState } from "react";
import { Supa } from "../Supabase/supabase";

export const VentaContext = createContext()

export const useVenta = () =>{
    const context = useContext(VentaContext)
    return context
}


export const VentaContextProvider = ({children}) =>{

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

    return(
        <VentaContext.Provider value={{ProductosVenta, AgregarProductoVenta, EliminarProductoVenta, ModificarCantidadProducto, VerificarProductoExistente}}>
        {children}
        </VentaContext.Provider>
    )
}