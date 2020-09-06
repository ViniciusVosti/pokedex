import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';

class AsyncDb{
    device = null;
    favorites = [];

    async init() {
        this.device = await DeviceInfo.getUniqueId();
        let dbdata = global.db.get("data");
        if (dbdata) {
            if (dbdata.favorites) this.favorites = dbdata.favorites;
        }

        global.store.dispatch({
            type: 'POKEMON_SET_FAVORITES',
            data: dbdata
        })
    }

    syncDb() {
        global.db.set("data", { favorites: this.favorites });
    }

    // obj
    insertFavorite(pokemon){
        return new Promise((resolve, reject) => {
            this.favorites = [...this.favorites, pokemon];
            this.syncDb();
            resolve();
        });
    }

    // Nome do pokemon
    removerFavorite(pokemon){
        return new Promise((resolve, reject) => {
            this.favorites = this.favorites.filter((item, key) => {
                if(pokemon !== item.name){
                    return true;
                }else{
                    return false;
                }
            })
            this.syncDb();
            resolve();
        });
    }

}

var asyncdb = new AsyncDb();
global.asyncdb = asyncdb;
export var asyncdb;
