declare var global:any;

if(!global.singleton) {
    global.singleton = {};
}

export class Singleton {
    static GetInstance(){
        return global.singleton;
    }
}