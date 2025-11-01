document.addEventListener("DOMContentLoaded", () => {
  const reserva = JSON.parse(localStorage.getItem("reservaTemporal"));
  const triggerInput = document.getElementById("auto");
  const miniForm = document.getElementById("miniForm");
  const detallesDiv = document.getElementById("detallesAuto");
  let hoverTimeout;
  let hoverDelay;

  if (!reserva) {
    console.log("Aún no has hecho una reserva. Por favor, crea una primero.");
    return;
  }

  // Mostrar número de orden
  document.getElementById("numeroOrden").textContent =
    reserva.numeroOrden || "Sin orden";

  // Mostrar datos de la reserva
  document.getElementById("nombre").value = reserva.nombre || "";
  document.getElementById("email").value = reserva.email || "";
  document.getElementById("auto").value = reserva.carro?.nombre || "";
  document.getElementById("checkin").value = reserva.checkin || "";
  document.getElementById("checkout").value = reserva.checkout || "";
  document.getElementById("adress").value = reserva.adress || "";

  // Mostrar total correctamente aunque venga con $
  const precioTexto = reserva.total || "";
  const precioNumerico = parseFloat(precioTexto.replace("$", ""));

  document.getElementById("totalPrecio").textContent = !isNaN(precioNumerico)
    ? `$${precioNumerico.toFixed(2)}`
    : "$0.00";

  // Mostrar cédula si existe
  if (reserva.cedula) {
    document.getElementById("cedula").value = reserva.cedula;
  }
  // mostrar mini form
  triggerInput.addEventListener("mouseover", function () {
    hoverDelay = setTimeout(() => {
      const rect = triggerInput.getBoundingClientRect();
      miniForm.style.top = `${rect.bottom + window.scrollY }px`;
      miniForm.style.left = `${rect.left + window.scrollX }px`;
      miniForm.style.display = "block";

      const reserva = JSON.parse(localStorage.getItem("reservaTemporal"));
      if (reserva && reserva.carro) {
        const detalles = `
        <img src="${reserva.carro.imagen}" alt="${reserva.carro.nombre}" />
        <p><strong>Precio por día: $${reserva.carro.precio}</strong></p>
      `;
        detallesDiv.innerHTML = detalles;
      } else {
        detallesDiv.innerHTML = "No hay detalles del auto";
      }
    }, 200); // ← 500ms de retraso
  });

  // Si el mouse sale antes de los 500ms, se cancela
  triggerInput.addEventListener("mouseout", function () {
    clearTimeout(hoverDelay); // ← cancela si se va antes
    hoverTimeout = setTimeout(() => {
      miniForm.style.display = "none";
    }, 300);
  });

  // Cancelar el ocultamiento si se entra al miniForm
  miniForm.addEventListener("mouseover", function () {
    clearTimeout(hoverTimeout);
  });

  // Ocultar el miniForm si se sale del mismo
  miniForm.addEventListener("mouseout", function () {
    miniForm.style.display = "none";
  });

  // Botones de acción
  document.getElementById("modificarBtn").addEventListener("click", () => {
    window.location.href = "booking.html";
  });

  document.getElementById("pagarBtn").addEventListener("click", () => {
    window.location.href = "pago.html";
  });
});
