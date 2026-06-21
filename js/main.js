// =======================
// Configuración general
// =======================
const COMPANY = "TU-WIFI";
const WAPP_FIXED = "573009020221"; // +57 300 902 0221

document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // Año dinámico
  // =======================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =======================
  // Menú responsive
  // =======================
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =======================
  // WhatsApp rápido
  // =======================
  const defaultMessage = `Hola ${COMPANY}, quiero información sobre sus planes de internet.`;
  const whatsappUrl = crearUrlWhatsApp(defaultMessage);

  const linkWapp = document.getElementById("linkWapp");
  const wappFloat = document.getElementById("wappFloat");

  if (linkWapp) {
    linkWapp.href = whatsappUrl;
  }

  if (wappFloat) {
    wappFloat.href = whatsappUrl;
  }

  // =======================
  // Botones de planes
  // =======================
  document.querySelectorAll("[data-plan]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const plan = btn.dataset.plan || "un plan de internet";
      const megas = btn.dataset.megas || "";
      const precio = btn.dataset.precio || "";

      const mensaje = `Hola ${COMPANY}, quiero solicitar información sobre el ${plan}${megas ? " de " + megas + " Megas" : ""}${precio ? " por " + precio : ""}.`;

      btn.href = crearUrlWhatsApp(mensaje);
    });
  });

  // =======================
  // Formulario hacia WhatsApp
  // =======================
  const form = document.getElementById("formContacto");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = (document.getElementById("nombre")?.value || "").trim();
      const email = (document.getElementById("email")?.value || "").trim();
      const tel = (document.getElementById("telefono")?.value || "").trim();
      const msg = (document.getElementById("mensaje")?.value || "").trim();

      if (!nombre || !email || !tel || !msg) {
        alert("Por favor completa todos los campos.");
        return;
      }

      if (!/^3\d{9}$/.test(tel)) {
        alert("El teléfono debe tener 10 dígitos y empezar por 3.");
        return;
      }

      const texto = `Hola ${COMPANY}, soy ${nombre}.
Email: ${email}
Teléfono: ${tel}
Mensaje: ${msg}`;

      window.open(crearUrlWhatsApp(texto), "_blank");
    });
  }
});

// =======================
// Función WhatsApp
// =======================
function crearUrlWhatsApp(mensaje) {
  return `https://wa.me/${WAPP_FIXED}?text=${encodeURIComponent(mensaje)}`;
}