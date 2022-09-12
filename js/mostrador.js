//Constructor de clase para array de objetos

class Celulares {
    constructor (id, marca, modelo, año, precio, imagen){
    this.id = id
    this.marca = marca
    this.modelo = modelo
    this.año = año
    this.precio = precio
    this.imagen= imagen;
    }}

//fetch

let mostrador = [];

fetch("./Celulares.json")
.then(response => response.json())
.then(data => {
    data.forEach ((celular) => {
        let mostradorFetch = new Celulares(celular.id, celular.marca, celular.modelo,celular.año, celular.precio, celular.imagen)
        mostrador.push(mostradorFetch)
    }
)})