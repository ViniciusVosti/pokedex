
import { Node } from '../node';

export class PokemonRest {
    node = null;

    constructor() {
        this.node = new Node();
    }

    getPokemons(obj={ page: 0, text: "" }) {
        let metodo = global.config.getMetodo('/pokemon/', true, obj.page, obj.text) 
        return this.node.rfc(metodo, obj);
    }
    
    getPokemon(obj={ page: 0, text: "" }) {
        let metodo = global.config.getMetodo('/pokemon/', false, obj.page, obj.text) 
        return this.node.rfc(metodo, obj);
    }
}

var pokemon = new PokemonRest();
global.pokemon = pokemon;
export var pokemon;