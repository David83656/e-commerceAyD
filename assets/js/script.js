var carrito = {};
var totalCompra = 0;

window.addEventListener('load', function() {
    var carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        crearCarrito();
    }

    getRandomImages();
});

function añadirProducto(producto, imagenUrl) {
    if (carrito[producto]) {
        carrito[producto].cantidad++;
    } else {
        const precioAleatorio = Math.floor(Math.random() * 100) + 1;
        carrito[producto] = {
            cantidad: 1,
            imagen: imagenUrl,
            precio: precioAleatorio
        };
    }

    totalCompra += carrito[producto].precio;

    guardarCarrito();
    crearCarrito();
}

function quitarProducto(producto, borrarTodos) {
    if (carrito[producto]) {
        if (borrarTodos) {
            totalCompra -= carrito[producto].precio * carrito[producto].cantidad;
            delete carrito[producto];
        } else {
            carrito[producto].cantidad--;
            totalCompra -= carrito[producto].precio;

            if (carrito[producto].cantidad === 0) {
                delete carrito[producto];
            }
        }
        guardarCarrito();
        crearCarrito();
    }
}

function crearCarrito() {
    var carritoElemento = document.getElementById('carrito');
    carritoElemento.innerHTML = '';

    for (var producto in carrito) {
        if (carrito.hasOwnProperty(producto)) {
            var item = document.createElement('div');
            item.classList.add('cart-item');

            var productImage = document.createElement('img');
            productImage.src = carrito[producto].imagen;
            productImage.classList.add('product-image');
            item.appendChild(productImage);

            var productInfo = document.createElement('div');
            productInfo.textContent = producto + ' - ' + carrito[producto].cantidad;
            item.appendChild(productInfo);

            var productPrice = document.createElement('div');
            productPrice.textContent = 'Precio: $' + carrito[producto].precio;
            item.appendChild(productPrice);

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

            carritoElemento.appendChild(item);
        }
    }

    var totalElemento = document.createElement('div');
    totalElemento.textContent = 'Total: $' + totalCompra;
    carritoElemento.appendChild(totalElemento);

    var pagarButton = document.createElement('button');
    pagarButton.textContent = 'Pagar';
    pagarButton.classList.add('pagar-button');
    pagarButton.addEventListener('click', function() {
        alert('Total de la compra: $' + totalCompra);
        mensajito();
    });
    carritoElemento.appendChild(pagarButton);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const loremPicsumUrl = 'https://picsum.photos/v2/list?page=1&limit=24';

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
                addButton.addEventListener('click', () => añadirProducto(data[i].author, data[i].download_url));

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Quitar';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => quitarProducto(data[i].author));

                const buttonContainer = document.createElement('div-items');
                buttonContainer.classList.add('button-container');
                buttonContainer.appendChild(addButton);
                buttonContainer.appendChild(removeButton);

                imgContainer.appendChild(buttonContainer);
            }
        })
        .catch(error => console.log(error));
}

var carritoLink = document.getElementById('carrito-link');
var popup = document.getElementById('popup');

carritoLink.addEventListener('click', function(event) {
    event.preventDefault();

    if (Object.keys(carrito).length === 0) {
        alert('Carrito vacío');
    } else {
        popup.style.display = 'block';
    }
});

popup.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});


var preciofinal;


function mostrarNumeroAleatorio() {
  numeroAleatorioDiv.textContent = numeroAleatorio;
  preciofinal=numeroAleatorio;
  if(carrito==''){
    numeroAleatorio=0;
  }
  totalCompra=preciofinal;
}


mostrarNumeroAleatorio();




function generarMensaje(carrito) {
    let mensaje = "¡Hola! Aquí te comparto los productos que un cliente agregó al carrito:\n\n";
    for (let producto in carrito) {
      if (carrito.hasOwnProperty(producto)) {
        mensaje += `Nombre: ${producto}\n`;
        mensaje += `Cantidad: ${carrito[producto].cantidad}\n`;
        mensaje += `Precio: $${carrito[producto].precio}\n\n`;
      }
    }
    mensaje += `Precio total: $${totalCompra}\n\n`;
    return encodeURIComponent(mensaje);
  }
  
  function mensajito() {
    console.log
    const mensaje = generarMensaje(carrito);
    window.open(`https://api.whatsapp.com/send?phone=+542617537574&text=${mensaje}`, "_blank");
    carrito = {};
    totalCompra = 0; 
    guardarCarrito(); 
    crearCarrito(); 
  }
  