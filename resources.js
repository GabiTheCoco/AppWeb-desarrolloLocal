import { peruanizar } from "./scripts.js"


const apiKey = "";

let bandera = true;


export function callApi(country, city, peruano, map){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`;
    

    fetch(url)
        .then(data => {
            return data.json()
        })
        .then(dataJson => {
            if(dataJson.cod === '404' || dataJson.cod === '401'){
                alert('sos trolo');
            } else{          
                localStorage.setItem("codeIso", country);
                localStorage.setItem("city", city);
                localStorage.setItem("lat", dataJson.coord.lat)
                localStorage.setItem("lon", dataJson.coord.lon)
                peruanizar(peruano);
                weatherLayer(dataJson.coord.lat, dataJson.coord.lon, map, dataJson.name);
                showData(dataJson);
                localStorage.setItem("peruano", "true");
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export function showData(data){
    const {main:{temp, feels_like, humidity, pressure, temp_max, temp_min}, weather:[arr], sys:{sunrise, sunset}} = data;
    
    let resumen = document.querySelector(".resumen");
    let estadoTiempo = document.querySelector(".estadoTiempoP");
    let iconTemp = document.querySelector(".iconTemp");
    let temperatura = document.querySelector(".tempP");
    let sensacionTermica = document.querySelector(".sensacionTermicaP");
    let tempMax = document.querySelector(".tempMaxP");
    let tempMin = document.querySelector(".tempMinP");
    let humedad = document.querySelector(".humedadP");
    let presion = document.querySelector(".presionP");
    let amanecer = document.querySelector(".amanecerP");
    let anochecer = document.querySelector(".anochecerP");
    
    console.log(data);

    resumen.innerHTML = data.name +", " + data.sys.country;

    iconTemp.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;
    temperatura.innerHTML = Math.round(temp) + "°c";
    sensacionTermica.innerHTML = Math.round(feels_like) + "°c";
    tempMax.innerHTML = Math.round(temp_max) + "°c";
    tempMin.innerHTML = Math.round(temp_min) + "°c";
    humedad.innerHTML = humidity + "%";
    presion.innerHTML = pressure + "hPa";
    amanecer.innerHTML = unixTimer(sunrise);
    anochecer.innerHTML = unixTimer(sunset);

    estadoTiempo.innerHTML = arr.description;
}

export function crearCositas(bloqueClima, bloqueMapa){
    
    let contenedorClima_1 = document.createElement("div");
    contenedorClima_1.classList.add("contenedorClima1");
    let resumen = document.createElement("div");
    resumen.classList.add("resumen");
    let contenedorTemp_1 = document.createElement("div");
    contenedorTemp_1.classList.add("contenedorTemp1");
    let contenedorTemp_2 = document.createElement("div");
    contenedorTemp_2.classList.add("contenedorTemp2");
    let contenedorTemp_3 = document.createElement("div");
    contenedorTemp_3.classList.add("contenedorTemp3");
    let mainTemp = document.createElement("div");
    mainTemp.classList.add("mainTemp");

    let iconTemp = document.createElement("img");
    iconTemp.classList.add("iconTemp");
    let temperatura = document.createElement("div");
    let labelTemp = document.createElement("label");
    let tempP = document.createElement("p");
    labelTemp.classList.add("labelTemp");
    temperatura.classList.add("temperatura");
    tempP.classList.add("tempP");
    let sensacionTermica = document.createElement("div");
    let labelSensacionTermica = document.createElement("label");
    let sensacionTermicaP = document.createElement("p");
    labelSensacionTermica.classList.add("labelSensacionTermica");
    sensacionTermica.classList.add("sensacionTermica");
    sensacionTermicaP.classList.add("sensacionTermicaP");
    let tempMax = document.createElement("div");
    let labelTempMax = document.createElement("label");
    let tempMaxP = document.createElement("p");
    labelTempMax.classList.add("labelTempMax");
    tempMax.classList.add("tempMax");
    tempMaxP.classList.add("tempMaxP");
    let tempMin = document.createElement("div");
    let labelTempMin = document.createElement("label");
    let tempMinP = document.createElement("p");
    labelTempMin.classList.add("labelTempMin");
    tempMin.classList.add("tempMin");
    tempMinP.classList.add("tempMinP");
    let estadoTiempo = document.createElement("div");
    let labelEstadoTiempo = document.createElement("label");
    let estadoTiempoP = document.createElement("p");
    labelEstadoTiempo.classList.add("labelEstadoTiempo");
    estadoTiempo.classList.add("estadoTiempo");
    estadoTiempoP.classList.add("estadoTiempoP");

    labelTemp.innerHTML += "Temparatura";
    labelSensacionTermica.innerHTML  += "Sensación térmica ";
    labelTempMax.innerHTML += "Temperatura máxima ";
    labelTempMin.innerHTML += "Temperatura minima ";
    labelEstadoTiempo.innerHTML += "Estado del tiempo ";

    let contenedorClima_2 = document.createElement("div");
    contenedorClima_2.classList.add("contenedorClima2");
    let humedad = document.createElement("div");
    let labelHumedad = document.createElement("label");
    let humedadP = document.createElement("p");
    humedad.classList.add("humedad");
    labelHumedad.classList.add("labelHumedad");
    humedadP.classList.add("humedadP");
    let contenedorTiempo = document.createElement("div");
    contenedorTiempo.classList.add("contenedorTiempo");
    let amanecer = document.createElement("div");
    let labelAmanecer = document.createElement("label");
    let amanecerP = document.createElement("p");
    amanecer.classList.add("amanecer");
    labelAmanecer.classList.add("labelAmanecer");
    amanecerP.classList.add("amanecerP");
    let anochecer = document.createElement("div");
    let labelAnochecer = document.createElement("label");
    let anochecerP = document.createElement("p");
    anochecer.classList.add("anochecer");
    labelAnochecer.classList.add("labelAnochecer");
    anochecerP.classList.add("anochecerP");
    let presion = document.createElement("div");
    let labelPresion = document.createElement("label");
    let presionP = document.createElement("p");
    presion.classList.add("presion");
    labelPresion.classList.add("labelPresion");
    presionP.classList.add("presionP");

    labelHumedad.innerHTML = "Humedad";
    labelAmanecer.innerHTML = "Amanecer";
    labelAnochecer.innerHTML = "Anochecer";
    labelPresion.innerHTML = "Presión";

    temperatura.appendChild(labelTemp);
    temperatura.appendChild(tempP);
    sensacionTermica.appendChild(labelSensacionTermica);
    sensacionTermica.appendChild(sensacionTermicaP);
    tempMax.appendChild(labelTempMax);
    tempMax.appendChild(tempMaxP);
    tempMin.appendChild(labelTempMin);
    tempMin.appendChild(tempMinP);
    estadoTiempo.appendChild(labelEstadoTiempo);
    estadoTiempo.appendChild(estadoTiempoP);    
    
    contenedorClima_1.appendChild(mainTemp);

    contenedorClima_1.appendChild(contenedorTemp_1);
    contenedorClima_1.appendChild(estadoTiempo);

    mainTemp.appendChild(iconTemp);
    mainTemp.appendChild(temperatura);
    contenedorTemp_2.appendChild(mainTemp);
    contenedorTemp_2.appendChild(sensacionTermica);
    contenedorTemp_1.appendChild(contenedorTemp_2);
    contenedorTemp_1.appendChild(contenedorTemp_3);

    contenedorTemp_3.appendChild(tempMax);
    contenedorTemp_3.appendChild(tempMin);

    contenedorClima_2.appendChild(humedad);
    humedad.appendChild(labelHumedad);
    humedad.appendChild(humedadP);
    contenedorTiempo.appendChild(amanecer);
    amanecer.appendChild(labelAmanecer);
    amanecer.appendChild(amanecerP);
    contenedorTiempo.appendChild(anochecer);
    anochecer.appendChild(labelAnochecer);
    anochecer.appendChild(anochecerP);
    contenedorClima_2.appendChild(contenedorTiempo);
    contenedorClima_2.appendChild(presion);
    presion.appendChild(labelPresion);
    presion.appendChild(presionP);
    bloqueClima.appendChild(resumen);
    bloqueClima.appendChild(contenedorClima_1);
    bloqueClima.appendChild(contenedorClima_2);

    let mapa = document.querySelector("#map");
    mapa.style.display = "block";
    bloqueMapa.appendChild(mapa);
}

export function unixTimer(unixTiempo){
    let fecha = new Date(unixTiempo * 1000);
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();

    if(minutos < 10)
        minutos = '0' + fecha.getMinutes();

    return hora + ":" + minutos;
}

export function weatherLayer(lat, long, map, city){

    L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    }).addTo(map);
    
    if(!bandera)
        map.flyTo([lat, long], 4);
    else{
        map.setView([lat, long], 4);
        bandera = false;
    }
    

    let marcador = L.marker([lat, long]).addTo(map).bindPopup(city);

    marcador.on("dblclick", () => {
        map.flyTo([lat, long], 12);
    })
    
}