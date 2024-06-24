class Continentes {

    constructor() {

        this.europa = '';
        this.america = '';
        this.africa = '';
        this.oceania = '';
        this.asia = '';
        this.parejaValueText = { default: "Seleccione Continente", europe: "Europa", america: "América", africa: "África", asia: "Asia", oceania: "Oceanía" };
    }

    getEuropa() {
        return this.europa;
    }
    getAmerica() {
        return this.america;
    }
    getAfrica() {
        return this.africa;
    }
    getOceania() {
        return this.oceania;
    }
    getAsia() {
        return this.asia;
    }
    getContinente(nombreDelContinente) {
        if (nombreDelContinente == 'europe') {
            return this.europa;
        }
        else if (nombreDelContinente == 'america') {
            return this.america;
        }
        else if (nombreDelContinente == 'africa') {
            return this.africa;
        }
        else if (nombreDelContinente == 'asia') {
            return this.asia;
        }
        else if (nombreDelContinente == 'oceania') {
            return this.oceania;
        }
    }
    getParejaValueText() {
        return this.parejaValueText;
    }

    datosPais(nombreContinente, nombrePais) {
        console.log("Funcion datosPais");
        console.log("nombreContinente: " + nombreContinente);
        console.log("nombrePais: " + nombrePais);
        let copiaContinente;
        switch (nombreContinente) {
            case 'europe':
                copiaContinente = this.europa;
                break;
            case 'america':
                copiaContinente = this.america;
                break;
            case 'asia':
                copiaContinente = this.asia;
                break;
            case 'africa':
                copiaContinente = this.africa;
                break;
            case 'oceania':
                copiaContinente = this.oceania;
                break;
        }
        console.log("copiaContinente una vez se ha ejecutado el switch: ");
        console.log(copiaContinente);
        let datosPais = copiaContinente.find(pais => pais.name.common == nombrePais);
        console.log("datosPais son los datos del pais que buscamos utilizando el nombreContinente para saber en que continente esta y el nombrePais que hemos ido asociando al dato que extraemos del .name.common");
        console.log(datosPais);
        return datosPais;
    }
    async cargarContinentes() {
        try {
            this.europa = await this.respuestaJson('europe');
            this.america = await this.respuestaJson('america');
            this.africa = await this.respuestaJson('africa');
            this.asia = await this.respuestaJson('asia');
            this.oceania = await this.respuestaJson('oceania');
        } catch (error) {
            console.log(error);
        }
    }
    async respuestaJson(continente) {
        console.log("El nombre del continente esta en la variable 'continente' que pasamos a la función y que es: " + continente);
        console.log("La url entonces será: https://restcountries.com/v3.1/region/" + continente);
        let res = await fetch('https://restcountries.com/v3.1/region/' + continente);
        let json = await res.json();
        console.log("Convertimos la respuesta del fetch a un json: ");
        console.log(json);
        return json;
    }
    fronteras(borders) {
        let bordersNombres = []
        console.log(borders);
        console.log("sldkjalisdjf");
        if(!borders){
            bordersNombres[0]="No tiene fronteras.";
            return bordersNombres;
        }
        for (let i = 0; i < borders.length; i++) {
            Object.values(this.europa).forEach(pais => {
                
                if(borders[i]==pais.cca3){
                    bordersNombres.push(pais.name.common);
                }
            })
            Object.values(this.america).forEach(pais => {
                
                if(borders[i]==pais.cca3){
                    bordersNombres.push(pais.name.common);
                }
            })
            Object.values(this.asia).forEach(pais => {
                
                if(borders[i]==pais.cca3){
                    bordersNombres.push(pais.name.common);
                }
            })
            Object.values(this.africa).forEach(pais => {
                
                if(borders[i]==pais.cca3){
                    bordersNombres.push(pais.name.common);
                }
            })
            Object.values(this.oceania).forEach(pais => {
                
                if(borders[i]==pais.cca3){
                    bordersNombres.push(pais.name.common);
                }
            })
            
        }
        
        return bordersNombres;
    }
}

var objetoContinentes;
const header = document.getElementById("header");
const container = document.getElementById("container");
const footer = document.getElementById("footer");
var selectContinentes;
var selectPaises;
cargar();




