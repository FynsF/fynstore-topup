const cart = [];
const cartItems = document.getElementById("cart-items");
const totalPriceElem = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout");

// Fungsi untuk menambah item ke keranjang
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const productElement = this.parentElement;
    const productName = productElement.getAttribute("data-name");
    const productPrice = parseInt(productElement.getAttribute("data-price"));

    // Mengecek apakah produk sudah ada di keranjang
    const existingProduct = cart.find((item) => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
  });
});

// Update tampilan keranjang dan total harga
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    // Detail item dan tombol edit/hapus
    li.innerHTML = `
      <div class="item-details">
        <span>${item.name}</span>
        <span>${item.price} IDR</span>
        <div class="quantity">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
        <button class="remove" data-index="${index}">Hapus</button>
      </div>
    `;
    cartItems.appendChild(li);

    // Hitung total harga
    total += item.price * item.quantity;
  });

  totalPriceElem.textContent = total;
  checkoutButton.disabled = total === 0;
}

// Menambah jumlah item
cartItems.addEventListener("click", function (event) {
  const target = event.target;
  const index = target.getAttribute("data-index");

  if (target.classList.contains("increase")) {
    cart[index].quantity++;
  } else if (
    target.classList.contains("decrease") &&
    cart[index].quantity > 1
  ) {
    cart[index].quantity--;
  } else if (target.classList.contains("remove")) {
    cart.splice(index, 1);
  }

  updateCart();
});

// Fungsi untuk checkout
checkoutButton.addEventListener("click", function () {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartDetails = cart
    .map((item) => `${item.name} - ${item.quantity} x ${item.price} IDR`)
    .join("\n");

  // Mengarahkan ke WhatsApp
  const whatsappMessage = `Saya ingin melakukan top-up dengan total ${totalAmount} IDR. Detail:\n\n${cartDetails}`;
  const whatsappLink = `https://wa.me/6281269441924?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  window.location.href = whatsappLink;
});
