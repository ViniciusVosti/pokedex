const DEBUG = true;
const BASEDIR_DEV = "https://pokeapi.co/api/v2";
const BASEDIR_PRO = "https://pokeapi.co/api/v2";
const BASEDIR = DEBUG ? BASEDIR_DEV : BASEDIR_PRO;

var config = {
	debug: DEBUG,
    basedir: BASEDIR,
    offset: 20, // Quantidade de itens por paginação
    isDebuggingEnabled: (typeof atob !== 'undefined'), // verifica se o debugging esta ativo ou não

    getMetodo: (metodo="", pagination=false, page=0, text="") => {
        if(pagination){
            return metodo + text + "?offset=" + (page*global.config.offset) + "?limit=" + global.config.offset
        }
        else{
            return metodo
        }
    }
}

global.config = config;
export var config;
