$(document).ready(function(){
    $("body").vegas({
        delay: 6500,
        slides: [
            { src: "./assets/fondoVega1.jpg" },
            { src: "./assets/fondoVega3.jpg" },
         ],

         overlay: "overlays/02.png",
         animation: "kenburnsUpLeft",

    })
})





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

let equiposCarrito = JSON.parse(localStorage.getItem("carrito")) || []


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
const loaderCatalogo = document.getElementById("loader1")
loaderCatalogo.addEventListener("click", mostrarCatalogo)


function mostrarCatalogo(){
    
    divCatalogo.innerHTML="";

Toastify({
    text: `Catálogo Desplegado`,
    duration: 2000,
    gravity: "bottom",
    style: {
        background: "linear-gradient(to right, #0aa7d6, #000000)",
      }
  }).showToast();
mostrador.forEach((celular)=> {


    let nuevoProducto = document.createElement("div")
    nuevoProducto.innerHTML = `<article id="${celular.id}" class= "card ">
                                <h3 class= "marcaCard">${celular.marca}</h3>
                                <img src="${celular.imagen}" alt="${celular.marca} ${celular.modelo} class= "imgCard"">
                                <div class= "content"
                                    <p class= "modeloCard">${celular.modelo} (${celular.año})</p>
                                    <p class="precioCard">$ ${celular.precio}</p>
                                    <button class = "${celular.año <= 2020 ? "modeloViejo" : "modeloNuevo"}" id="aCarrito${celular.id}">Agregar al carrito</button>
                                </div>
                            </article>`
    divCatalogo.appendChild(nuevoProducto)

    



    let aCarrito = document.getElementById(`aCarrito${celular.id}`)
    console.log(aCarrito);

    aCarrito.addEventListener("click", () => (agregarAlCarrito(celular)))

        })
    
    
    }

function agregarAlCarrito (celular){
    let celularAgregado = equiposCarrito.indexOf(celular)
    if(celular.año < 2021){
        Swal.fire({
            title: "Error",
            text: `El celular ${celular.marca} ${celular.modelo} no puede ser agregado ya que no hay stock del mismo`,
            icon: "error",
            timer: 2000,
            confirmButtonText: "Ufaaaaaa"

        })
    }else{
        if(celularAgregado == -1){
            equiposCarrito.push(celular);
            localStorage.setItem("carrito", JSON.stringify(equiposCarrito))
            Swal.fire({
                title: "Listo",
                text: `El celular ${celular.marca} ${celular.modelo} ya esta cargado en su carrito`,
                icon: "success",
                timer: 2000
            })
        }else{
            Swal.fire({
                title: "Aguarde",
                text: `Solo se puede agregar un equipo por transacción y el equipo ${celular.marca} ${celular.modelo} ya fue ingresado al carrito`,
                icon: "info",
                confirmButtonText: "OK, Se me chispoteó"
            })   
        }
    }


}
    

let mostrarCatalogoBtn = document.getElementById("verCatalogoBtn")
mostrarCatalogoBtn.addEventListener("click", ()=>{
    //Loader

loaderCatalogo.setAttribute("style", "display: block;")
loaderCatalogo.innerHTML = `<div class="d-flex justify-content-center align-content-center">
    <strong> Aguarde mientras se carga nuestro catálogo...</strong>
    <div class="spinner-border m-5 text-light" style= "widht: 3rem; height: 3rem;"</div>
    </div>`;
setTimeout(()=>{
    loaderCatalogo.remove()
    mostrarCatalogo()
},2000)
})


function ocultarCatalogo (){
    divCatalogo.innerHTML = ""
    Toastify({
        text: `Catálogo oculto`,
        duration: 2000,
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, #0aa7d6, #000000)",
          }
      }).showToast();
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
                <h4 class="card-title>${aCarrito.modelo}</h4>
                 <p class="card-text">$${aCarrito.precio}</p> 
                <button class= "btn btn-danger" id="botonRemover${aCarrito.id}"> Borrar Artículo
                </button>
         </div>
     </div>`
     })
    
     //Eliminar producto del carrito
     inventarioStorage.forEach((aCarrito, indice) =>{
        
        document.getElementById(`botonRemover${aCarrito.id}`).addEventListener('click', () => {
            Toastify({
                text: `El equipo ${aCarrito.marca} ${aCarrito.modelo} fue eliminado de su carrito`,
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #0aa7d6, #000000)",
                  }
                
              }).showToast();
            let cardCarrito = document.getElementById(`aCarrito${aCarrito.id}`)
            cardCarrito.remove()
            
            equiposCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(equiposCarrito))
            inventarioCarrito(equiposCarrito)
        })

     })


     

     valorTotalCompra(...inventarioStorage)
 }

//BotonCarrito

botonCarrito.addEventListener(`click`, () =>{
    inventarioCarrito(equiposCarrito)
})


function valorTotalCompra(...totalCompra){
    acumulador = 0
    acumulador = totalCompra.reduce((acumulador, aCarrito) => {
        return acumulador + aCarrito.precio
    },0)

    //Ternario

    acumulador > 0 ? parrafoCompra.innerHTML = `Usted esta por pagar $ ${acumulador}` : parrafoCompra.innerHTML = "<p> No agrego ningún producto al carrito</p>" 
    
    
}

//DesestructuracionAlias

let [a, c, b, d, e, f] = mostrador
a = "Motorola"
b = "Motorola"
c = "Samsung"
d = "Samsung"
e = "TCL"
f = "TCL"
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);


