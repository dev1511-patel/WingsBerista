function renderOrder(){
  if(cart.length===0) return `<div class="page"><div class="section">
    <div class="section-title">Place Your Order</div>
    <div class="order-wrap">
      <div style="text-align:center;padding:3rem;background:var(--white);border-radius:var(--r);border:2px dashed #ddd">
        <div style="font-size:56px;margin-bottom:1rem">🛒</div>
        <p style="color:var(--muted);margin-bottom:1.5rem">Your cart is empty. Add some items first!</p>
        <button class="btn-primary" onclick="goTo('menu')">Browse Menu</button>
      </div>
    </div>
  </div></div>`;

  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const total = sub+DELIVERY_FEE;
  return `<div class="page"><div class="section">
    <div class="section-title">Place Your Order</div>
    <div class="order-wrap">
      <div class="order-summary-box">
        <div class="summary-heading">Order Summary</div>
        ${cart.map(i=>`
<div class="summary-item">

  <div style="display:flex;align-items:center;gap:10px">

    <img
      src="${i.image}"
      alt="${i.name}"
      style="
        width:45px;
        height:45px;
        border-radius:8px;
        object-fit:cover;
      "
    >

    <span>${i.name} x${i.qty}</span>

  </div>

  <strong>£${(i.price*i.qty).toFixed(2)}</strong>

</div>
`).join('')}
        <hr class="summary-divider"/>
        <div class="summary-item" style="color:var(--muted)"><span>Delivery Fee</span><span>£${DELIVERY_FEE.toFixed(2)}</span></div>
        <div class="summary-total"><span>Total</span><span>£${total.toFixed(2)}</span></div>
      </div>
      <div class="form-group-order"><label>Order Type</label>
        <div class="ot-btns">
          <button class="ot-btn sel" onclick="selectOT(this)">🚚 Delivery</button>
          <button class="ot-btn" onclick="selectOT(this)">🏠 Collection</button>
          <button class="ot-btn" onclick="selectOT(this)">🍽️ Dine-in</button>
        </div>
      </div>
      <div class="form-row-order">
        <div class="form-group-order"><label>First Name</label><input type="text" placeholder="James" ${isLoggedIn()?`value="${authState.user?.name?.split(' ')[0]||''}"`:''}></div>
        <div class="form-group-order"><label>Last Name</label><input type="text" placeholder="Harper" ${isLoggedIn()?`value="${authState.user?.name?.split(' ').slice(1).join(' ')||''}"`:''}></div>
      </div>
      <div class="form-group-order"><label>Phone</label><input type="tel" placeholder="+44 7700 900123"></div>
      <div class="form-group-order"><label>Delivery Address</label><textarea rows="3" placeholder="123 High Street, London, SW1A 1AA"></textarea></div>
      <div class="form-group-order"><label>Special Instructions</label><textarea rows="2" placeholder="Allergies, extra sauce…"></textarea></div>
      <div class="form-group-order"><label>Payment Method</label>
        <select><option>Credit / Debit Card</option><option>Cash on Delivery</option><option>Apple Pay</option><option>Google Pay</option></select>
      </div>
      <button class="checkout-btn" onclick="placeOrder()">🎉 Place Order — £${total.toFixed(2)}</button>
    </div>
  </div></div>`;
}

function selectOT(el){document.querySelectorAll('.ot-btn').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');}

function placeOrder(){
  const num='WB-2026-'+String(1000+Math.floor(Math.random()*900)).padStart(4,'0');
  alert('🎉 Order Placed!\n\nOrder ID: '+num+'\nEstimated time: 15–20 minutes.\nThank you for choosing WingsBerista!');
  cart=[]; updateCartUI(); goTo('home');
}