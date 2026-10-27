/* PERSONALIZZAZIONE RAPIDA
   Cambia i valori qui sotto per adattare il sito a un'attività reale.
   Lascia vuoti telefono, WhatsApp, email e social finché non hai i dati corretti.
*/
const businessConfig = {
  name: "Dott.ssa Claudia Sorigato",
  category: "DIABETOLOGIA · DEMO",
  sloganHtml: 'La tua salute.<br><em>La tua cura.</em>',
  description: "Uno spazio dedicato alla cura del diabete, dove ogni appuntamento parte dall'ascolto e prende forma intorno a te.",
  about: "Dottoressa laureata in diabetologia (non sono sicuro, ma penso), con vari anni di esperienza nel settore.",
  footerDescription: "Un'esperienza semplice, curata e su misura.",
  primaryColor: "#65745c",
  secondaryColor: "#e8ebe3",
  phone: "39 389 202 7683",             // Esempio formato internazionale: +390000000000
  whatsapp: "39 389 202 7683",          // Solo cifre internazionali, es. 390000000000
  email: "mattia.mollix@gmail.com",             // Inserisci l'indirizzo reale per abilitare il modulo mailto
  address: "Via mefistofele 15, Vr",           // Indirizzo reale dell'attività
  mapUrl: "",            // Link Google Maps o altro servizio di mappe
  socials: { instagram: "", facebook: "", tiktok: "" },
  whatsappMessage: "Ciao, vorrei ricevere informazioni sui vostri servizi.",
  heroImage: "https://media.doctolib.com/image/upload/q_auto:eco,f_auto/vqrrvltuijuelaggegdc.jpg",
  services: [
    { title: "Servizio 1", description: "Un servizio da personalizzare in base alle esigenze di ogni persona.", note: "Dettagli e disponibilità su richiesta", symbol: "✳" },
    { title: "Servizio 2", description: "Cura e prevenzione, con attenzione alle preferenze e al percorso insieme", note: "Dettagli e disponibilità su richiesta", symbol: "⌁" },
    { title: "Servizio 3", description: "Un momento per confrontarsi e trovare insieme il modello più adatto.", note: "Dettagli e disponibilità su richiesta", symbol: "↗" }
  ],
  hours: [
    ["Lunedì", "9.00 - 12.00"], ["Martedì", "9.00 - 12.00"], ["Mercoledì", "9.00 - 12.00"],
    ["Giovedì", "9.00 - 12.00"], ["Venerdì", "9.00 - 12.00"], ["Sabato", "9.00 - 12.00"], ["Domenica", "9.00 - 12.00"]
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function setText(selector, value) {
  $$(selector).forEach((element) => { element.textContent = value; });
}

function configureBrand() {
  document.documentElement.style.setProperty("--accent", businessConfig.primaryColor);
  document.documentElement.style.setProperty("--accent-soft", businessConfig.secondaryColor);
  setText("[data-business-name]", businessConfig.name);
  setText("[data-eyebrow]", businessConfig.category);
  setText("[data-description]", businessConfig.description);
  setText("[data-about]", businessConfig.about);
  setText("[data-footer-description]", businessConfig.footerDescription);
  document.title = `${businessConfig.name} — Sito vetrina`;
  const description = $('meta[name="description"]');
  if (description) description.content = businessConfig.description;
  const slogan = $("[data-slogan]");
  if (slogan) slogan.innerHTML = businessConfig.sloganHtml; // HTML controllato dal proprietario del sito
  const heroImage = $("[data-hero-image]");
  if (heroImage && businessConfig.heroImage) heroImage.src = businessConfig.heroImage;
}

function renderServices() {
  const grid = $("#service-grid");
  grid.innerHTML = "";
  businessConfig.services.forEach((service, index) => {
    const article = document.createElement("article");
    article.className = "service-card reveal";
    article.innerHTML = `
      <div class="service-number"><span>SERVIZIO ${String(index + 1).padStart(2, "0")}</span><span class="service-symbol" aria-hidden="true">${escapeHtml(service.symbol || "✳")}</span></div>
      <h3>${escapeHtml(service.title)}</h3>
      <p>${escapeHtml(service.description)}</p>
      <div class="service-bottom"><span>${escapeHtml(service.note || "Informazioni su richiesta")}</span><a href="#contatti" aria-label="Chiedi informazioni su ${escapeHtml(service.title)}">Chiedi info ↗</a></div>`;
    grid.appendChild(article);
  });
  observeReveals();
}

function renderHours() {
  const list = $("#hours-list");
  list.innerHTML = "";
  businessConfig.hours.forEach(([day, time]) => {
    const row = document.createElement("div");
    row.className = "hours-row";
    const dayElement = document.createElement("span");
    const timeElement = document.createElement("span");
    dayElement.textContent = day;
    timeElement.textContent = time;
    row.append(dayElement, timeElement);
    list.appendChild(row);
  });
}

function addContactDetail(container, label, value, href, icon) {
  if (!value) return;
  const row = document.createElement("div");
  row.className = "contact-detail";
  const symbol = document.createElement("span");
  symbol.className = "contact-detail-icon";
  symbol.setAttribute("aria-hidden", "true");
  symbol.textContent = icon;
  const copy = document.createElement("div");
  const small = document.createElement("small");
  small.textContent = label;
  const link = document.createElement(href ? "a" : "span");
  link.className = "detail-value";
  link.textContent = value;
  if (href) { link.href = href; if (href.startsWith("http")) { link.target = "_blank"; link.rel = "noopener noreferrer"; } }
  copy.append(small, link);
  row.append(symbol, copy);
  container.appendChild(row);
}

function renderContacts() {
  const details = $("#contact-details");
  const socials = $("#social-links");
  details.innerHTML = "";
  socials.innerHTML = "";
  addContactDetail(details, "TELEFONO", businessConfig.phone, businessConfig.phone ? `tel:${businessConfig.phone.replace(/[^+\d]/g, "")}` : "", "↗");
  addContactDetail(details, "EMAIL", businessConfig.email, businessConfig.email ? `mailto:${businessConfig.email}` : "", "@ ");
  addContactDetail(details, "INDIRIZZO", businessConfig.address, businessConfig.mapUrl, "⌖");

  const contactLink = businessConfig.whatsapp
    ? `https://wa.me/${businessConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(businessConfig.whatsappMessage)}`
    : "";
  if (contactLink) {
    const link = document.createElement("a");
    link.href = contactLink; link.target = "_blank"; link.rel = "noopener noreferrer";
    link.className = "text-link"; link.textContent = "Scrivici su WhatsApp ↗";
    details.appendChild(link);
  }
  Object.entries(businessConfig.socials).forEach(([network, url]) => {
    if (!url) return;
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) return;
      const link = document.createElement("a");
      link.href = parsed.href; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.textContent = network.charAt(0).toUpperCase() + network.slice(1) + " ↗";
      socials.appendChild(link);
    } catch { /* URL non configurato correttamente: non mostrare il collegamento */ }
  });
  if (!details.children.length) {
    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = "I recapiti verranno aggiunti qui quando saranno disponibili i dati reali dell'attività.";
    details.appendChild(note);
  }
}

