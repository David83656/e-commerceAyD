// Objeto que representa el carrito de compras
var carrito = {};

// Evento 'load': Se dispara cuando la página se carga completamente
window.addEventListener('load', function() {
    // Obtener el carrito almacenado en el LocalStorage, si existe
    var carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        // Cargar el carrito desde el LocalStorage y crear el carrito visual
        carrito = JSON.parse(carritoGuardado);
        crearCarrito();
    }

    // Obtener imágenes aleatorias de Lorem Picsum y mostrarlas en la página
    getRandomImages();
});

// Función para agregar un producto al carrito
function añadirProducto(producto, imagenUrl) {
    if (carrito[producto]) {
        carrito[producto].cantidad++;
    } else {
        carrito[producto] = {
            cantidad: 1,
            imagen: imagenUrl
        };
    }
    guardarCarrito(); // Guardar el carrito actualizado en el LocalStorage
    crearCarrito(); // Actualizar la representación visual del carrito
}

// Función para quitar un producto del carrito
function quitarProducto(producto, borrarTodos) {
    if (carrito[producto]) {
        if (borrarTodos) {
            delete carrito[producto]; // Eliminar completamente el producto del carrito
        } else {
            carrito[producto].cantidad--; // Disminuir la cantidad del producto en una unidad
            if (carrito[producto].cantidad === 0) {
                delete carrito[producto]; // Si la cantidad llega a cero, eliminar el producto del carrito
            }
        }
        guardarCarrito(); // Guardar el carrito actualizado en el LocalStorage
        crearCarrito(); // Actualizar la representación visual del carrito
    }
}

// Función para crear la representación visual del carrito de compras en la página
function crearCarrito() {
    var carritoElemento = document.getElementById('carrito');
    carritoElemento.innerHTML = '';

    // Iterar sobre los productos en el carrito y crear elementos para mostrarlos
    for (var producto in carrito) {
        if (carrito.hasOwnProperty(producto)) {
            var item = document.createElement('div');
            item.classList.add('cart-item');

            // Crear elemento para la imagen del producto
            var productImage = document.createElement('img');
            productImage.src = carrito[producto].imagen;
            item.appendChild(productImage);

            // Crear elemento para el nombre y cantidad del producto
            var productInfo = document.createElement('div');
            productInfo.textContent = producto + ' - ' + carrito[producto].cantidad;
            item.appendChild(productInfo);

            // Crear botones para agregar, quitar y eliminar el producto del carrito
            var addButton = document.createElement('button');
            addButton.textContent = 'Agregar';
            addButton.classList.add('add-button');
            addButton.addEventListener('click', () => añadirProducto(producto, carrito[producto].imagen));
            item.appendChild(addButton);

            var removeButton = document.createElement('button');
            removeButton.textContent = 'Quitar';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => quitarProducto(producto));
            item.appendChild(removeButton);

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => quitarProducto(producto, true));
            item.appendChild(deleteButton);

            // Agregar el elemento del producto al carrito
            carritoElemento.appendChild(item);
        }
    }
}

// Función para guardar el estado actual del carrito en el LocalStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// URL para obtener imágenes aleatorias de Lorem Picsum
const loremPicsumUrl = 'https://picsum.photos/v2/list?page=1&limit=12';

// Función para obtener imágenes aleatorias de Lorem Picsum y mostrarlas en la página
function getRandomImages() {
    fetch(loremPicsumUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainers = document.getElementsByClassName('img-contenedor-short');

            // Iterar sobre los datos de las imágenes y crear elementos para mostrarlas
            for (let i = 0; i < data.length; i++) {
                const imgContainer = imageContainers[i];
                const img = imgContainer.querySelector('img');
                const imgText = imgContainer.nextElementSibling;

                img.src = data[i].download_url;
                imgText.innerHTML = `<p>${data[i].author}</p>`;

                // Crear botones para agregar y quitar el producto del carrito
                const addButton = document.createElement('button');
                addButton.textContent = 'Agregar';
                addButton.classList.add('add-button');
                addButton.addEventListener('click', () => añadirProducto(data[i].author, data[i].download_url));

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Quitar';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => quitarProducto(data[i].author));

                // Crear contenedor para los botones
                const buttonContainer = document.createElement('div-items');
                buttonContainer.classList.add('button-container');
                buttonContainer.appendChild(addButton);
                buttonContainer.appendChild(removeButton);

                // Agregar el contenedor de botones al contenedor de la imagen
                imgContainer.appendChild(buttonContainer);
            }
        })
        .catch(error => console.log(error));
}

// Obtener referencia al enlace del carrito y al popup del carrito
var carritoLink = document.getElementById('carrito-link');
var popup = document.getElementById('popup');

// Evento 'click' en el enlace del carrito
carritoLink.addEventListener('click', function(event) {
  event.preventDefault();

  // Verificar si el carrito está vacío
  if (Object.keys(carrito).length === 0) {
    alert('Carrito vacío');
  } else {
    popup.style.display = 'block'; // Mostrar el popup del carrito
  }
});

// Evento 'click' en el popup del carrito
popup.addEventListener('click', function(event) {
  if (event.target === popup) {
    popup.style.display = 'none'; // Ocultar el popup del carrito
  }
});

// Función para mostrar un número aleatorio entre 1000 y 10000 en la página
function mostrarNumeroAleatorio() {
  var numeroAleatorio = Math.floor(Math.random() * 10000) + 1000;
  var numeroAleatorioDiv = document.getElementById('numeroAleatorioDiv');
  numeroAleatorioDiv.textContent = numeroAleatorio;
}

// Mostrar el número aleatorio en la página al cargarla
mostrarNumeroAleatorio();
