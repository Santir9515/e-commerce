class Celulares {
    constructor (id, marca, modelo, año, precio, imagen){
        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.año = año
        this.precio = precio
        this.imagen= imagen;
    }
}


const celular1 = new Celulares (1, "Motorola", "G52 128GB", 2022, 51.999,"assets/Celular1.jpg")

const celular2 = new Celulares (2, "Samsung", "S20 128GB", 2022, 115.599, "assets/Celular2.jpg")

const celular3 = new Celulares (3, "Motorola", "G42 64GB", 2021, 47.999, "assets/celular3.jpg")

const celular4 = new Celulares (4, "Samsung", "A31 64GB", 2020, 37.999, "assets/Celular4.jpg")

const celular5 = new Celulares (5, "TCL","20SE 256GB", 2021, 58.999, "assets/Celular5.jpg")

const celular6 = new Celulares (6, "TCL", "L7+ 64GB", 2020, 34.999, "assets/Celular6.jpg")

let mostrador = []
let equiposCarrito = []

if(localStorage.getItem("mostrador")){
    mostrador = JSON.parse(localStorage.getItem("mostrador"))
    console.log(mostrador);
}else{
    mostrador.push(celular1, celular2, celular3, celular4, celular5, celular6)
    localStorage.setItem("mostrador", JSON.stringify(mostrador))
}



function nuevoCelular(){
let marcaCelular = document.getElementById("marcaCelular")
let modeloCelular = document.getElementById("modeloCelular")
let anioCelular = document.getElementById("anioCelular")
let precioCelular = document.getElementById("precioCelular")
let celularIngresado = new Celulares(mostrador.length+1, marcaCelular.value, modeloCelular.value, anioCelular.value, precioCelular.value, "assets/Celular7.jpg")
mostrador.push(celularIngresado)
localStorage.setItem("mostrador", JSON.stringify(mostrador))
}

const guardarCelularBtn = document.getElementById("agregarCelularBtn")
guardarCelularBtn.addEventListener("click", nuevoCelular)

let divCatalogo = document.getElementById("catalogo")
divCatalogo.setAttribute("class", "productosEstilos")

function mostrarCatalogo(){
mostrador.forEach((celular)=> {
    let nuevoProducto = document.createElement("div")
    nuevoProducto.innerHTML = `<article id="${celular.id}" class= "card">
                                <h3 class= "marcaCard">${celular.marca}</h3>
                                <img src="${celular.imagen}" alt="${celular.marca} ${celular.modelo} class= "imgCard"">
                                <div class= "content"
                                    <p class="modeloCard">${celular.modelo}</p>
                                    <p class="precioCard">$ ${celular.precio}</p>
                                    <a href="" target="blank" class= "aCarrito">Agregar al carrito</a>
                                </div>
                            </article>`
    divCatalogo.appendChild(nuevoProducto)
})
}

let mostrarCatalogoBtn = document.getElementById("verCatalogoBtn")
mostrarCatalogoBtn.addEventListener("click", mostrarCatalogo)

function ocultarCatalogo (){
    divCatalogo.innerHTML = ""
}

let ocultarCatalogoBtn = document.getElementById("ocultarCatalogoBtn")
ocultarCatalogoBtn.onclick = ocultarCatalogo



let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')
let acumulador
let divProductos = document.getElementById("productos")