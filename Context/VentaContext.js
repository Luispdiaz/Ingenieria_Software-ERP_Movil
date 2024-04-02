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
  const [DatosFactura, setDatosFactura] = useState({})
  const [Movimientos, setMovimientos] = useState([])
  const [Encabezado, setEncabezado] = useState([])


    
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
  const VerificarProductoExistentecod_proveedor = (cod_proveedor) => {
    return ProductosVenta.some((producto) => producto.cod_proveedor === cod_proveedor);
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

  const IngresarDatosFactura = (nuevosDatos) => {
    setDatosFactura(prevDatos => ({
      ...prevDatos,
      ...nuevosDatos
    }));
  };

  const createMovimiento_Inventario = async (cantidad, precio_usd, precio_efectivo, costo_usd, costo_efectivo, porcentaje_impuesto, porcentaje_descuento, fecha, mov_cod_tipo_encabezado, mov_cod_encabezado, precio_x_cantidad,mov_id_producto) => {
    try {
        const {error, data} = await Supa.from('Movimiento_Inventario').insert([
            {
              cantidad: cantidad,
              precio_usd: precio_usd,
              precio_efectivo: precio_efectivo,
              costo_usd: costo_usd,
              costo_efectivo: costo_efectivo,
              porcentaje_impuesto: porcentaje_impuesto,
              porcentaje_descuento: porcentaje_descuento,
              fecha: fecha,
              mov_cod_tipo_encabezado: mov_cod_tipo_encabezado,
              mov_cod_encabezado: mov_cod_encabezado,
              precio_x_cantidad: precio_x_cantidad,
              mov_id_producto
            }
        ]).select()
      if (error) throw error

      setMovimientos([...Movimientos,...data])

    } catch (error) {
      console.error(error);
    }
    }

    const createEncabezado = async (
      enc_tipo_encabezado,
      enc_cod_encabezado,
      enc_tipo_documento,
      enc_id_fiscal,
      fecha_factura,
      nro_control,
      condicion_venta,
      cambio_dolar,
      observaciones,
      total_productos,
      total_items,
      caja,
      sub_total,
      porcentaje_igtf,
      total_resultado_igtf,
      porcentaje_iva,
      total_resultado_iva,
      total_efectivo,
      total_usd,
      cajero,
      Contacto
    ) => {
      try {
        const { error, data } = await Supa.from('Encabezado').insert([
          {
            enc_tipo_encabezado: enc_tipo_encabezado,
            enc_cod_encabezado: enc_cod_encabezado,
            enc_tipo_documento: enc_tipo_documento,
            enc_id_fiscal: enc_id_fiscal,
            fecha_factura: fecha_factura,
            nro_control: nro_control,
            condicion_venta: condicion_venta,
            credito_vence_fecha: null,
            cambio_dolar: cambio_dolar,
            observaciones: observaciones,
            total_productos: total_productos,
            total_items: total_items,
            caja: caja,
            sub_total: sub_total,
            porcentaje_igtf: porcentaje_igtf,
            total_resultado_igtf: total_resultado_igtf,
            porcentaje_iva: porcentaje_iva,
            total_resultado_iva: total_resultado_iva,
            excento_total: null,
            total_efectivo: total_efectivo,
            total_usd: total_usd,
            cajero: cajero,
            vendedor:null,
            Contacto: Contacto
          }
        ]).select();
    
        if (error) throw error;
    
        // Aquí puedes agregar cualquier lógica adicional después de insertar el encabezado
        setEncabezado([...Encabezado,...data])
      } catch (error) {
        console.error(error);
      }
    };

    const getEncabezado = async () => {
      const {error, data} = await Supa.from("Encabezado").select();
      
      if (error) throw error;
      setEncabezado(data)
  }

  const buscarMovimientoporTipo = async (Tipo) => {
    try {
      let TipoBuscar = Tipo; // Declarar TipoBuscar antes del bloque try
  
      if (Tipo === "Pedido") {
        TipoBuscar = "Compra"; // Asignar valor a TipoBuscar según el tipo de movimiento
      }

      if (Tipo === "N/E") {
        TipoBuscar = "Nota de Entrega"; // Asignar valor a TipoBuscar según el tipo de movimiento
      }
  
      const { data, error } = await Supa
        .from("Encabezado")
        .select('*')
        .or(`enc_tipo_documento.ilike."*${TipoBuscar}*",enc_tipo_encabezado.ilike."*${TipoBuscar}*"`);
  
      if (error) {
        return;
      }
      
      setEncabezado(data);
    } catch (error) {
      console.error('Error general:', error.message);
    }
  };

  const obtenerTotalEfectivoVentas = async () => {
    try {
      // Realizar la consulta a la base de datos para obtener los encabezados de venta
      const { data, error } = await Supa
        .from('Encabezado')
        .select('total_efectivo')
        .eq('enc_tipo_encabezado', 'Venta');
  
      if (error) {
        console.error('Error al obtener los encabezados de venta:', error.message);
        return null;
      }
  
      // Sumar los valores de total_efectivo de las ventas
      const totalEfectivoVentas = data.reduce((total, venta) => {
        // Asegurarse de que total_efectivo sea un número antes de sumarlo
        const totalEfectivo = parseFloat(venta.total_efectivo) || 0;
        return total + totalEfectivo;
      }, 0);
  
      return totalEfectivoVentas;
    } catch (error) {
      console.error('Error al obtener los encabezados de venta:', error.message);
      return null;
    }
  };

  const obtenerTotalEfectivoCompras = async () => {
    try {
      // Realizar la consulta a la base de datos para obtener los encabezados de compra
      const { data, error } = await Supa
        .from('Encabezado')
        .select('total_efectivo')
        .eq('enc_tipo_encabezado', 'Compra');
  
      if (error) {
        console.error('Error al obtener los encabezados de compra:', error.message);
        return null;
      }
  
      // Sumar los valores de total_efectivo de las compras
      const totalEfectivoCompras = data.reduce((total, compra) => {
        // Asegurarse de que total_efectivo sea un número antes de sumarlo
        const totalEfectivo = parseFloat(compra.total_efectivo) || 0;
        return total + totalEfectivo;
      }, 0);
  
      return totalEfectivoCompras;
    } catch (error) {
      console.error('Error al obtener los encabezados de compra:', error.message);
      return null;
    }
  };

    return(
        <VentaContext.Provider value={{ProductosVenta, Cliente,DatosFactura, Movimientos,Encabezado, AgregarProductoVenta, EliminarProductoVenta, ModificarCantidadProducto, VerificarProductoExistente, CrearCliente, ReiniciarVariables, IngresarDatosFactura, createMovimiento_Inventario, createEncabezado, getEncabezado, buscarMovimientoporTipo, obtenerTotalEfectivoCompras, obtenerTotalEfectivoVentas,VerificarProductoExistentecod_proveedor}}>
        {children}
        </VentaContext.Provider>
    )
}