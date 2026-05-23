function renderAdmin(){
  const tabs=[{key:'dashboard',icon:'📊',label:'Dashboard'},{key:'orders',icon:'📋',label:'Orders'},{key:'billing',icon:'💷',label:'Billing'},{key:'menu',icon:'🍔',label:'Menu'}];
  return `<div class="page">
  <div class="admin-wrap">
    <div class="admin-sidebar">
      <div class="sidebar-logo">Wings<span>Berista</span></div>
      <div style="background:#2a2a2a;border-radius:8px;padding:10px 14px;margin-bottom:1rem;font-size:12px;color:#888">
        Logged in as<br><strong style="color:var(--orange);font-size:13px">${authState.user?.name}</strong>
        <span style="display:block;background:#fff3cd;color:#856404;font-size:10px;padding:2px 8px;border-radius:50px;font-weight:800;display:inline-block;margin-top:4px">ADMIN</span>
      </div>
      ${tabs.map(t=>`<button class="sb-item ${adminTab===t.key?'active':''}" onclick="setAdminTab('${t.key}')">${t.icon} ${t.label}</button>`).join('')}
      <div class="sb-spacer"></div>
      <button class="sb-item" onclick="goTo('home')" style="color:#666;font-size:12px">← Back to Site</button>
      <button class="sb-item" onclick="logout()" style="color:#c0392b;font-size:12px">🔒 Logout</button>
    </div>
    <div class="admin-content">
      ${adminTab==='dashboard'?renderDashboard():adminTab==='orders'?renderOrdersAdmin():adminTab==='billing'?renderBilling():renderMenuAdmin()}
    </div>
  </div>
  </div>`;
}

// Keep your existing renderDashboard(), renderOrdersAdmin(), ordersTable(), renderBilling(), and renderMenuAdmin() below here. They remain the same.

function setAdminTab(t) { adminTab = t; render(); }

// Dashboard
function renderDashboard() {
  return `<div>
    <div class="section-title" style="font-size:28px">Dashboard</div>
    <div class="section-sub">Today's overview</div>

    <div class="stats-row">
      <div class="stat-card"><div class="s-label">Today's Revenue</div><div class="s-val green">£847</div></div>
      <div class="stat-card"><div class="s-label">Total Orders</div><div class="s-val">43</div></div>
      <div class="stat-card"><div class="s-label">Pending</div><div class="s-val orange">7</div></div>
      <div class="stat-card"><div class="s-label">Cancelled</div><div class="s-val red">2</div></div>
    </div>

    <div class="admin-card">
      <div class="admin-card-title">Recent Orders</div>
      ${ordersTable(SAMPLE_ORDERS.slice(0, 5))}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;flex-wrap:wrap">
      <div class="admin-card">
        <div class="admin-card-title">Top Items Today</div>
        ${[
          ['🍔 Classic Burger','18 sold','#D85A30'],
          ['🍕 Pepperoni Blaze','12 sold','#EF9F27'],
          ['🍗 Crispy Wings','11 sold','#1D9E75'],
          ['🥤 Oreo Shake','9 sold','#888'],
        ].map(([n,s,c]) => `<div class="top-item-bar">
          <span class="top-item-label">${n}</span>
          <span class="top-item-badge" style="background:${c}22;color:${c}">${s}</span>
        </div>`).join('')}
      </div>
      <div class="admin-card">
        <div class="admin-card-title">Order Breakdown</div>
        ${[['🚚 Delivery','21 orders','61%'],['🏠 Collection','13 orders','30%'],['🍽️ Dine-in','9 orders','9%']].map(([t,c,p]) => `
          <div class="progress-wrap">
            <div class="progress-meta">
              <span class="pm-label">${t}</span>
              <span class="pm-count">${c}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${p}"></div></div>
          </div>`).join('')}
      </div>
    </div>
  </div>`;
}

