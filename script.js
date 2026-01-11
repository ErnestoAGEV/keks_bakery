// === KEKS BROWNIES - ENHANCED JAVASCRIPT ===

// BURGER MENU
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ORDER FORM → WHATSAPP
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(orderForm);
  const pedido = {
    nombre: data.get('nombre'),
    telefono: data.get('telefono'),
    correo: data.get('correo') || 'No proporcionado',
    producto: data.get('producto'),
    cantidad: data.get('cantidad'),
    extras: data.get('extras') || 'Sin extras'
  };
  const msg = `Nuevo pedido Keks%0A- Nombre: ${encodeURIComponent(pedido.nombre)}%0A- WhatsApp: ${encodeURIComponent(pedido.telefono)}%0A- Correo: ${encodeURIComponent(pedido.correo)}%0A- Producto: ${encodeURIComponent(pedido.producto)}%0A- Cantidad: ${encodeURIComponent(pedido.cantidad)}%0A- Extras: ${encodeURIComponent(pedido.extras)}`;
  window.open(`https://wa.me/523123202932?text=${msg}`, '_blank');
});

// FAQ CHATBOT
const faq = [
  { q: ['envio', 'entrega', 'horario'], a: '🚚 Entregamos Lun-Dom de 9:00 a 20:00 en Colima. Envío gratis en pedidos mayores a $650.' },
  { q: ['alergia', 'nuez', 'gluten'], a: '🌿 Tenemos opciones sin gluten y sin nuez. Indícalo en extras y horneamos en equipo dedicado.' },
  { q: ['pago', 'metodo', 'tarjeta'], a: '💳 Aceptamos transferencia y tarjeta. En punto de entrega: tarjeta y efectivo.' },
  { q: ['factura', 'cfdI'], a: '📄 Claro, podemos facturar. Comparte tus datos fiscales en el pedido.' },
  { q: ['tiempo', 'hoy', 'mismo'], a: '⏱️ Pedidos antes de las 16:00 se entregan el mismo día según zona. Confirmamos por WhatsApp.' },
  { q: ['menu', 'producto', 'brownie'], a: '🍫 Tenemos brownie clásico, cheesecake, matcha, keto y más. ¡Revisa la sección Menú!' },
  { q: ['precio', 'costo', 'cuanto'], a: '💰 Nuestros brownies van de $60 a $85 MXN. Cajas degustación desde $320.' }
];

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const collapseBtn = document.getElementById('collapseChat');
const chatWidget = document.getElementById('chatWidget');
const chatFab = document.getElementById('chatFab');

function appendBubble(text, type = 'bot') {
  const div = document.createElement('div');
  div.className = `bubble ${type}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  appendBubble(value, 'user');
  chatInput.value = '';
  const lower = value.toLowerCase();
  const match = faq.find((item) => item.q.some((key) => lower.includes(key)));
  if (lower.includes('humano') || lower.includes('agente')) {
    appendBubble('Te conecto con un agente humano. Por favor deja tu número y enviaremos la conversación a nuestro equipo. 👋', 'bot');
    return;
  }
  if (match) {
    appendBubble(match.a, 'bot');
  } else {
    appendBubble('Puedo ayudarte con menús, envíos y alérgenos. Si prefieres, escribe "hablar con humano". 😊', 'bot');
  }
});

// CHAT FAB TOGGLE
chatFab.addEventListener('click', () => {
  chatWidget.classList.add('open');
  chatFab.classList.add('hidden');
});

collapseBtn.addEventListener('click', () => {
  chatWidget.classList.remove('open');
  chatFab.classList.remove('hidden');
});

// SCROLL ANIMATIONS
const animateElements = document.querySelectorAll('.animate-on-scroll');
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// LIGHTBOX GALLERY
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImages[currentIndex];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});
