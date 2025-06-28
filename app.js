// app.js

// LOGIN
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(cred => {
      // Checa papel
      const uid = cred.user.uid;
      firebase.firestore().collection("users").doc(uid).get()
        .then(doc => {
          if (doc.exists) {
            if (doc.data().role === "admin") {
              window.location.href = "admin.html";
            } else {
              alert("Login realizado com sucesso!");
              // Aqui você pode redirecionar para uma área de usuário comum
            }
          }
        });
    })
    .catch(err => {
      alert(err.message);
    });
});

// CADASTRO
document.getElementById("registerBtn").addEventListener("click", () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // Salva no Firestore
      return firebase.firestore().collection("users").doc(cred.user.uid).set({
        email: email,
        role: "user" // Por padrão, todo mundo é user
      });
    })
    .then(() => {
      alert("Cadastrado com sucesso!");
    })
    .catch(err => {
      alert(err.message);
    });
});