function cargar() {
    montarHeader();
    montarContainer();
    montarTabla();
    montarTablaGeografica();
    montarTablaBanderas();
    montarTablaTraduccion();
    objetoContinentes = new Continentes();
    console.log("Nuestro objetoContinentes pero prácticamente vacío todavia: ");
    console.log(objetoContinentes);
    objetoContinentes.cargarContinentes().then(() => {
        cargarDatos();
        console.log("JAJAJAJAJAJAJ");
        objetoContinentes.fronteras();

    })
    montarFooter();



}

function cargarDatos() {
    console.log("objectoContinentes.getParejaValueText es: ");
    console.log(objetoContinentes.getParejaValueText());
    rellenarSelectContinentes(objetoContinentes.getParejaValueText());
    rellenarSelectPaises(selectContinentes.value);
    asignarEventos();
}


function asignarEventos() {
    selectContinentes.addEventListener("change", () => {
        rellenarSelectPaises(selectContinentes.value);

        document.getElementById("tituloPais").style.display = "none";

        document.getElementById("tabla").style.display = "none";
        document.getElementById("tablaGeografica").style.display = "none";
        document.getElementById("tablaBanderas").style.display = "none";
        document.getElementById("tablaTraduccion").style.display = "none";
    });
    selectPaises.addEventListener("change", () => {
        rellenarTabla();
        document.getElementById("tituloPais").style.display = "block";
    });
    document.getElementById("datosgenerales").addEventListener("click", () => {
        document.getElementById("tabla").style.display = "block";
        document.getElementById("tablaGeografica").style.display = "none";
        document.getElementById("tablaBanderas").style.display = "none";
        document.getElementById("tablaTraduccion").style.display = "none";
    });
    document.getElementById("datosgeograficos").addEventListener("click", () => {
        document.getElementById("tabla").style.display = "none";
        document.getElementById("tablaGeografica").style.display = "block";
        document.getElementById("tablaBanderas").style.display = "none";
        document.getElementById("tablaTraduccion").style.display = "none";
    });
    document.getElementById("banderas").addEventListener("click", () => {
        document.getElementById("tabla").style.display = "none";
        document.getElementById("tablaGeografica").style.display = "none";
        document.getElementById("tablaBanderas").style.display = "block";
        document.getElementById("tablaTraduccion").style.display = "none";
    });
    document.getElementById("traducciones").addEventListener("click", () => {
        document.getElementById("tabla").style.display = "none";
        document.getElementById("tablaGeografica").style.display = "none";
        document.getElementById("tablaBanderas").style.display = "none";
        document.getElementById("tablaTraduccion").style.display = "block";
    })
}



function montarHeader() {
    let imgMundo = document.createElement("img");
    imgMundo.id = "imgMundo";
    imgMundo.src = 'LOGOPLANETATIERRA.PNG';
    imgMundo.classList.add("imgMundo");
    header.appendChild(imgMundo);

    let textoBotones = { datosgenerales: "Datos Generales", datosgeograficos: "Datos Geográficos", banderas: "Banderas", traducciones: "Traducciones" };
    Object.entries(textoBotones).forEach(([id, texto]) => {
        console.log("Esto es texto: ");
        console.log(texto);
        let div = document.createElement("div");
        div.innerHTML = texto;
        div.id = id;
        header.appendChild(div);
    })

    let buscador = document.createElement("div");
    let inputSearch = document.createElement("input");
    inputSearch.type = "text";
    inputSearch.id = "inputSearch";
    inputSearch.setAttribute('placeholder', '  Buscar...');
    buscador.appendChild(inputSearch);

    let imgLupa = document.createElement("img");
    imgLupa.id = "imgLupa";
    imgLupa.src = "lupita.png";
    imgLupa.classList.add("lupita");
    buscador.appendChild(imgLupa);
    header.appendChild(buscador);

}

function montarFooter() {
    let logosFooter = document.createElement("div");
    logosFooter.id = "logosFooter";

    let lg1 = document.createElement("img");
    lg1.id = "lg1";
    lg1.src = "lg1.png";
    logosFooter.appendChild(lg1);

    let lg2 = document.createElement("img");
    lg2.id = "lg2";
    lg2.src = "lg2.png";
    logosFooter.appendChild(lg2);

    let lg3 = document.createElement("img");
    lg3.id = "lg3";
    lg3.src = "lg3.png";
    logosFooter.appendChild(lg3);

    footer.appendChild(logosFooter);

}


