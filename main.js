class Producto{
    constructor (nombre, precio, imagen, id){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.id = id;
        this.cantidad = 1;
    }
}

const mouse = new Producto ("Mouse Logitech", 150, "img/mouse.jpeg", 1);
const teclado = new Producto ("Teclado Logitech", 250, "img/teclado.jpg", 2);
const auriculares = new Producto ("Auriculares Logit.", 300, "img/auriculares.jpeg", 3);
const parlantes = new Producto ("Parlantes Targa", 130, "img/parlantes.jpg", 4);
const monitor = new Producto ("Monitor Asus", 500, "img/monitor.jpeg", 5);
const silla = new Producto ("Silla MarvoRT", 270, "img/silla.jpg", 6);
const gabinete = new Producto ("Gabinete 1NXT", 170, "img/gabinete.jpg", 7);

const productos = [mouse, teclado, auriculares, parlantes, monitor, silla, gabinete];

let carrito = [];

if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class= "card">
                    <img src= "${producto.imagen}" class="card-img-top imagenProducto">
                    <div class="card-body bodyCard">
                        <h4> ${producto.nombre}</h4>
                        <p> USD${producto.precio}</p>
                        <button class= " estiloBoton " id="boton${producto.id}"> Agregar al carrito </button>
                    </div>
                </div>    
        `
        contenedorProductos.appendChild(card);

        const botonAgregar = document.getElementById(`boton${producto.id}`);
        botonAgregar.addEventListener("click", ()=>{
            agregarCarrito(producto.id);
        })
    })
}
mostrarProductos();
const agregarCarrito = (id) => {
    const productoEnCarrito = carrito.find (producto => producto.id === id);
    if (productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotalCompra();
}     

const contenedorCarrito = document.getElementById("containerCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", ()=>{
    mostrarCarrito();
})

const mostrarCarrito = () =>{
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class= "card">
                    <img src= "${producto.imagen}" class="card-img-top imagenProducto">
                    <div class="card-body bodyCard">
                        <h4> ${producto.nombre}</h4>
                        <p> USD${producto.precio}</p>
                        <p> Cantidad: ${producto.cantidad}</p>
                        <button class= " estiloBotonEliminar " id="eliminar${producto.id}"> Eliminar del carrito </button>
                    </div>
                </div>    
        `
        contenedorCarrito.appendChild(card);
        
        const botonEliminar = document.getElementById(`eliminar${producto.id}`);
        botonEliminar.addEventListener("click", ()=>{
            eliminarDelCarrito(producto.id)
        })
    })
    calcularTotalCompra();
}

const eliminarDelCarrito = (id) =>{
    const producto = carrito.find(producto => producto.id === id);
    const indiceEnArray = carrito.indexOf(producto);
    carrito.splice(indiceEnArray, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const limpiarCarrito = document.getElementById("limpiarCarrito");
limpiarCarrito.addEventListener("click", ()=>{
    vaciarCarrito();
})

const vaciarCarrito = () =>{
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const totalCompra = document.getElementById("totalCompra");
const calcularTotalCompra = () =>{
    let total = 0;
    carrito.forEach(producto =>{
        total += producto.precio * producto.cantidad;
    })

    totalCompra.innerHTML = ` USD${total}`
}