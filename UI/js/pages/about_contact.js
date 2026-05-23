function renderAbout() {
  return `<div class="page">
    <div class="section" style="background: var(--dark); color: #fff; text-align:center; padding: 4rem 2rem;">
      <h1 style="font-family:'Bebas Neue', sans-serif; font-size: 56px; letter-spacing: 2px;">ABOUT US</h1>
      <p style="color:var(--orange);">Home » About Us</p>
    </div>

    <div class="section">
      <div class="split-section">
        <div>
          <div class="section-title" style="color:var(--red);">Welcome to The Wing Barista</div>
          <p style="font-size: 16px; line-height: 1.8; color: var(--muted); margin-bottom: 1.5rem;">
            Where café comfort meets street food flavour. We're not just another place to eat — we're your new favourite hangout. 
            At The Wing Barista, we bring together the best of both worlds: hearty café classics and bold, flavour-packed bites.
          </p>
          <p style="font-size: 16px; line-height: 1.8; color: var(--muted); margin-bottom: 2rem;">
            Whether you're starting your day with a Full English breakfast, grabbing a hot panini at lunch, or treating yourself 
            to wings, burgers, and milkshakes — we've got something for every craving.
          </p>
          <button class="btn-primary" onclick="goTo('menu')">View Menu</button>
        </div>
        <div>
          <img src="Images/About_Us_W.webp" alt="About Us" class="split-img" style="border: 4px solid var(--red);"/>
        </div>
      </div>
    </div>
  </div>`;
}

function renderContact() {
  return `<div class="page">
    <div class="section" style="background: var(--red); color: #fff; text-align:center; padding: 4rem 2rem;">
      <h1 style="font-family:'Bebas Neue', sans-serif; font-size: 56px; letter-spacing: 2px;">CONTACT US</h1>
      <p>We'd love to hear from you!</p>
    </div>

    <div class="section">
      <div class="split-section">
        <div>
          <div class="section-title">Get In Touch</div>
          <p style="color:var(--muted); margin-bottom: 2rem;">Have a question about our menu, catering, or just want to say hi? Drop us a message.</p>
          
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your Name">
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com">
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea rows="4" placeholder="How can we help you?"></textarea>
          </div>
          <button class="btn-primary" onclick="alert('Message Sent!')">Send Message</button>
        </div>

        <div style="background: var(--dark); padding: 3rem; border-radius: var(--r); color: #fff;">
          <h3 style="font-family:'Bebas Neue', sans-serif; font-size: 32px; color: var(--orange); margin-bottom: 1.5rem;">HOURS OF OPERATION</h3>
          
          <div style="margin-bottom: 2rem;">
            <h4 style="color: var(--red); margin-bottom: 0.5rem; font-size: 18px;">☕ CAFE HOURS</h4>
            <p style="color: #aaa;">Mon - Sun: 8:00 AM - 5:00 PM</p>
          </div>

          <div>
            <h4 style="color: var(--red); margin-bottom: 0.5rem; font-size: 18px;">🍗 WINGS HOURS</h4>
            <p style="color: #aaa;">Mon - Thurs: 11:00 AM - 11:30 PM</p>
            <p style="color: #aaa;">Fri - Sun: 11:00 AM - 12:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}