function montarContainer() {
    console.log("Esto es montarContainer");

    let titulo = document.createElement("h1");
    titulo.id = "titulo";
    titulo.innerText = 'PAISES DEL MUNDO';
    container.appendChild(titulo);

    let zonaSelects = document.createElement("div");
    zonaSelects.id = "zonaSelects";
    let defect = document.createElement("option");
    defect.innerText = "Seleccione";

    let divContinentes = document.createElement("div");
    divContinentes.innerText = "CONTINENTES";
    selectContinentes = document.createElement("select");
    selectContinentes.id = "continentes";


    divContinentes.appendChild(selectContinentes);

    let divPaises = document.createElement("div");
    divPaises.innerText = "PAISES";
    selectPaises = document.createElement("select");
    selectPaises.id = "paises";

    divPaises.appendChild(selectPaises);

    zonaSelects.appendChild(divContinentes);
    zonaSelects.appendChild(divPaises);
    container.appendChild(zonaSelects);
}

function montarTabla() {
    console.log("Función montarTabla");

    let tituloPais = document.createElement("h2");
    tituloPais.id = "tituloPais";
    container.appendChild(tituloPais);


    let tabla1 = document.createElement("table");
    tabla1.id = "tabla";


    let filas = [];
    for (let i = 0; i < 6; i++) {
        let fila = document.createElement("tr");
        if (i % 2 == 0) {
            fila.style.backgroundColor = "#00317a";
            fila.style.color = "white";
            fila.style.height = "35px";

        }
        else {
            fila.style.backgroundColor = "#d8eaff";
        }
        filas.push(fila);
    }

    let primeraFila = { common: "NOMBRE COMÚN", official: "NOMBRE OFICIAL", capital: "CAPITAL", population: "POBLACIÓN", area: 'ÁREA (km²)' };
    Object.entries(primeraFila).forEach(([id, text]) => {
        console.log("Esto es id: ");
        console.log(id);
        console.log("Esto es text: ");
        console.log(text);
        let th = document.createElement("th");
        th.innerText = text;
        let td = document.createElement("td");
        td.id = id;
        td.innerText = '--------';
        filas[0].appendChild(th);
        filas[1].appendChild(td);
    })


    let segundaFila = { tld: "DOMINIOS", cca2: "CCA2", cca3: "CCA3", ccn3: "CCN3", cioc: "CIOC" };
    console.log("Esto es segundaFila: ");
    console.log(segundaFila);
    Object.entries(segundaFila).forEach(([id, text]) => {
        console.log("Esto es id: ");
        console.log(id);
        console.log("Esto es text: ");
        console.log(text);
        let th = document.createElement("th");
        th.innerText = text;
        let td = document.createElement("td");
        td.id = id;
        td.innerText = '-------';
        filas[2].appendChild(th);
        filas[3].appendChild(td);
    })


    let terceraFila = { currencies: "MONEDAS", region: "REGIÓN", subregion: "SUBREGIÓN", languages: "IDIOMA" };
    console.log("Esto es terceraFila: ");
    console.log(terceraFila);
    Object.entries(terceraFila).forEach(([id, text]) => {
        console.log("Esto es id: ");
        console.log(id);
        console.log("Esto es text: ");
        console.log(text);
        let th = document.createElement("th");
        th.innerText = text;
        let td = document.createElement("td");
        td.id = id;
        td.innerText = '-------';
        if (id == "languages") {
            td.colSpan = 2;
            th.colSpan = 2;
        }

        filas[4].appendChild(th);
        filas[5].appendChild(td);
    })

    for (let i = 0; i < filas.length; i++) {
        tabla1.appendChild(filas[i]);
    }
    container.appendChild(tabla1);
    tabla1.style.display = "none";

}


function montarTablaGeografica() {

    let tablaGeografica = document.createElement("table");
    tablaGeografica.id = "tablaGeografica";

    let filas = [];
    for (let i = 0; i < 2; i++) {
        let fila = document.createElement("tr");
        if (i % 2 == 0) {
            fila.style.backgroundColor = "#00317a";
            fila.style.color = "white";
            fila.style.height = "35px";
        }
        else {
            fila.style.backgroundColor = "#d8eaff";
        }
        filas.push(fila);
    }

    let primeraFila = { latlng: "LATITUD Y LONGITUD", borders: "FRONTERAS" };
    Object.entries(primeraFila).forEach(([id, text]) => {
        let th = document.createElement("th");
        th.innerText = text;
        let td = document.createElement("td");
        td.id = id;
        td.innerText = '--------';
        filas[0].appendChild(th);
        filas[1].appendChild(td);
    })
    for (let i = 0; i < filas.length; i++) {
        tablaGeografica.appendChild(filas[i]);
    }
    container.appendChild(tablaGeografica);
    tablaGeografica.style.display = "none";
}

