const products = [
  { id: 1, name: "Weekly Diamond Pass x1", price: 29000 },
  { id: 2, name: "Diamond ML 5💎 ", price: 1600 },
  { id: 3, name: "Diamond Ganda ML 50+50💎", price: 17000 },
  { id: 4, name: "Diamond Ganda ML 150+150💎", price: 51000 },
  { id: 5, name: "Diamond Ganda ML 250+250💎", price: 85000 },
  { id: 6, name: "Diamond Ganda ML 500+500💎", price: 170000 },
  { id: 7, name: "Diamond ML 12💎", price: 4000 },
  { id: 8, name: "Diamond ML 19💎", price: 6500 },
  { id: 9, name: "Diamond ML 28💎", price: 9500 },
  { id: 10, name: "Diamond ML 44💎", price: 13500 },
  { id: 11, name: "Diamond ML 59💎", price: 18000 },
  { id: 12, name: "Diamond ML 85💎", price: 27500 },
  { id: 13, name: "Diamond ML 170💎 (Event Topup 100💎)", price: 53000 },
  { id: 14, name: "Diamond ML 240💎", price: 70000 },
  { id: 15, name: "Diamond ML 296💎 (Event Topup 250💎)", price: 85800 },
  { id: 16, name: "Diamond ML 408💎", price: 125000 },
  { id: 17, name: "Diamond ML 568💎", price: 165000 },
  { id: 18, name: "Diamond ML 875💎", price: 245000 },
  { id: 19, name: "Diamond ML 2010💎", price: 550000 },
  { id: 20, name: "Diamond ML 4830💎", price: 1430000 },
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
