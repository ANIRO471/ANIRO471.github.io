document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');

  const loginError = document.getElementById('login-error');
  const registerError = document.getElementById('register-error');

  showRegisterLink.addEventListener('click', e => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  showLoginLink.addEventListener('click', e => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginError.textContent = "";
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = 'admin.html';
      })
      .catch(err => {
        loginError.textContent = err.message;
      });
  });

  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    registerError.textContent = "";
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.updateProfile({ displayName: name });
      })
      .then(() => {
        window.location.href = 'admin.html';
      })
      .catch(err => {
        registerError.textContent = err.message;
      });
  });
});
