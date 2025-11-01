document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const selectedCarInput = bookingForm.querySelector(".selected-car");
  const totalOutput = document.getElementById("totalPrecio");
  const carSummary = document.getElementById("carSummary");

  let reservaExistente = JSON.parse(localStorage.getItem("reservaTemporal")) || {};
  const nuevoCarro = JSON.parse(localStorage.getItem("carroSeleccionado"));

  // 🔄 Si hay un carro nuevo, actualizamos la reserva
  if (nuevoCarro) {
    reservaExistente.carro = nuevoCarro;
    localStorage.setItem("reservaTemporal", JSON.stringify(reservaExistente));
    localStorage.removeItem("carroSeleccionado");
  }

  // ✅ Prellenar si hay una reserva existente
  if (reservaExistente) {
    bookingForm.querySelector('input[type="text"]:not(.selected-car)').value =
      reservaExistente.nombre || "";
    bookingForm.querySelector('input[type="email"]').value =
      reservaExistente.email || "";
    bookingForm.querySelector('input[name="cedula"]').value =
      reservaExistente.cedula || "";
    bookingForm.querySelector('input[name="adress"]').value =
      reservaExistente.adress || "";
    bookingForm.checkin.value = reservaExistente.checkin || "";
    bookingForm.checkout.value = reservaExistente.checkout || "";

    if (selectedCarInput && reservaExistente.carro) {
      selectedCarInput.value = `${reservaExistente.carro.nombre} - $${reservaExistente.carro.precio}/día`;
    }

    if (carSummary && reservaExistente.carro) {
      carSummary.innerHTML = `
        <h3>${reservaExistente.carro.nombre}</h3>
        <img src="${reservaExistente.carro.imagen}" alt="${reservaExistente.carro.nombre}" />
        <p><strong>Precio por día: $${reservaExistente.carro.precio}</Strong></p>
      `;
    }
  }

  // ✅ Calcular total
  function calcularTotal() {
    const checkin = bookingForm.checkin.value;
    const checkout = bookingForm.checkout.value;

    if (!reservaExistente?.carro || !checkin || !checkout) {
      totalOutput.textContent = "$0.00";
      return;
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (checkoutDate <= checkinDate) {
      totalOutput.textContent = "$0.00";
      return;
    }

    const diffMs = checkoutDate - checkinDate;
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const total = dias * reservaExistente.carro.precio;

    totalOutput.textContent = `$${total.toFixed(2)}`;
  }

  bookingForm.checkin.addEventListener("change", calcularTotal);
  bookingForm.checkout.addEventListener("change", calcularTotal);
  calcularTotal();

  // ✅ Enviar formulario
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = bookingForm
      .querySelector('input[type="text"]:not(.selected-car)')
      .value.trim();
    const email = bookingForm.querySelector('input[type="email"]').value.trim();
    const cedula = bookingForm
      .querySelector('input[name="cedula"]')
      .value.trim();
    const adress = bookingForm
      .querySelector('input[name="adress"]')
      .value.trim();
    const checkin = bookingForm.checkin.value.trim();
    const checkout = bookingForm.checkout.value.trim();

    if (
      !nombre ||
      !email ||
      !cedula ||
      !adress ||
      !selectedCarInput.value ||
      !checkin ||
      !checkout
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (cedula && !/^\d{3}-\d{7}-\d{1}$/.test(cedula)) {
      alert("Formato de cédula inválido. Usa 001-1234567-8");
      return;
    }

    const nuevoNumeroOrden = generarNumeroOrden();

    const reservaActualizada = {
      nombre,
      email,
      cedula,
      adress,
      checkin,
      checkout,
      total: totalOutput.textContent,
      carro: reservaExistente?.carro || null,
      numeroOrden: nuevoNumeroOrden,
    };

    localStorage.setItem("reservaTemporal", JSON.stringify(reservaActualizada));
    localStorage.setItem("ordenActual", nuevoNumeroOrden);

    window.location.href = "/html/resumen.html";
  });

  // ✅ Generador de número de orden
  function generarNumeroOrden() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(2, "0");
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `RES-${año}${mes}${dia}-${horas}${minutos}${segundos}-${random}`;
  }
});