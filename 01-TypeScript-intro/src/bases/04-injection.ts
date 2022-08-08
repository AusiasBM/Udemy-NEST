
import { HttpAdapter, PokeAPiAdapter, PokeApiFetchAdapter } from '../api/pokeApi.adapter';
import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interfaces';

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }
  
    constructor(
        public readonly id: number, 
        public name: string,
        // Todo: inyectar dependencias
        // Esto lo que hacemos es que esperamos una instancia de la interface HttpAdapter
        // y le ponemos el nombre de http y que no se pueda modificar con readonly
        // lo que conseguimos es que en nuestra clase vamos a llamar a get o a post o delete, etc y en el adapter vamos a utilizar
        // la librería que queramos, sea axios, fetch, ajax, etc.
        // de esta forma en caso de cambiar la forma en la que llamamos, no nos cambia los objetos
        private readonly http: HttpAdapter
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<Move[]> {
        // para poder enviar el tipo de objeto que nos devuelve tenemos que en el método poner que nos van a enviar el tipo con una T
        const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        console.log( data.moves );
        
        return data.moves;
    }

}

const pokeApiAxios = new PokeAPiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon( 4, 'Charmander', pokeApiFetch );

charmander.getMoves();