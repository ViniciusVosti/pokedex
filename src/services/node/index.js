import axios from 'axios';
import { config } from '../../util';

export class Node {
    debug = false;

    constructor() {
        if (global.config.isDebuggingEnabled) {
            GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
        }
        this.debug = global.config.debug;
    }

    rest(metodo, body = {}, phplogin = null, filter = true, use_axios = true) {
        return new Promise((resolve, reject) => {
            this.rfc(metodo, body, phplogin, filter, use_axios).then((data) => {
                resolve(data.data);
            }, reject);
        });
    }

    rfc(metodo, body = {}, phplogin = null, filter = true, use_axios = true, axios_get = true) {
        if (this.debug) console.log('Certo 3', body);

        let rest = null;

        if (use_axios) {
            rest = this._axios(body, null, false, axios_get, metodo);
        } else {
            rest = this._fetch(body, null, false, metodo);
        }

        return new Promise((resolve, reject) => {
            rest.then(response => {
                this.verifyResponse(response, phplogin, filter, resolve, reject);
            })
            .catch((error) => {
                if (this.debug) console.log("Node rfc fetch reject 1", error)
                reject({ error: 99, error_msg: "Erro ao tentar acessar o servidor, problema com internet!", error_type: "erro_access" });
            });
        });
    }

    verifyResponse(response, phplogin, filter, resolve, reject) {
        if (this.debug) console.log("Este Node rfc fetch", response);
        if (response.hasOwnProperty("data") || response.data.hasOwnProperty("error")) {
            let data = response.data;
            if (data.error) {
                if (this.debug) console.log("Node rfc fetch reject 3");
                reject(data);
            } else {
                resolve(data);
            }
        } else {
            if (this.debug) console.log("Node rfc fetch reject 2", response);
            reject({ error: 99, error_msg: "Erro ao tentar retornar os dados do servidor!", error_type: "erro_get_data" });
        }
    }

    _axios(body, authorization = null, form = false, axios_get = true, metodo = "") {
        let link = global.config.basedir + metodo;
        let headers = {};

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        // if (authorization != null) headers['Authorization'] = authorization;

        if(axios_get){
            return axios.get(link, body, { headers });
        }
        else{
            return axios.post(link, body, { headers });
        }
    }

    _fetch(body, authorization = null, form = false, metodo = "") {
        let link = global.config.basedir + "";
    
        let headers = {};
    
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    
        // if(authorization != null) headers['Authorization'] = authorization;
    
        return fetch(link, { method: "POST", body, headers, });
      }

}
