

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



let equiposCarrito = JSON.parse(localStorage.getItem("carrito")) || []


 let botonCarrito = document.getElementById("botonCarrito")
 let modalBody = document.getElementById("modalBody")
 let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
 let parrafoCompra = document.getElementById("precioTotal")
 let acumulador
 let divProductos = document.getElementById("productos")


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
    <div class="spinner-border m-8 text-light" style= "widht: 3rem; height: 3rem;"</div>
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



function valorTotalCompra(...totalCompra){
    acumulador = 0
    acumulador = totalCompra.reduce((acumulador, aCarrito) => {
        return acumulador + aCarrito.precio
    },0)

    //Ternario

    acumulador > 0 ? parrafoCompra.innerHTML = `Usted esta por pagar $ ${acumulador}` : parrafoCompra.innerHTML = "<p> No agrego ningún producto al carrito</p>" 
    
    
}

function finalizarCompra(){
    swal.fire({
        title: "Importante",
        text: `Esta seguro que quiere comprar este equipo`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Si, crack",
        cancelButtonText: "No, le erré",
        confirmButtonColor: '#0aa7d6',
        cancelButtonColor:'red',
    }).then((result) => {
        let DateTime = luxon.DateTime
        const diaLocal = DateTime.now()
        let fecha = `Usted ha confirmado la compra del equipo el ${diaLocal.toLocaleString(DateTime.DATETIME_FULL)}`;
        console.log(fecha);
        if (result.isConfirmed){
            swal.fire({
                title: 'Todo listo crack',
                icon: 'success',
                confirmButtonColor: '#0aa7d6',
                text: `Confirmaste la compra del equipo de tus sueños.`,
                footer: `<p> Dentro de las próximas 48hrs hábiles tu envio será entregado. Recuerda estar atento a la puerta</p>`
            })
        }else{
            swal.fire({
                title: 'Se canceló tu compra',
                icon: 'error',
                text: 'La compra no fue realizada y su carrito fue vaciado. Vuelva a elegir el equipo a comprar',
                timer: 4000
            })
        }
    })
    equiposCarrito = []
    localStorage.removeItem("carrito")
    inventarioCarrito(equiposCarrito)
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


  //Fecha con Luxon
 let DateTime = luxon.DateTime
 const diaLocal = DateTime.now()
 let fechaLocal = (diaLocal.toLocaleString(DateTime.DATE_FULL))
 let mostrarFecha = document.getElementById("fechaLocal")
 mostrarFecha.innerHTML = `<p class= "fechaLocal">Hoy es ${fechaLocal} y nos encanta verte en nuestra Tienda</p>`

//BotonCarrito

botonCarrito.addEventListener(`click`, () =>{
    inventarioCarrito(equiposCarrito)
})

botonFinalizarCompra.addEventListener('click', ()=>{
    finalizarCompra()
})

