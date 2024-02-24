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

    const createProduct = async (Nombre, Imagen,CodProveedor,Descripcion,Categoria,Marca,CantidadInicial,CostoD,CostoE,PrecioD,PrecioE,TipoImpuesto) => {
        try {
            const {error, data} = await Supa.from('Productos').insert([
                {nombre: Nombre,
                Imagen: Imagen,
                sub_categorias: null,
                cod_proveedor: CodProveedor,
                descripcion: Descripcion,
                color: null,
                categoria: Categoria,
                marca: Marca,
                modelo: null,
                cantidad_existencia: CantidadInicial,
                minima_cantidad:null,
                maxima_cantidad:null,
                reordenar_cantidad:null,
                costo_promedio_usd:null,
                costo_promedio_efectivo:null,
                costo_usd: CostoD,
                costo_efectivo:CostoE,
                precio_usd:PrecioD,
                precio_efectivo:PrecioE,
                tipo_impuesto:TipoImpuesto,
                descuento_promocion:null,
                conversion_usd_efectivo:null,
                valor_descuento_promocion:null}
            
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

    const buscarProductos = async (searchText) => {
        try {
          const { data, error } = await Supa
            .from("Productos")
            .select('*')
            .or(`nombre.ilike."*${searchText}*",descripcion.ilike."*${searchText}*",categoria.ilike."*${searchText}*",sub_categorias.ilike."*${searchText}*",color.ilike."*${searchText}*",marca.ilike."*${searchText}*",modelo.ilike."*${searchText}*"`);
          
          if (error) {
            return;
          }
          setProductos(data)
        } catch (error) {
          console.error('Error general:', error.message);
        }
      };

    return(
        <ProductContext.Provider value={{Productos, getProducts, createProduct, UpdateProduct, buscarProductos}}>
        {children}
        </ProductContext.Provider>
    )
}