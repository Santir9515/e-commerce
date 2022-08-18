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

 let botonCarrito = document.getElementById("botonCarrito")
 let modalBody = document.getElementById("modalBody")
 let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
 let parrafoCompra = document.getElementById("precioTotal")
 let acumulador
 let divProductos = document.getElementById("productos")

if(localStorage.getItem("mostrador")){
    mostrador = JSON.parse(localStorage.getItem("mostrador"))
    console.log(mostrador);
}else{
    mostrador.push(celular1, celular2, celular3, celular4, celular5, celular6)
    localStorage.setItem("mostrador", JSON.stringify(mostrador))
}

if(localStorage.getItem("carrito")){
    equiposCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    localStorage.setItem("carrito", [])
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
                                    <button id="aCarrito${celular.id}">Agregar al carrito</button>
                                </div>
                            </article>`
    divCatalogo.appendChild(nuevoProducto)

    let aCarrito = document.getElementById(`aCarrito${celular.id}`)
    console.log(aCarrito);

    aCarrito.addEventListener("click", () => (agregarAlCarrito(celular)))

        })
    }

function agregarAlCarrito (celular){
        equiposCarrito.push(celular)
        console.log(equiposCarrito);
        localStorage.setItem("carrito", JSON.stringify(equiposCarrito))

}
    

let mostrarCatalogoBtn = document.getElementById("verCatalogoBtn")
mostrarCatalogoBtn.addEventListener("click", mostrarCatalogo)

function ocultarCatalogo (){
    divCatalogo.innerHTML = ""
}

let ocultarCatalogoBtn = document.getElementById("ocultarCatalogoBtn")
ocultarCatalogoBtn.onclick = ocultarCatalogo


 function inventarioCarrito (inventarioStorage){
     modalBody.innerHTML = ""
     inventarioStorage.forEach((aCarrito)=> {
         modalBody.innerHTML += `
         <div class="card border-primary mb-3" id ="productoCarrito${aCarrito.id}" style="max-width: 540px;">
         <img class="card-img-top" src="${aCarrito.imagen}" alt="${aCarrito.marca}">
         <div class="card-body">
                <h4 class="card-title">${aCarrito.modelo}</h4>
            
                 <p class="card-text">$${aCarrito.precio}</p> 
                <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
         </div>    
    
    
     </div>`
     })
    

     valorTotalCompra(inventarioStorage)
 }

//BotonCarrito

botonCarrito.addEventListener(`click`, () =>{
    inventarioCarrito(equiposCarrito)
})


function valorTotalCompra(totalCompra){
    acumulador = 0
    totalCompra.forEach((aCarrito)=> {
        acumulador += aCarrito.precio
    })
    if(acumulador == 0){
        parrafoCompra.innerHTML = "<p> No agrego ningún producto al carrito</p>"
    }else{
        parrafoCompra.innerHTML = `Usted esta por pagar $ ${acumulador}`
    }
}