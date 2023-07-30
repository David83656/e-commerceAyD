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

// Función para mostrar un número aleatorio entre 1000 y 10000 en la página
function mostrarNumeroAleatorio() {
  var numeroAleatorio = Math.floor(Math.random() * 10000) + 1000;
  var numeroAleatorioDiv = document.getElementById('numeroAleatorioDiv');
  numeroAleatorioDiv.textContent = numeroAleatorio;
  preciofinal=numeroAleatorio;
}

// Mostrar el número aleatorio en la página al cargarla
mostrarNumeroAleatorio();

const pagar= document.getElementById('pagos');
const preference = {
    preferenceId: 123456789 // Reemplaza este valor con el preferenceId numérico que necesitas
  };
function pay(){
    const script = document.createElement("script");
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference.preferenceId;
    popup.appendChild(script);
}

pagar.addEventListener('click',()=>{
    pay();
});




  // Obtener referencias a los elementos del formulario
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');

  // Función para procesar el inicio de sesión
  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Aquí puedes agregar la lógica para verificar las credenciales y realizar el inicio de sesión.
    // Por ejemplo, puedes enviar los datos a un servidor mediante una solicitud AJAX (fetch o axios).

    // Una vez que el inicio de sesión sea exitoso, puedes cerrar el modal.
    $('#loginModal').modal('hide');
  }

  // Función para procesar el registro
  function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    // Objeto con los datos de registro
    const registrationData = {
      Email: username,
      Password: password,
      Name: name,
    };

    // Realizar la solicitud POST al servidor utilizando fetch
    fetch('http://192.168.171.1:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        // Aquí puedes realizar acciones adicionales después de recibir la respuesta del servidor.
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
        // Aquí puedes manejar errores de solicitud.
      });

    // Una vez que el registro sea exitoso, puedes cerrar el modal.
    $('#loginModal').modal('hide');
  }

  // Asignar eventos a los botones
  loginBtn.addEventListener('click', handleLogin);
  registerBtn.addEventListener('click', handleRegister);