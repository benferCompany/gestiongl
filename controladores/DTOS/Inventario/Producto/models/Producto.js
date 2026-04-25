import { BaseModel } from "../core/BaseModel.js";
import { BaseService } from "../services/BaseService.js";

export class Producto extends BaseModel {

    service = new BaseService({
        listar: "/servicios/principales/inventario/producto/consulta.php",
        crear: "/servicios/principales/inventario/producto/crear.php",
        eliminar: "/servicios/principales/inventario/producto/eliminar.php"
    });

    constructor(data = {}){

        super(data);

        this.id_producto = data.id_producto ?? "";
        this.descripcion = data.descripcion ?? "";
        this.costo = data.costo ?? 0;
        this.pvp = data.pvp ?? 0;

    }

}