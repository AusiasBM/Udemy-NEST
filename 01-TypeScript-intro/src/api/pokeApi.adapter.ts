import axios from "axios";

// Interfaz para poder mantener el principio de sustitución de SOLID
export interface HttpAdapter{

    get<T>(url: string): Promise<T>;

}

export class PokeApiFetchAdapter implements HttpAdapter{

    async get<T>( url: string ): Promise<T>{
        const resp = await fetch(url);
        // la T es el tipo de dato que nos devuelve la llamada
        const data: T = await resp.json();

        return data;
    }

}


export class PokeAPiAdapter implements HttpAdapter{

    private readonly axios = axios;

    // la T es el tipo de dato que nos devuelve la llamada
    async get<T>(url: string){
        const { data } = await this.axios.get<T>(url);
        return data;
    }

    async post( url: string, data: any ){}

    async patch( url: string, data: any ){}

    async delete( url: string ){}

}