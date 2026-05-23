function addToCart(id) {
  const item = MENU.find(i => i.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const list   = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');

  if (cart.length === 0) {
    list.innerHTML = `<div class="empty-cart">
      <div class="ec-icon">🍽️</div>
      <p>No items yet.<br>Add some food!</p>
    </div>`;
    footer.innerHTML = '';
    return;
  }

  list.innerHTML = cart.map(i => `<div class="cart-item">
    <div class="ci-image">
  <img src="${i.image}" alt="${i.name}">
</div>
    <div class="ci-info">
      <div class="ci-name">${i.name}</div>
      <div class="ci-price">£${(i.price * i.qty).toFixed(2)}</div>
    </div>
    <div class="ci-qty">
      <button class="qty-btn" onclick="changeQty(${i.id}, -1)">−</button>
      <span style="font-weight:700;font-size:14px">${i.qty}</span>
      <button class="qty-btn" onclick="changeQty(${i.id}, 1)">+</button>
    </div>
  </div>`).join('');

  const sub   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = sub + DELIVERY_FEE;

  footer.innerHTML = `<div class="cart-total">
    <div class="total-row"><span>Subtotal</span><span>£${sub.toFixed(2)}</span></div>
    <div class="total-row"><span>Delivery</span><span>£${DELIVERY_FEE.toFixed(2)}</span></div>
    <div class="total-row big"><span>Total</span><span>£${total.toFixed(2)}</span></div>
    <button class="checkout-btn" onclick="toggleCart(); goTo('order')">Checkout →</button>
  </div>`;
}

function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById('cart-overlay').classList.toggle('open', cartOpen);
  document.getElementById('cart-panel').classList.toggle('open', cartOpen);
  updateCartUI();
}