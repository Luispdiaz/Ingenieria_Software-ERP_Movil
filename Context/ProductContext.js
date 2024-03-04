import { createContext, useContext, useState } from "react";
import { Supa } from "../Supabase/supabase";

export const ProductContext = createContext()

export const useProducts = () =>{
    const context = useContext(ProductContext)
    return context
}


export const ProductContextProvider = ({children}) =>{

    const [Productos, setProductos] = useState([])

    const getProducts = async () => {
        const {error, data} = await Supa.from("Productos").select();
        
        if (error) throw error;

        setProductos(data)
    }

    const createProduct = async (Nombre,Imagen,CodProveedor,Categoria,Descripcion,Marca,CantidadInicial,CantidadMaxima,CantidadMinima,CantidadRestock,CostoD,CostoE,PrecioD,PrecioE,Porcentaje,TipoImpuesto) => {
        try {
            const {error, data} = await Supa.from('Productos').insert([
                {nombre: Nombre,
                imagen: Imagen,
                sub_categorias: null,
                cod_proveedor: CodProveedor,
                descripcion: Descripcion,
                color: null,
                categoria: Categoria,
                marca: Marca,
                modelo: null,
                cantidad_existencia: CantidadInicial,
                minima_cantidad:CantidadMinima,
                maxima_cantidad:CantidadMaxima,
                reordenar_cantidad:CantidadRestock,
                costo_promedio_usd:null,
                costo_promedio_efectivo:null,
                costo_usd: CostoD,
                costo_efectivo:CostoE,
                precio_usd:PrecioD,
                precio_efectivo:PrecioE,
                tipo_impuesto:TipoImpuesto,
                descuento_promocion:null,
                conversion_usd_efectivo:null,
                valor_descuento_promocion:Porcentaje}
            
            ]).select()
          if (error) throw error

          setProductos([...Productos,...data])

        } catch (error) {
          console.error(error);
        }

    }

    const UpdateProduct = async (id, CamposActualizados) => {
        const {error , data } = await Supa.from("Productos").update(CamposActualizados).eq("id_producto",id).select()
        

        if (error) throw error

        setProductos(Productos.map(producto => 
            producto.id_producto === id ? { ...producto, ...CamposActualizados } : producto
        ))
    }

    return(
        <ProductContext.Provider value={{Productos, getProducts, createProduct, UpdateProduct}}>
        {children}
        </ProductContext.Provider>
    )
}