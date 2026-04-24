
  // Toggle between Sign In and Sign Up forms
  const signinTab = document.getElementById('signinTab');
  const signupTab = document.getElementById('signupTab');
  const signinForm = document.getElementById('signinForm');
  const signupForm = document.getElementById('signupForm');
  const footerText = document.getElementById('footerText');
  const footerActionLink = document.getElementById('footerActionLink');

  function setActiveForm(isSignin) {
    if (isSignin) {
      signinTab.classList.add('active');
      signupTab.classList.remove('active');
      signinForm.classList.remove('hidden-form');
      signupForm.classList.add('hidden-form');
      footerText.innerHTML = `Don't have an account? <a href="#" id="footerActionLink">Sign up for free</a>`;
      document.getElementById('footerActionLink').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveForm(false);
      });
    } else {
      signupTab.classList.add('active');
      signinTab.classList.remove('active');
      signupForm.classList.remove('hidden-form');
      signinForm.classList.add('hidden-form');
      footerText.innerHTML = `Already have an account? <a href="#" id="footerActionLink">Sign in</a>`;
      document.getElementById('footerActionLink').addEventListener('click', (e) => {
        e.preventDefault();
        setActiveForm(true);
      });
    }
  }

  // Password visibility toggle (matches theme)
  window.togglePassword = function(inputId, toggleElement) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
      input.type = 'text';
      toggleElement.textContent = '👁️‍🗨️';
    } else {
      input.type = 'password';
      toggleElement.textContent = '👁️';
    }
  };

  // Auth action handlers (demonstrate theme consistency)
  window.handleSignIn = function() {
    // In a real app: validate and authenticate
    alert('✨ Welcome back to CourseTrack! Redirecting to dashboard...');
    // Window.location.href = '/dashboard';
  };

  window.handleSignUp = function() {
    // In a real app: validate passwords, create account
    const pass1 = document.getElementById('signupPassword').value;
    const pass2 = document.getElementById('signupConfirm').value;
    
    if (pass1 !== pass2) {
      alert('⚠️ Passwords do not match');
      return;
    }
    
    alert('⌛ Account created! Welcome to CourseTrack. Redirecting to setup...');
    // Window.location.href = '/onboarding';
  };

  // Initialize tab listeners
  signinTab.addEventListener('click', () => setActiveForm(true));
  signupTab.addEventListener('click', () => setActiveForm(false));
  footerActionLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveForm(false);
  });

  // Initial state: Sign In is active
  setActiveForm(true);

  // Smooth interactive hover states match dashboard cards
  document.querySelectorAll('.social-button').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
      e.currentTarget.style.backgroundColor = '#fafbfc';
    });
    btn.addEventListener('mouseleave', (e) => {
      e.currentTarget.style.backgroundColor = 'white';
    });
  });