// Orders Admin
function renderOrdersAdmin() {
  return `<div>
    <div class="admin-page-head">
      <div>
        <div class="section-title" style="font-size:28px">Orders</div>
        <div class="section-sub">Manage &amp; update all orders</div>
      </div>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <input class="admin-search" type="text" placeholder="Search orders...">
        <select class="admin-select">
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Delivered</option>
        </select>
      </div>
    </div>
    <div class="admin-card" style="padding:0">
      ${ordersTable(SAMPLE_ORDERS)}
    </div>
  </div>`;
}

function ordersTable(orders) {
  return `<div class="orders-table">
    <div class="ot-head">
      <div class="col-id">Order</div>
      <div class="col-cust">Customer</div>
      <div class="col-items">Items</div>
      <div class="col-total">Total</div>
      <div class="col-status">Status</div>
      <div class="col-action">Action</div>
    </div>
    ${orders.map(o => `<div class="ot-row">
      <div class="col-id">${o.id}</div>
      <div class="col-cust">${o.cust}</div>
      <div class="col-items">${o.items}</div>
      <div class="col-total">${o.total}</div>
      <div class="col-status">
        <span class="status-pill status-${o.status}">${o.status}</span>
      </div>
      <div class="col-action">
        <button class="action-btn">Update</button>
      </div>
    </div>`).join('')}
  </div>`;
}

// Billing
function renderBilling() {
  const invoices = [
    {id:'INV-1042', cust:'James H.',  items:'Burger + Fries + Shake',  amt:'£18.47', paid:true},
    {id:'INV-1041', cust:'Sarah K.',  items:'Pizza + 2x Shake',        amt:'£23.97', paid:true},
    {id:'INV-1040', cust:'Omar R.',   items:'Wings + Burger',           amt:'£16.98', paid:true},
    {id:'INV-1039', cust:'Priya M.',  items:'Strips + Fries',           amt:'£12.98', paid:false},
    {id:'INV-1038', cust:'Tom B.',    items:'Pizza + Shake',            amt:'£17.78', paid:true},
  ];
  return `<div>
    <div class="section-title" style="font-size:28px">Billing</div>
    <div class="section-sub">Revenue tracking &amp; invoice management</div>

    <div class="stats-row">
      <div class="stat-card"><div class="s-label">Today</div><div class="s-val green">£847</div></div>
      <div class="stat-card"><div class="s-label">This Week</div><div class="s-val green">£4,231</div></div>
      <div class="stat-card"><div class="s-label">This Month</div><div class="s-val green">£18,450</div></div>
      <div class="stat-card"><div class="s-label">Pending</div><div class="s-val orange">£124</div></div>
    </div>

    <div class="admin-card">
      <div class="admin-card-title">Recent Invoices</div>
      ${invoices.map(inv => `<div class="invoice-item">
        <div class="inv-id">${inv.id}</div>
        <div class="inv-info">
          <div class="inv-name">${inv.cust}</div>
          <div class="inv-items">${inv.items}</div>
        </div>
        <div class="inv-amount">${inv.amt}</div>
        <span class="status-pill ${inv.paid ? 'status-delivered' : 'status-pending'}">${inv.paid ? 'Paid' : 'Pending'}</span>
        <button class="print-btn">🧾 Print</button>
      </div>`).join('')}
    </div>
  </div>`;
}

// Menu Admin
function renderMenuAdmin() {
  return `<div>
    <div class="admin-page-head">
      <div>
        <div class="section-title" style="font-size:28px">Menu Management</div>
        <div class="section-sub">Add, edit or remove menu items</div>
      </div>
      <button class="btn-primary" style="border-radius:50px">+ Add Item</button>
    </div>
    ${MENU.map(i => `<div class="menu-admin-item">
     <div class="menu-admin-image">
  <img src="${i.image}" alt="${i.name}">
</div>
      <div class="menu-admin-info">
        <div class="menu-admin-name">${i.name}</div>
        <div class="menu-admin-meta">${i.cat} · ${i.desc}</div>
      </div>
      <div class="menu-admin-price">£${i.price.toFixed(2)}</div>
      <button class="edit-btn">Edit</button>
      <button class="del-btn">Remove</button>
    </div>`).join('')}
  </div>`;
}