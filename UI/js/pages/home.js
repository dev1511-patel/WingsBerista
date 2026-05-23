function renderHome(){
  const featured = MENU.filter(i=>i.badge==='Popular').slice(0,5);
  return `<div class="page">
    <div class="hero">
      <video autoplay muted loop playsinline class="hero-video-bg">
        <source src="Images/Home_Page_Video.mp4" type="video/mp4">
      </video>
      
      <div class="hero-content">
        <div class="hero-tag">PREMIUM QUALITY</div>
        <h1>THE WING<br><span>BARISTA</span></h1>
        <p style="color:#fff; font-size:20px; font-weight:600; text-shadow: 1px 2px 4px rgba(0,0,0,0.8); margin: 1rem 0 2rem;">
          WHERE CAFÉ COMFORT MEETS STREET FOOD FLAVOUR
        </p>
        <div style="display:flex; justify-content:center; gap:1rem;">
          <button class="btn-primary" onclick="goTo('menu')">View Menu</button>
          <button class="btn-outline" style="border-color:#fff; color:#fff" onclick="goTo('about')">More About Us</button>
        </div>
      </div>
    </div>

    <div class="section section-dark">
      <div class="section-title" style="color:var(--white);text-align:center">BEST SELLERS</div>
      <div class="section-sub" style="text-align:center;color:#888">The crowd favourites</div>
      <div class="menu-grid">${featured.map(menuCard).join('')}</div>
    </div>
  </div>`;
}