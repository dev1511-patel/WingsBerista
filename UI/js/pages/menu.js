function renderMenu() {
  const filtered = activeCat === 'All' ? MENU : MENU.filter(i => i.cat === activeCat);
  return `<div class="page">
    <div class="section">
      <div class="section-title">Our Menu</div>
      <div class="section-sub">Fresh food made to order — pick your favourites</div>
      <div class="cats">
        ${CATS.map(c => `<button class="cat ${activeCat === c ? 'active' : ''}" onclick="setCat('${c}')">${c}</button>`).join('')}
      </div>
      <div class="menu-grid">${filtered.map(menuCard).join('')}</div>
    </div>
  </div>`;
}

function menuCard(item) {
  return `<div class="card">
    <div class="card-img">
  ${item.badge ? `<span class="card-badge ${item.spicy ? 'spicy' : ''}">${item.badge}</span>` : ''}

  <img
    src="${item.image}"
    alt="${item.name}"
    class="menu-food-img"
  >
</div>
    <div class="card-body">
      <div class="card-title">${item.name}</div>
      <div class="card-desc">${item.desc}</div>
      <div class="card-footer">
        <span class="price">£${item.price.toFixed(2)}</span>
        <button class="add-btn" onclick="addToCart(${item.id})">+</button>
      </div>
    </div>
  </div>`;
}

function setCat(c) { activeCat = c; render(); }