function montarTablaBanderas() {

    let tablaBanderas = document.createElement("table");
    tablaBanderas.id = "tablaBanderas";

    let filas = [];
    for (let i = 0; i < 2; i++) {
        let fila = document.createElement("tr");
        if (i % 2 == 0) {
            fila.style.backgroundColor = "#00317a";
            fila.style.color = "white";
            fila.style.height = "35px";
        }
        else {
            fila.style.backgroundColor = "#d8eaff";

        }
        filas.push(fila);
    }

    let primeraFila = { coatOfArms: "ESCUDO", flags: "BANDERA" };
    Object.entries(primeraFila).forEach(([id, text]) => {
        let th = document.createElement("th");
        th.innerText = text;
        let td = document.createElement("td");
        td.id = id;
        td.innerText = '--------';
        td.style.width = "100px"
        filas[0].appendChild(th);
        filas[1].appendChild(td);
    })
    for (let i = 0; i < filas.length; i++) {
        tablaBanderas.appendChild(filas[i]);
    }
    container.appendChild(tablaBanderas);
    tablaBanderas.style.display = "none";
}

function montarTablaTraduccion() {

    let tablaTraduccion = document.createElement("table");
    tablaTraduccion.id = "tablaTraduccion";

    let filas = [];
    for (let i = 0; i < 1; i++) {
        let fila = document.createElement("tr");
        if (i % 2 == 0) {
            fila.style.backgroundColor = "#00317a";
            fila.style.color = "white";
            fila.style.height = "35px";
        }
        else {
            fila.style.backgroundColor = "#d8eaff";
        }
        filas.push(fila);
    }

    let primeraFila = { tidioma: "IDIOMA", tofficial: "NOMBRE OFICIAL", tcommon: "NOMBRE COMÚN" };
    Object.entries(primeraFila).forEach(([id, text]) => {
        let th = document.createElement("th");
        th.innerText = text;



        filas[0].appendChild(th);

    })
    for (let i = 0; i < filas.length; i++) {
        tablaTraduccion.appendChild(filas[i]);
    }
    container.appendChild(tablaTraduccion);
    tablaTraduccion.style.display = "none";
    let tbody = document.createElement("tbody");
    tablaTraduccion.appendChild(tbody);


}


function rellenarSelectContinentes(ValueTextContinentes) {
    console.log("Funcion rellenarSelectContinentes");
    console.log("Esto es objetoContinentes.getParejaValueText(): ");
    console.log(objetoContinentes.getParejaValueText());
    console.log("Esto es ValueTextContinentes: ");
    console.log(ValueTextContinentes);


    Object.entries(ValueTextContinentes).forEach(([value, text]) => {
        console.log("Esto es value: ");
        console.log(value);
        console.log("Esto es text: ");
        console.log(text);
        let option = document.createElement("option");
        option.value = value;
        option.innerText = text;
        selectContinentes.appendChild(option);
    })

}

function rellenarSelectPaises(nombreContinente) {
    console.log("Funcion rellenarSelectPaises");

    selectPaises.options.length = 0;
    console.log("Esto es nombreContinente: ");
    console.log(nombreContinente);
    let defaultPaises = document.createElement("option");
    defaultPaises.innerHTML = "Seleccione País";
    selectPaises.appendChild(defaultPaises);


    if (nombreContinente != "default") {
        let continente = objetoContinentes.getContinente(nombreContinente);
        console.log("Este es el continente que se corresponde a nombreContinente: ");
        console.log(continente);

        continente.forEach(pais => {
            let option = document.createElement("option");
            option.value = pais.name.common;
            option.innerText = pais.name.common;
            selectPaises.appendChild(option);
        })
    }

}


