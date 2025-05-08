// Mostrar el carrito y total
function añadirAlCarrito(nombre, precio) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push({ nombre, precio: parseFloat(precio) });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} fue añadido al carrito.`);
}

function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');

  if (!lista || !totalEl) return;

  lista.innerHTML = ''; // Limpiar contenido anterior
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} - Bs ${item.precio.toFixed(2)} 
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
    lista.appendChild(li);
    total += item.precio;
  });

  totalEl.textContent = `Bs ${total.toFixed(2)}`;
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1); // Eliminar el producto en esa posición
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito(); // Recargar la lista
}

// ✅ Procesar la compra y redirigir a la página de recibo
function procesarCompra(event) {
  event.preventDefault(); // Evita que el formulario se envíe normalmente

  // Obtener los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const direccion = document.getElementById('direccion').value;
  const telefono = document.getElementById('telefono').value;
  const correo = document.getElementById('correo').value;

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Añade productos antes de realizar la compra.');
    return;
  }

  // Guardar los datos para la página de recibo
  localStorage.setItem('datosCompra', JSON.stringify({ nombre, direccion, telefono, correo }));
  localStorage.setItem('carritoResumen', JSON.stringify(carrito));

  // Vaciar el carrito
  localStorage.removeItem('carrito');

  // Redirigir a la página de recibo
  window.location.href = 'Recibo.html';
}
