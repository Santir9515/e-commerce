class Celulares {
    constructor (id, marca, modelo, año, precio, imagen){
    this.id = id
    this.marca = marca
    this.modelo = modelo
    this.año = año
    this.precio = precio
    this.imagen= imagen;
    }}
    
// const celular1 = new Celulares (1, "Motorola", "G52 128GB", 2022, 51.999,"assets/Celular1.jpg")

// const celular2 = new Celulares (2, "Samsung", "S20 128GB", 2022, 115.599, "assets/Celular2.jpg")

// const celular3 = new Celulares (3, "Motorola", "G42 64GB", 2021, 47.999, "assets/celular3.jpg")

// const celular4 = new Celulares (4, "Samsung", "A31 64GB", 2020, 37.999, "assets/Celular4.jpg")

// const celular5 = new Celulares (5, "TCL","20SE 256GB", 2021, 58.999, "assets/Celular5.jpg")

// const celular6 = new Celulares (6, "TCL", "L7+ 64GB", 2020, 34.999, "assets/Celular6.jpg")

let mostrador = [];

fetch("./Celulares.json")
.then(response => response.json())
.then(data => {
    console.log(data);
    data.forEach ((celular) => {
        let mostradorFetch = new Celulares(celular.id, celular.marca, celular.modelo, celular.precio, celular.imagen)
        mostrador.push(mostradorFetch)
        console.log(mostradorFetch);

    }
    
)})