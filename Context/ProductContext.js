import { createContext, useContext, useState } from "react";
import { Supa } from "../Supabase/supabase";
import { useVenta } from "./VentaContext";

export const ProductContext = createContext()

export const useProducts = () =>{
    const context = useContext(ProductContext)
    return context
}


export const ProductContextProvider = ({children}) =>{

    const [Productos, setProductos] = useState([])
    const [Categorias, setCategorias] = useState([])
    const { AgregarProductoVenta } = useVenta()

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

    const buscarProductos = async (searchText) => {
        try {

          const { data, error } = await Supa
            .from("Productos")
            .select('*')
            .or(`nombre.ilike."*${searchText}*",descripcion.ilike."*${searchText}*",categoria.ilike."*${searchText}*",sub_categorias.ilike."*${searchText}*",color.ilike."*${searchText}*",marca.ilike."*${searchText}*",modelo.ilike."*${searchText}*",cod_proveedor.ilike."*${searchText}*"`);
          
          if (error) {
            return;
          }
          setProductos(data)
        } catch (error) {
          console.error('Error general:', error.message);
        }
      };

      const obtenerCategoriasUnicas = async () => {
        try {
          const { data, error } = await Supa
            .from("Productos")
            .select("categoria")
      
          if (error) {
            throw error;
          }
          
  const todasLasCategorias = data.map(item => item.categoria);
  const categoriasUnicas = [...new Set(todasLasCategorias)];
  setCategorias(categoriasUnicas)
      
        } catch (error) {
          console.error('Error al obtener categorías:', error.message);
          return [];
        }
      };

      const buscarProductosPorCategoria = async (categoria) => {
        try {
          const { data, error } = await Supa
            .from("Productos")
            .select('*')
            .eq('categoria', categoria);
      
          if (error) {
            return;
          }
          
          setProductos(data);
        } catch (error) {
          console.error('Error general:', error.message);
        }
      }

      const modificarCantidadExistencia = async (idProducto, nuevaCantidad) => {
        try {
          const { data, error } = await Supa
            .from("Productos")
            .update({ cantidad_existencia: nuevaCantidad })
            .eq("id_producto", idProducto)
            .select();
    
          if (error) {
            throw error;
          }
    
          setProductos((productos) =>
            productos.map((producto) =>
              producto.id_producto === idProducto
                ? { ...producto, cantidad_existencia: nuevaCantidad }
                : producto
            )
          );
        } catch (error) {
          console.error('Error al modificar cantidad_existencia:', error.message);
        }
      }

      const AgregarProductoCodProveedor = (cod_proveedor) => {

        const producto = Productos.find(producto => producto.cod_proveedor === cod_proveedor)
        if(producto){
          const productoConCantidad = {
            ...producto,
            cantidad: 1,
        }
          AgregarProductoVenta(productoConCantidad)
          return true
        }
        else{
          return false
        }
      }


    return(
        <ProductContext.Provider value={{Productos, getProducts, createProduct, UpdateProduct, buscarProductos, obtenerCategoriasUnicas, Categorias, buscarProductosPorCategoria, modificarCantidadExistencia, AgregarProductoCodProveedor}}>
        {children}
        </ProductContext.Provider>
    )
}