export class BaseService {

    constructor(urls){
        this.urls = urls;
    }

    async crear(data){

        const response = await fetch(this.urls.crear,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });

        return await response.json();
    }

    async listar(){

        const response = await fetch(this.urls.listar);

        return await response.json();
    }

    async eliminar(id){

        const response = await fetch(this.urls.eliminar,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        });

        return await response.json();
    }

}