const products = [
  { id: 1, name: "Diamond ML 86", price: 25000 },
  { id: 2, name: "Diamond ML 172", price: 48000 },
  { id: 3, name: "Diamond ML 257", price: 70000 },
];

let cart = [];

function renderProducts() {
  const list = document.getElementById("productList");
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Rp${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})">Tambah</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  const found = cart.find((item) => item.id === id);
  if (found) {
    found.qty++;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartList.innerHTML += `
      <li>
        ${item.name} - Rp${item.price.toLocaleString()} x 
        <input type="number" value="${
          item.qty
        }" min="1" onchange="updateQty(${index}, this.value)">
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
  });

  totalEl.textContent = `Rp${total.toLocaleString()}`;
}

function updateQty(index, qty) {
  cart[index].qty = parseInt(qty);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let message = "Halo Admin Fynstore! Saya ingin top-up:\n\n";
  let total = 0;

  cart.forEach((item) => {
    message += `- ${item.name} x${item.qty} = Rp${(
      item.price * item.qty
    ).toLocaleString()}\n`;
    total += item.price * item.qty;
  });

  message += `\nTotal: Rp${total.toLocaleString()}`;

  // Tambah catatan pembeli
  const note = document.getElementById("note").value.trim();
  if (note) {
    message += `\n\nCatatan:\n${note}`;
  }

  const encodedMessage = encodeURIComponent(message);
  const phone = "6281269441924"; // Ganti dengan nomor admin
  const waLink = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(waLink, "_blank");
}


renderProducts();