function rellenarTabla() {
    console.log("Esta es la función rellenarTabla");
    let ul = document.createElement("ul");
    let dl = document.createElement("dl");


    if (selectContinentes.value != "default") {

        let paisEscogido = objetoContinentes.datosPais(selectContinentes.value, selectPaises.value);
        let bFronteras = objetoContinentes.fronteras(paisEscogido.borders);

        

        console.log("Esto es paisEscogido");
        console.log(bFronteras);
        console.log(paisEscogido);
        document.getElementById("tituloPais").innerText = paisEscogido.name.common;
        document.getElementById("common").innerText = paisEscogido.name.common;
        document.getElementById("official").innerText = paisEscogido.name.official;
        document.getElementById("capital").innerText = paisEscogido.capital;
        document.getElementById("population").innerText = paisEscogido.population;
        document.getElementById("tld").innerText = paisEscogido.tld;
        document.getElementById("area").innerText = paisEscogido.area;
        document.getElementById("cca2").innerText = paisEscogido.cca2;
        document.getElementById("cca3").innerText = paisEscogido.cca3;


        document.getElementById("ccn3").innerText = paisEscogido.ccn3;
        document.getElementById("cioc").innerText = paisEscogido.cioc;
        document.getElementById("region").innerText = paisEscogido.region;
        document.getElementById("subregion").innerText = paisEscogido.subregion;
        document.getElementById("languages").innerText = "";
        Object.values(paisEscogido.languages).forEach(idiomas => {
            let li = document.createElement("li");
            li.innerText = idiomas;
            ul.appendChild(li);

        })
        document.getElementById("languages").appendChild(ul);

        document.getElementById("currencies").innerText = "";
        Object.entries(paisEscogido.currencies).forEach(([abreviatura, objetoMoneda]) => {
            let dt = document.createElement("dt");
            let dd = document.createElement("dd");
            let dd1 = document.createElement("dd");
            dt.innerText = objetoMoneda.name;
            dd.innerText = abreviatura;
            dd1.innerText = objetoMoneda.symbol;
            dt.appendChild(dd);
            dt.appendChild(dd1);
            dl.appendChild(dt);
        })
        document.getElementById("currencies").appendChild(dl);

        document.getElementById("latlng").innerText = paisEscogido.latlng;
        document.getElementById("borders").innerText ="";
        for(let i=0;i<bFronteras.length;i++){
            let div=document.createElement("div");
            div.innerText=bFronteras[i];
            document.getElementById("borders").appendChild(div);

        }
        
        

        let escudo = document.createElement("img");
        escudo.style.width = "400px";
        document.getElementById("coatOfArms").innerText = "";
        if (paisEscogido.coatOfArms.svg === undefined) {
            escudo.src = "escudopordefecto.svg";

        }
        else {
            escudo.src = paisEscogido.coatOfArms.svg;
        }
        document.getElementById("coatOfArms").appendChild(escudo);

        let bandera = document.createElement("img");
        document.getElementById("flags").innerText = "";
        bandera.src = paisEscogido.flags.svg;
        bandera.style.width = "400px";
        document.getElementById("flags").appendChild(bandera);

        let filaIdiomas = {
            ara: "Árabe", bre: "Bretón", ces: "Checo", cym: "Galés", deu: "Alemán", est: "Estonia", fin: "Finlandés", fra: "Francés", hrv: "Croacia", hun: "Húngaro", ita: "Italiano",
            jpn: "Japonés", kor: "Coreano", nld: "Neerlandés", per: "Persa", pol: "Polaco", por: "Portugués", rus: "Ruso", slk: "Eslovaco", spa: "Español", srp: "Serbio", swe: "Sueco",
            tur: "Turco", urd: "Urdu", zho: "Chino"
        }



        document.getElementById("tablaTraduccion").getElementsByTagName("tbody")[0].innerText = "";
        Object.entries(paisEscogido.translations).forEach(([idioma, traducciones]) => {
            let filas = document.createElement("tr");
            filas.style.backgroundColor = "#d8eaff";
            let idioma1 = document.createElement("td");
            idioma1.innerText = filaIdiomas[idioma];
            idioma1.style.padding = "15px";

            let comun = document.createElement("td");
            comun.innerText = traducciones.common;
            comun.style.padding = "15px";

            let oficial = document.createElement("td");
            oficial.innerText = traducciones.official;
            oficial.style.padding = "15px";


            filas.appendChild(idioma1);
            filas.appendChild(comun);
            filas.appendChild(oficial);
            document.getElementById("tablaTraduccion").getElementsByTagName("tbody")[0].appendChild(filas);
        })


    }
}


