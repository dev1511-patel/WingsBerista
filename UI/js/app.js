let currentPage = 'home';
let activeCat   = 'All';
let adminTab    = 'dashboard';
let cartOpen    = false;
let cart        = [];

function goTo(page){
  currentPage = page;
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const el = document.getElementById('nav-'+page);
  if(el) el.classList.add('active');
  updateNavUserArea();
  render();
  window.scrollTo({top:0,behavior:'smooth'});
}

function handleAdminClick(){
  if(isAdmin()) goTo('admin');
  else goTo('login');
}

const params = new URLSearchParams(window.location.search);

const page = params.get('page');

if(page){
  currentPage = page;
}

/*
  IMPORTANT:
  If reset token exists in URL,
  automatically open reset-password page
*/

if(params.get("token")){
  currentPage = 'reset-password';
}

function render(){
  const mc = document.getElementById('main-content');
  const footer = document.getElementById('site-footer');
  // footer.style.display = (currentPage==='admin'||currentPage==='login'||currentPage==='signup') ? 'none' : 'block';
footer.style.display =
(
  currentPage==='admin' ||
  currentPage==='login' ||
  currentPage==='signup' ||
  currentPage==='forgot-password' ||
  currentPage==='reset-password'
)
? 'none'
: 'block';
  if     (currentPage==='home')   mc.innerHTML = renderHome();
  else if (currentPage==='about')   mc.innerHTML = renderAbout();
  else if (currentPage==='contact') mc.innerHTML = renderContact();
  else if(currentPage==='menu')   mc.innerHTML = renderMenu();
  else if(currentPage==='order')  mc.innerHTML = renderOrder();
  else if(currentPage==='login')  mc.innerHTML = renderLogin();
  else if(currentPage==='signup') mc.innerHTML = renderSignup();
  else if(currentPage==='forgot-password') mc.innerHTML = renderForgotPassword();
 else if(currentPage==='reset-password') {
    const token =
      new URLSearchParams(window.location.search).get("token") || "";

    mc.innerHTML = renderResetPassword(token);
}

  else if(currentPage==='admin'){
    if(!isAdmin()){ mc.innerHTML = renderAccessDenied(); }
    else { mc.innerHTML = renderAdmin(); }
  }
}

// Init calls
loadAuth();
updateNavUserArea();
render();
updateCartUI();
