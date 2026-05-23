// ═══════════════════════════════════════════════════════════════
//  AUTH STATE & LOGIC
// ═══════════════════════════════════════════════════════════════
let authState = {
  isLoggedIn: false,
  user: null,   // { name, email, role: 'CUSTOMER' | 'ADMIN' }
  token: null,
};

let selectedRole = 'CUSTOMER';
const DEMO_USERS = [
  {email:'admin@wingsberista.co.uk', password:'admin123', name:'Shop Owner', role:'ADMIN'},
  {email:'customer@example.com',     password:'pass1234', name:'James Harper', role:'CUSTOMER'},
];
const ADMIN_SECRET = 'WINGS2026ADMIN'; 

function isAdmin(){ return authState.isLoggedIn && authState.user?.role === 'ADMIN'; }
function isLoggedIn(){ return authState.isLoggedIn; }

function loadAuth(){
  try{
    const saved = sessionStorage.getItem('wb_auth');
    if(saved){ authState = JSON.parse(saved); }
  }catch(e){}
}
function saveAuth(){ sessionStorage.setItem('wb_auth', JSON.stringify(authState)); }
function clearAuth(){
  authState = {isLoggedIn:false,user:null,token:null};
  sessionStorage.removeItem('wb_auth');
}

function updateNavUserArea(){
  const area = document.getElementById('nav-user-area');
  if(!area) return;
  // if(isLoggedIn()){
  //   const initial = (authState.user?.name||'U')[0].toUpperCase();
  //   area.innerHTML = `
  //     <div class="user-chip">
  //       <div class="user-avatar">${initial}</div>
  //       <span>${authState.user?.name?.split(' ')[0]}</span>
  //       ${isAdmin()?'<span style="background:#fff3cd;color:#856404;font-size:10px;padding:2px 8px;border-radius:50px;font-weight:800">ADMIN</span>':''}
  //       <button class="logout-btn" onclick="logout()">Logout</button>
  //     </div>`;
  // } 

if(isLoggedIn()){

  const initial = (authState.user?.name || 'U')[0].toUpperCase();

  area.innerHTML = `
    <div class="profile-menu">

      <div class="profile-trigger" onclick="toggleProfileDropdown(event)">

        <div class="user-avatar">${initial}</div>

        <span class="profile-arrow"></span>

      </div>

      <div class="profile-dropdown" id="profile-dropdown">

        <div class="profile-info">

          <div class="profile-fullname">
            ${authState.user?.name}
          </div>

          <div class="profile-email">
            ${authState.user?.email}
          </div>

          <div class="profile-role">
            ${authState.user?.role}
          </div>

        </div>

       

        <button onclick="logout()">
          🚪 Logout
        </button>

      </div>

    </div>
  `;
}
  else {
    area.innerHTML = `
      <button class="nav-auth-btn" onclick="goTo('login')">Login</button>
      <button class="nav-auth-btn primary" onclick="goTo('signup')">Sign Up</button>`;
  }
}

function logout(){
  clearAuth();
  goTo('home');
}


function toggleProfileDropdown(event){

  event.stopPropagation();

  const dropdown =
    document.getElementById('profile-dropdown');

  if(dropdown){
    dropdown.classList.toggle('show');
  }
}

document.addEventListener('click', () => {

  const dropdown =
    document.getElementById('profile-dropdown');

  if(dropdown){
    dropdown.classList.remove('show');
  }

});


// function doLogin(){
//   const email    = document.getElementById('login-email').value.trim();
//   const password = document.getElementById('login-password').value;
//   let valid = true;

//   if(!email || !email.includes('@')){ showFieldErr('err-login-email'); valid=false; }
//   if(!password){ showFieldErr('err-login-password'); valid=false; }
//   if(!valid) return;

//   const btn = document.getElementById('login-btn');
//   btn.disabled = true;
//   btn.textContent = 'Logging in…';

//   setTimeout(()=>{
//     const found = DEMO_USERS.find(u=>u.email===email && u.password===password);
//     if(found){
//       authState = {isLoggedIn:true, user:{name:found.name,email:found.email,role:found.role}, token:'demo-jwt-token-'+Date.now()};
//       saveAuth();
//       showAlert('login-success','Welcome back, '+found.name.split(' ')[0]+'! Redirecting…','login');
//       setTimeout(()=>{ found.role==='ADMIN' ? goTo('admin') : goTo('home'); },1000);
//     } else {
//       showAlert('login-error','Incorrect email or password. Try: admin@wingsberista.co.uk / admin123');
//       btn.disabled=false; btn.textContent='Login to My Account';
//     }
//   },800);
// }

