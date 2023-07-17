var carrito = {};

// Obtener el carrito guardado en localStorage al cargar la página
window.addEventListener('load', function() {
    var carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        crearCarrito();
    }

    getRandomImages();
});

function añadirProducto(producto) {
    if (carrito[producto]) {
        carrito[producto]++;
    } else {
        carrito[producto] = 1;
    }
    guardarCarrito();
    crearCarrito();
}

function quitarProducto(producto) {
    if (carrito[producto]) {
        carrito[producto]--;
        if (carrito[producto] === 0) {
            delete carrito[producto];
        }
    }
    guardarCarrito();
    crearCarrito();
}

function crearCarrito() {
    var carritoElemento = document.getElementById('carrito');
    carritoElemento.innerHTML = '';

    for (var producto in carrito) {
        if (carrito.hasOwnProperty(producto)) {
            var item = document.createElement('div');
            item.textContent = producto + ' - ' + carrito[producto];
            carritoElemento.appendChild(item);
        }
    }
}

// Guardar el estado actual del carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const loremPicsumUrl = 'https://picsum.photos/v2/list?page=1&limit=12';

function getRandomImages() {
    fetch(loremPicsumUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainers = document.getElementsByClassName('img-contenedor-short');

            for (let i = 0; i < data.length; i++) {
                const imgContainer = imageContainers[i];
                const img = imgContainer.querySelector('img');
                const imgText = imgContainer.nextElementSibling;

                img.src = data[i].download_url;
                imgText.innerHTML = `<p>${data[i].author}</p>`;

                const addButton = document.createElement('button');
                addButton.textContent = 'Agregar';
                addButton.classList.add('add-button');
                addButton.addEventListener('click', () => añadirProducto(data[i].author));

                imgContainer.appendChild(addButton);
            }
        })
        .catch(error => console.log(error));
}
