// Animaciones scroll con IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Validaciones del formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  let valido = true;

  [nombre, email, mensaje].forEach(field => field.classList.remove("is-invalid"));

  if (!nombre.value.trim()) {
    nombre.classList.add("is-invalid");
    valido = false;
  }

  if (!email.value.includes("@") || !email.value.includes(".")) {
    email.classList.add("is-invalid");
    valido = false;
  }

  if (!mensaje.value.trim()) {
    mensaje.classList.add("is-invalid");
    valido = false;
  }

  if (valido) {
    new bootstrap.Modal(document.getElementById('successModal')).show();
    this.reset();
  }
});

// Carrito de compras con cálculo de total y descuento
let cart = [];

document.querySelectorAll(".btn-primary").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".card");
    const title = product.querySelector(".card-title").textContent;
    const price = 10000; // Precio fijo por producto
    cart.push({ title, price });
    updateCart();
  });
});

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const cartDiscount = document.getElementById("cartDiscount");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "list-group-item bg-dark text-light d-flex justify-content-between align-items-center";
    li.textContent = `${item.title} - $${item.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-sm btn-danger";
    removeBtn.innerHTML = "<i class='fas fa-trash'></i>";
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  // Aplica 10% de descuento si hay 3 o más productos
  let discount = 0;
  if (cart.length >= 3) {
    discount = Math.floor(total * 0.10);
  }

  cartCount.textContent = cart.length;
  cartTotal.textContent = "$" + (total - discount);
  cartDiscount.textContent = "$" + discount;
}