async function doLogin() {

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {

    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();

    authState = {
      isLoggedIn: true,
      user: {
        name: data.name,
        email: data.email,
        role: data.role
      },
      token: data.token
    };

    saveAuth();

    if (data.role === 'ADMIN') {
      goTo('admin');
    } else {
      goTo('home');
    }

  } catch (err) {
    showAlert('login-error', err.message);
  }
}

// function doSignup(){
//   const fname    = document.getElementById('signup-fname').value.trim();
//   const lname    = document.getElementById('signup-lname').value.trim();
//   const email    = document.getElementById('signup-email').value.trim();
//   const password = document.getElementById('signup-password').value;
//   const role     = selectedRole;
//   const adminKey = role==='ADMIN' ? document.getElementById('signup-admin-key').value : '';
//   let valid = true;

//   if(!fname){ showFieldErr('err-fname'); valid=false; }
//   if(!lname){ showFieldErr('err-lname'); valid=false; }
//   if(!email||!email.includes('@')){ showFieldErr('err-semail'); valid=false; }
//   if(password.length<8){ showFieldErr('err-spassword'); valid=false; }
//   if(role==='ADMIN' && !adminKey){ showFieldErr('err-admin-key'); valid=false; }
//   if(!valid) return;

//   const btn = document.getElementById('signup-btn');
//   btn.disabled=true; btn.textContent='Creating account…';

//   setTimeout(()=>{
//     if(role==='ADMIN' && adminKey!==ADMIN_SECRET){
//       showAlert('signup-error','Invalid admin secret key. Please contact the shop owner.');
//       btn.disabled=false; btn.textContent='Create My Account'; return;
//     }
//     authState = {isLoggedIn:true, user:{name:fname+' '+lname, email, role}, token:'demo-jwt-'+Date.now()};
//     saveAuth();
//     showAlert('signup-success','Account created! Welcome to WingsBerista, '+fname+'!','signup');
//     setTimeout(()=>{ role==='ADMIN' ? goTo('admin') : goTo('home'); },1200);
//   },900);
// }

async function doSignup() {

  const fname = document.getElementById('signup-fname').value.trim();
  const lname = document.getElementById('signup-lname').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const phone = document.getElementById('signup-phone').value.trim();
  const password = document.getElementById('signup-password').value;
  const role = selectedRole;

  const adminKey = role === 'ADMIN'
      ? document.getElementById('signup-admin-key').value
      : '';

  try {

    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        email: email,
        phoneNumber: phone,
        password: password,
        role: role,
        adminSecretKey: adminKey
      })
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();

    authState = {
      isLoggedIn: true,
      user: {
        name: data.name,
        email: data.email,
        role: data.role
      },
      token: data.token
    };

    saveAuth();

    if (data.role === 'ADMIN') {
      goTo('admin');
    } else {
      goTo('home');
    }

  } catch (err) {
    showAlert('signup-error', err.message);
  }
}

function selectRole(role){
  selectedRole = role;
  document.getElementById('role-customer').classList.toggle('sel', role==='CUSTOMER');
  document.getElementById('role-admin').classList.toggle('sel',    role==='ADMIN');
  document.getElementById('admin-note').classList.toggle('show',   role==='ADMIN');
  document.getElementById('admin-key-group').style.display = role==='ADMIN' ? 'block' : 'none';
}

function togglePwd(id, btn){
  const inp = document.getElementById(id);
  if(inp.type==='password'){ inp.type='text'; btn.textContent='🙈'; }
  else { inp.type='password'; btn.textContent='👁'; }
}

function checkPasswordStrength(){
  const pwd = document.getElementById('signup-password').value;
  const el  = document.getElementById('pwd-strength');
  if(!pwd){ el.textContent=''; return; }
  if(pwd.length<6)       { el.style.color='#c0392b'; el.textContent='Weak — too short'; }
  else if(pwd.length<10) { el.style.color='#e67e22'; el.textContent='Fair — add numbers & symbols'; }
  else if(/[A-Z]/.test(pwd)&&/[0-9]/.test(pwd)){ el.style.color='var(--green)'; el.textContent='Strong password'; }
  else { el.style.color='#f39c12'; el.textContent='Good — add uppercase for stronger'; }
}