function configureLinks() {
  const contactTarget = businessConfig.whatsapp
    ? `https://wa.me/${businessConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(businessConfig.whatsappMessage)}`
    : "#contatti";
  ["[data-contact-link]", "[data-primary-cta]"].forEach((selector) => {
    $$(selector).forEach((link) => {
      link.href = contactTarget;
      if (contactTarget.startsWith("https://")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    });
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function setupMobileMenu() {
  const toggle = $(".menu-toggle");
  const nav = $("#site-nav");
  const closeMenu = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Apri il menu"); };
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Apri il menu" : "Chiudi il menu");
    nav.classList.toggle("is-open", !isOpen);
  });
  $$("a", nav).forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
}

let revealObserver;
function observeReveals() {
  const items = $$(".reveal:not(.is-visible)");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
  }
  items.forEach((item) => revealObserver.observe(item));
}

function setupLightbox() {
  const dialog = $("#lightbox");
  const image = $("#lightbox-image");
  $$("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.lightbox;
      image.alt = $("img", button)?.alt || "Immagine ingrandita";
      if (typeof dialog.showModal === "function") dialog.showModal();
      else window.open(image.src, "_blank", "noopener,noreferrer");
    });
  });
  $(".lightbox-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => { image.removeAttribute("src"); });
}

function setupForm() {
  const form = $("#contact-form");
  const status = $("#form-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("error");
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Controlla i campi: nome, contatto, motivo e messaggio sono necessari.";
      status.classList.add("error");
      return;
    }
    if (!businessConfig.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessConfig.email)) {
      status.textContent = "Modulo verificato, ma non è stato inviato: configura un indirizzo email reale in businessConfig.email oppure collega un servizio di invio. Non sono stati trasmessi dati.";
      status.classList.add("error");
      return;
    }
    const data = new FormData(form);
    const subject = `${businessConfig.name} — ${data.get("reason")}`;
    const body = `Nome: ${data.get("name")}\nRecapito: ${data.get("replyTo")}\nMotivo: ${data.get("reason")}\n\nMessaggio:\n${data.get("message")}`;
    status.textContent = "Si sta aprendo il tuo programma email con una bozza. Controlla il contenuto e premi Invia per trasmettere il messaggio.";
    window.location.href = `mailto:${businessConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function init() {
  configureBrand();
  renderServices();
  renderHours();
  renderContacts();
  configureLinks();
  setupMobileMenu();
  setupLightbox();
  setupForm();
  observeReveals();
  $("#current-year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
