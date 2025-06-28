// app.js

// LOGIN
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
      const uid = cred.user.uid;

      // VERIFICAR PAPEL
      db.collection("users").doc(uid).get().then(doc => {
        if (doc.exists && doc.data().role === "admin") {
          window.location.href = "admin.html";
        } else {
          alert("Login feito!");
          // Redireciona se quiser para outra página de usuário comum
        }
      });
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
        role: "user"
      });
    })
    .then(() => {
      alert("Cadastrado com sucesso! Faça login.");
    })
    .catch(err => {
      alert(err.message);
    });
});

// VERIFICA NO PAINEL ADMIN
if (window.location.pathname.includes("admin.html")) {
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(doc => {
        if (!doc.exists || doc.data().role !== "admin") {
          alert("Acesso negado. Você não é admin.");
          window.location.href = "index.html";
        }
      });
    } else {
      window.location.href = "index.html";
    }
  });

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  });
}
