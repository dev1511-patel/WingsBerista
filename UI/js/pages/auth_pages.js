function renderLogin(){
  return `<div class="page">
  <div class="auth-page">
    <div class="auth-split">
      <div class="auth-left">
        <div class="auth-brand">Wings<span>Berista</span></div>
        <div class="auth-tagline">UK's freshest burgers, pizza & crispy chicken. Order online in seconds.</div>
        <div class="auth-perks">
          <div class="auth-perk"><div class="perk-dot"></div>Track your order in real-time</div>
          <div class="auth-perk"><div class="perk-dot"></div>Save your favourite orders</div>
          <div class="auth-perk"><div class="perk-dot"></div>Exclusive deals for members</div>
          <div class="auth-perk"><div class="perk-dot"></div>Fast checkout every time</div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-title">Welcome Back</div>
        <div class="auth-sub">Don't have an account? <a onclick="goTo('signup')">Sign up free</a></div>

        <div class="alert-box error" id="login-error"></div>
        <div class="alert-box success" id="login-success"></div>

        <div class="form-group">
          <label>Email Address</label>
          <input type="email" id="login-email" placeholder="james@example.com" oninput="clearLoginError()"/>
          <div class="field-error" id="err-login-email">Please enter a valid email</div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <div class="password-wrap">
            <input type="password" id="login-password" placeholder="Enter your password" oninput="clearLoginError()"/>
            <button class="eye-btn" onclick="togglePwd('login-password',this)" type="button">👁</button>
          </div>
          <div class="field-error" id="err-login-password">Password is required</div>
        </div>

        <button class="submit-btn" onclick="doLogin()" id="login-btn">Login to My Account</button>
<div style="text-align:right;margin-top:10px">
  <a onclick="goTo('forgot-password')"
     style="font-size:13px;color:var(--primary);cursor:pointer">
     Forgot Password?
  </a>
</div>
        <div class="auth-divider">or</div>
        <div style="text-align:center;font-size:12px;color:var(--muted)">
          Admin? Use your admin credentials to access the Admin Panel.
        </div>
      </div>
    </div>
  </div>
  </div>`;
}

function renderSignup(){
  return `<div class="page">
  <div class="auth-page">
    <div class="auth-split">
      <div class="auth-left">
        <div class="auth-brand">Wings<span>Berista</span></div>
        <div class="auth-tagline">Join thousands of happy customers. Fresh food, fast delivery, amazing taste.</div>
        <div class="auth-perks">
          <div class="auth-perk"><div class="perk-dot"></div>Free to join — always</div>
          <div class="auth-perk"><div class="perk-dot"></div>Order history & reordering</div>
          <div class="auth-perk"><div class="perk-dot"></div>Save multiple addresses</div>
          <div class="auth-perk"><div class="perk-dot"></div>Members-only promotions</div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-title">Create Account</div>
        <div class="auth-sub">Already have an account? <a onclick="goTo('login')">Login here</a></div>

        <div class="alert-box error" id="signup-error"></div>
        <div class="alert-box success" id="signup-success"></div>

        <div class="form-group">
          <label>Account Type</label>
          <div class="role-pills">
            <div class="role-pill sel" id="role-customer" onclick="selectRole('CUSTOMER')">🛒 Customer</div>
            <div class="role-pill" id="role-admin" onclick="selectRole('ADMIN')">🔑 Admin</div>
          </div>
          <div class="admin-note" id="admin-note">
            ⚠️ Admin accounts require an <strong>Admin Secret Key</strong> provided by the shop owner.
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" id="signup-fname" placeholder="James"/>
            <div class="field-error" id="err-fname">First name required</div>
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" id="signup-lname" placeholder="Harper"/>
            <div class="field-error" id="err-lname">Last name required</div>
          </div>
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <input type="email" id="signup-email" placeholder="james@example.com"/>
          <div class="field-error" id="err-semail">Valid email required</div>
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" id="signup-phone" placeholder="+44 7700 900123"/>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="password-wrap">
            <input type="password" id="signup-password" placeholder="Min 8 characters" oninput="checkPasswordStrength()"/>
            <button class="eye-btn" onclick="togglePwd('signup-password',this)" type="button">👁</button>
          </div>
          <div class="field-error" id="err-spassword">Min 8 characters required</div>
          <div id="pwd-strength" style="margin-top:6px;font-size:11px;font-weight:700"></div>
        </div>

        <div class="form-group" id="admin-key-group" style="display:none">
          <label>Admin Secret Key</label>
          <input type="password" id="signup-admin-key" placeholder="Enter admin secret key"/>
          <div class="field-error" id="err-admin-key">Admin key required for admin accounts</div>
        </div>

        <button class="submit-btn" onclick="doSignup()" id="signup-btn">Create My Account</button>
      </div>
    </div>
  </div>
  </div>`;
}