function showFieldErr(id){ document.getElementById(id)?.classList.add('show'); }
function clearLoginError(){
  document.querySelectorAll('.field-error').forEach(e=>e.classList.remove('show'));
  document.getElementById('login-error')?.classList.remove('show');
}
function showAlert(id, msg, prefix){
  const el = document.getElementById((prefix?prefix+'-':'')+id.replace(/^(login|signup)-/,''));
  if(!el){ const el2=document.getElementById(id); if(el2){el2.textContent=msg;el2.classList.add('show');} return; }
  el.textContent=msg; el.classList.add('show');
  const el3=document.getElementById(id); if(el3){el3.textContent=msg;el3.classList.add('show');}
}

async function sendResetLink() {

  const email = document.getElementById("forgot-email").value;

  try {

    const response = await fetch(
      "http://localhost:8080/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      }
    );

    const data = await response.text();

    showAlert("forgot-success", data, "success");

  } catch (err) {

    showAlert(
      "forgot-error",
      "Failed to send reset link"
    );
  }
}

// function renderResetPassword(){

//   const params = new URLSearchParams(window.location.search);

//   const token = params.get("token") || "";

//   return `
//   <div class="page">

//     <div class="auth-page">

//       <div class="auth-split">

//         <div class="auth-left">

//           <div class="auth-brand">
//             Wings<span>Berista</span>
//           </div>

//           <div class="auth-tagline">
//             Create your new password securely.
//           </div>

//         </div>

//         <div class="auth-right">

//           <div class="auth-title">
//             Reset Password
//           </div>

//           <div class="alert-box error" id="reset-error"></div>

//           <div class="alert-box success" id="reset-success"></div>

//           <div class="form-group">

//             <label>New Password</label>

//             <div class="password-wrap">

//               <input
//                 type="password"
//                 id="new-password"
//                 placeholder="Enter new password"
//               />

//               <button
//                 class="eye-btn"
//                 onclick="togglePwd('new-password',this)"
//                 type="button"
//               >
//                 👁
//               </button>

//             </div>

//           </div>

//           <button
//             class="submit-btn"
//             onclick="resetPassword('${token}')"
//           >
//             Update Password
//           </button>

//         </div>

//       </div>

//     </div>

//   </div>
//   `;
// }

// function renderForgotPassword(){

//   return `
//   <div class="page">

//     <div class="auth-page">

//       <div class="auth-split">

//         <div class="auth-left">

//           <div class="auth-brand">
//             Wings<span>Berista</span>
//           </div>

//           <div class="auth-tagline">
//             Reset your password in seconds.
//           </div>

//         </div>

//         <div class="auth-right">

//           <div class="auth-title">
//             Forgot Password
//           </div>

//           <div class="auth-sub">
//             Enter your email address below
//           </div>

//           <div class="alert-box error" id="forgot-error"></div>

//           <div class="alert-box success" id="forgot-success"></div>

//           <div class="form-group">

//             <label>Email Address</label>

//             <input
//               type="email"
//               id="forgot-email"
//               placeholder="james@example.com"
//             />

//           </div>

//           <button
//             class="submit-btn"
//             onclick="sendResetLink()"
//           >
//             Send Reset Link
//           </button>

//           <div style="margin-top:15px;text-align:center">

//             <a
//               style="cursor:pointer;color:var(--green)"
//               onclick="goTo('login')"
//             >
//               Back to Login
//             </a>

//           </div>

//         </div>

//       </div>

//     </div>

//   </div>
//   `;
// }

async function resetPassword(token) {

  const newPassword =
    document.getElementById("new-password").value;

  try {

    const response = await fetch(
      "http://localhost:8080/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          newPassword
        })
      }
    );

    const data = await response.text();

    showAlert("reset-success", data, "success");

    setTimeout(() => {
      goTo("login");
    }, 2000);

  } catch (err) {

    showAlert(
      "reset-error",
      "Password reset failed"
    );
  }
}