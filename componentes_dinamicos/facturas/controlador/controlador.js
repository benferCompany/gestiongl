import { loading } from "../../../vistas/componentes/loading.js";

export const  getFacturas = async (param) => {
    try {
        loading(true);
        let url;
        url = param.selectValue==="Cliente"?param.URLS.venta:param.URLS.compra;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener las facturas');
        }
        const data = await response.json();
        loading(false);
        return data;
    } catch (error) {
        console.error('Error en getFacturas:', error);
        throw error;
    }
};