function renderForgotPassword() {
  return `
  <div class="page">
    <div class="auth-page">
      <div class="auth-split">

        <div class="auth-left">
          <div class="auth-brand">Wings<span>Berista</span></div>

          <div class="auth-tagline">
            Forgot your password?
            No worries — we'll help you reset it securely.
          </div>
        </div>

        <div class="auth-right">

          <div class="auth-title">Reset Password</div>

          <div class="auth-sub">
            Enter your registered email address
          </div>

          <div class="alert-box error" id="forgot-error"></div>
          <div class="alert-box success" id="forgot-success"></div>

          <div class="form-group">
            <label>Email Address</label>

            <input
              type="email"
              id="forgot-email"
              placeholder="james@example.com"
            />
          </div>

          <button
            class="submit-btn"
            onclick="sendResetLink()"
            id="forgot-btn"
          >
            Send Reset Link
          </button>

          <div style="margin-top:15px;text-align:center">
            <a onclick="goTo('login')"
               style="cursor:pointer;color:var(--primary)">
               Back to Login
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
  `;
}

function renderResetPassword(token) {

  return `
  <div class="page">
    <div class="auth-page">
      <div class="auth-split">

        <div class="auth-left">
          <div class="auth-brand">Wings<span>Berista</span></div>

          <div class="auth-tagline">
            Create your new secure password.
          </div>
        </div>

        <div class="auth-right">

          <div class="auth-title">Create New Password</div>

          <div class="alert-box error" id="reset-error"></div>
          <div class="alert-box success" id="reset-success"></div>

          <div class="form-group">
            <label>New Password</label>

            <div class="password-wrap">
              <input
                type="password"
                id="new-password"
                placeholder="Enter new password"
              />

              <button
                class="eye-btn"
                onclick="togglePwd('new-password',this)"
                type="button"
              >
                👁
              </button>
            </div>
          </div>

          <button
            class="submit-btn"
            onclick="resetPassword('${token}')"
          >
            Update Password
          </button>

        </div>
      </div>
    </div>
  </div>
  `;
}

function renderAccessDenied(){
  return `<div class="page">
  <div class="access-denied">
    <div class="ad-icon">🔒</div>
    <div class="ad-title">Admin Only</div>
    <p class="ad-msg">This area is restricted to WingsBerista staff only.<br>Please log in with an admin account to continue.</p>
    <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-top:1rem">
      <button class="btn-primary" onclick="goTo('login')">Login as Admin</button>
      <button class="btn-outline" style="color:#fff" onclick="goTo('home')">Back to Home</button>
    </div>
    <div style="margin-top:2rem;background:rgba(255,255,255,.05);border-radius:12px;padding:1.5rem;max-width:400px;width:100%;font-size:13px;color:#666;line-height:1.8">
      <strong style="color:#888">Demo Admin Credentials:</strong><br>
      Email: admin@wingsberista.co.uk<br>
      Password: admin123
    </div>
  </div>
  </div>`;
}