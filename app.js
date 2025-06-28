// app.js

// SEU UID fixo de admin
const adminUID = "oUGyxwwemggeIdFtlp49Xe0mvSP2";

// LOGIN
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
      const uid = cred.user.uid;

      if (uid === adminUID) {
        // Se for o admin, manda pro painel
        window.location.href = "admin.html";
      } else {
        // Senão, redireciona pra home ou faz outra lógica
        alert("Login feito! Mas você não é admin.");
        window.location.href = "index.html";
      }
    })
    .catch(err => {
      alert(err.message);
    });
});

// CADASTRO
document.getElementById("registerBtn")?.addEventListener("click", () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        email: email,
        role: cred.user.uid === adminUID ? "admin" : "user"
      });
    })
    .then(() => {
      alert("Cadastrado com sucesso! Faça login.");
    })
    .catch(err => {
      alert(err.message);
    });
});

// PROTEÇÃO NO PAINEL ADMIN
if (window.location.pathname.includes("admin.html")) {
  auth.onAuthStateChanged(user => {
    if (user && user.uid === adminUID) {
      console.log("Admin autenticado");
    } else {
      alert("Acesso negado! Você não é o admin.");
      window.location.href = "index.html";
    }
  });

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  });
}
