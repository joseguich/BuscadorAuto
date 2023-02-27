//!Seleccionando elemento HTML
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


//Mostrando los resultado de la busqueda
const resultados = document.querySelector('#resultado');

//Generando el año actual - que solo sean del año 2010
const max = new Date().getFullYear();
const min = max - 13;

// Crear un objeto de busqueda de los select selecionado
const datoBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//!Utilizando el evento Cargar todo HTML
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos); //Mostrar los auto moviles

    //Llando el select de años
    selecionarSelect();

    //Llamando el addEventListener
    registrarEventListenet();
});

//!Utilizando addEventListenet
function registrarEventListenet() {

    marca.addEventListener('change', e => {
        datoBusqueda.marca = e.target.value;
        filtrarAuto();
    });
    year.addEventListener('change', e => {
        datoBusqueda.year = parseInt(e.target.value);
        filtrarAuto();
    });
    minimo.addEventListener('change', e => {
        datoBusqueda.minimo = e.target.value;
        filtrarAuto();
    });
    maximo.addEventListener('change', e => {
        datoBusqueda.maximo = e.target.value;
        filtrarAuto();
    });
    puertas.addEventListener('change', e => {
        datoBusqueda.puertas = parseInt(e.target.value);
        filtrarAuto();
    });
    transmision.addEventListener('change', e => {
        datoBusqueda.transmision = e.target.value;
        filtrarAuto();
    });
    color.addEventListener('change', e => {
        datoBusqueda.color = e.target.value;
        filtrarAuto();
    });
}

//! Funciones
function mostrarAutos(autos) {

    limpiarHTML();// Limpiando los elemento previos

    // Recorriendo el arreglo de los autos
    autos.forEach(auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        // Agregndo el arreglo HTML
        const listaAuto = document.createElement('P');

        listaAuto.textContent = `
        Marca: ${marca} - Modelo: ${modelo} - Año: ${year} - Precio: ${precio} - 
        Puerta: ${puertas} - Color: ${color} - Transmision: ${transmision}
        `;

        //Mostrando HTML
        resultados.appendChild(listaAuto);
    });
}

//Generando años en el select
function selecionarSelect() {

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        //Mostrando la informacion en el select
        year.appendChild(option);
    }
}

//Funcion de filtrar auto
function filtrarAuto() {
    //Funciones de alto nivel
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinino).filter(filtrarMaximo).filter(filtrarPuerta).filter(filtrarTransmision).
        filter(filtrarColorAuto);

    if (resultado.length) {

        //Mostrar los filtrado en el HTML
        mostrarAutos(resultado);
    }else{
        noExiste();

    }
}

// alerta de error si no hay resultado de esa marca
function noExiste() {

    limpiarHTML();

    const alert = document.createElement('DIV');
    alert.classList.add('alerta', 'error');
    alert.textContent = 'No hay resultado de este producto, Intente con otras recomendacion';

    resultados.appendChild(alert);

}

function filtrarMarca(auto) {
    const { marca } = datoBusqueda;
    if (marca) {
        //Si hay un valor en la busqueda de la marca Filtro lo que tiene esas marca 
        return auto.marca === marca;
    }
    return auto; // Si no me traigo todo de regreso
}

function filtrarYear(auto) {
    const { year } = datoBusqueda;

    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinino(auto) {
    const { minimo } = datoBusqueda;
    if (minimo) {
        return auto.precio >= minimo

    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datoBusqueda;
    if (maximo) {
        return auto.precio <= maximo
    }
    return auto;
}

function filtrarPuerta(auto) {
    const { puertas } = datoBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datoBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColorAuto(auto) {
    const { color } = datoBusqueda;

    if (color) {
        return auto.color === color;
    }
    return auto;
}

// limpiar el HTML
function limpiarHTML() {
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild)
    }
}