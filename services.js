import { callApi } from "./resources.js";




export function weatherWatcher(codeIso, city, map){

    
    
    if(codeIso === "default" || city === ""){
        alert("sos trolo");
    }else{
        localStorage.setItem("peruano", "true");
        let peruano = JSON.parse(localStorage.getItem("peruano"));
        console.log(peruano); // en que rama estas del if
        callApi(codeIso, city, peruano, map);
    }

}