export class BaseModel {

    constructor(data = {}){
        Object.assign(this, data);
    }

    toJSON(){
        const obj = {...this};
        delete obj.service;
        return obj;
    }

    async crear(){
        return await this.service.crear(this.toJSON());
    }

    async eliminar(){
        return await this.service.eliminar(this.id);
    }

    static async listar(){
        const instance = new this();
        return await instance.service.listar();
    }

}