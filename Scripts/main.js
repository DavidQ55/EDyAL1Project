import {calcularScoreBoard} from './util.js';

//Obtener los TextArea y los botones de ingresar y ordenar
const btnIngresar = document.getElementById("ingresar");
const btnOrdenar = document.getElementById("ordenar");
let entrada = document.getElementById("entrada");
let salida = document.getElementById("salida");


let bd = "";

//Listeners
btnIngresar.addEventListener('click',ingresarNvaSubmission)
btnOrdenar.addEventListener('click', ordenarSubmissions);



function ingresarNvaSubmission(){
    let submission = document.getElementById("entrada").value;

    bd = submission

    console.log("Ingresado con éxito: " + bd);
}

function ordenarSubmissions(){
    //Ordenar para cada cadena en la base de datos
    let res = calcularScoreBoard(bd);
    
    salida.value = res;
    console.log(res);
}