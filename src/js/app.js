const formulario = document.querySelector('.formulario');
const contenedor = document.querySelector('.contenedor');
const resultados = document.querySelector('.contenedor-resultados');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', validarFormulario);
})
function validarFormulario(e){
    e.preventDefault();
    
    //validamos
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

 
    if(ciudad === '' || pais === ''){
        imprimirAlerta('Ninguno de los campos pueden ir vacios');

        return;
    }
    conectarAPI(ciudad, pais);
}
function imprimirAlerta(mensaje){
    const alerta = document.querySelector('.alerta');

    if(!alerta){
        const parrafo = document.createElement('p');
        parrafo.textContent = `Error, ${mensaje}`;
        parrafo.classList.add('mensaje-alerta', 'alerta');

        formulario.appendChild(parrafo);


        setTimeout(() => {
            parrafo.remove();
        }, 3000);

    }

}
function conectarAPI(ciudad, pais){
    const apiKey = 'f1bf5a003df746ff5183d8cb3281210e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

    Spinner();

    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => {
            limpiarHTML();
          
            if(resultado.cod === '404'){
                
                imprimirAlerta('Lo sentimos, no encontramos la ciudad');
                return;
            }

            mostrarElemento(resultado);

        });

}

function mostrarElemento(resultado){

    const{ name, main:{temp, temp_max, temp_min}} = resultado;


    const temperatura = convertirAcentigrados(temp);
    const temperaturaMax = convertirAcentigrados(temp_max);
    const temperaturaMin = convertirAcentigrados(temp_min);

    //nombre
    const nombreLugar = document.createElement('P');
    nombreLugar.innerHTML = `La temperatura en <span class="negrita"> ${name} </span> el dia de hoy.`;
    nombreLugar.classList.add('titulo-lugar');


    //temperatura
    const temperaturaNormal = document.createElement('P');
    temperaturaNormal.innerHTML = `${temperatura} &#8451`;
    temperaturaNormal.classList.add('temperatura');

    //Maxima
    const temperaturaMaxima = document.createElement('P');
    temperaturaMaxima.innerHTML = `Max: ${temperaturaMax} &#8451`;
    temperaturaMaxima.classList.add('temperatura', 'maxima');

    //Minima
    const temperaturaMinima = document.createElement('P');
    temperaturaMinima.innerHTML = `Min: ${temperaturaMin} &#8451`;
    temperaturaMinima.classList.add('temperatura','minima');
    

    const divContenido = document.createElement('div');
    divContenido.classList.add('divContenido');

    divContenido.appendChild(nombreLugar);
    divContenido.appendChild(temperaturaNormal);
    divContenido.appendChild(temperaturaMaxima);
    divContenido.appendChild(temperaturaMinima);


    resultados.appendChild(divContenido);
    formulario.reset();

}

function convertirAcentigrados(temperatura){
    return parseInt(temperatura - 273);
}

function limpiarHTML(){
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild);
    }
}

function Spinner(){

    limpiarHTML();


    const divSpiner = document.createElement('DIV');
    divSpiner.classList.add('spinner');

    divSpiner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `;

    resultados.appendChild(divSpiner);
}