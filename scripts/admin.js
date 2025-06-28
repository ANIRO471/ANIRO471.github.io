document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });

  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    loadFeedbacks();
    loadGallery();
    loadBarbers();
  });

  // --- FEEDBACKS ---

  const feedbackList = document.getElementById('feedback-list');

  function starRating(rating) {
    // Retorna as estrelas preenchidas 🌟 e vazias ☆
    const maxStars = 5;
    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
      stars += i <= rating ? '🌟' : '☆';
    }
    return stars;
  }

  function loadFeedbacks() {
    db.collection('feedbacks').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      feedbackList.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.classList.add('feedback-item');
        div.innerHTML = `
          <strong>${data.name}</strong> - <span class="stars">${starRating(data.rating)}</span><br/>
          <p>${data.comment}</p>
          <button class="delete-feedback" data-id="${doc.id}">Excluir</button>
        `;
        feedbackList.appendChild(div);
      });

      // Adiciona eventos aos botões de excluir
      document.querySelectorAll('.delete-feedback').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Excluir feedback?')) {
            const id = btn.getAttribute('data-id');
            db.collection('feedbacks').doc(id).delete();
          }
        };
      });
    });
  }

  // --- GALERIA ---

  const galleryList = document.getElementById('gallery-list');
  const galleryUpload = document.getElementById('gallery-upload');
  const uploadGalleryBtn = document.getElementById('upload-gallery-btn');

  function loadGallery() {
    db.collection('gallery').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      galleryList.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.innerHTML = `
          <img src="${data.url}" alt="Foto da galeria" />
          <button class="delete-gallery" data-id="${doc.id}">Excluir</button>
        `;
        galleryList.appendChild(div);
      });

      document.querySelectorAll('.delete-gallery').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Excluir foto da galeria?')) {
            const id = btn.getAttribute('data-id');
            // Exclui do Firestore
            db.collection('gallery').doc(id).get().then(docSnap => {
              if (docSnap.exists) {
                const url = docSnap.data().url;
                // Exclui do Storage
                storage.refFromURL(url).delete()
                  .then(() => db.collection('gallery').doc(id).delete())
                  .catch(console.error);
              }
            });
          }
        };
      });
    });
  }

  uploadGalleryBtn.addEventListener('click', () => {
    const files = galleryUpload.files;
    if (files.length === 0) return alert('Selecione fotos para enviar.');

    Array.from(files).forEach(file => {
      const storageRef = storage.ref(`gallery/${Date.now()}_${file.name}`);
      storageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          db.collection('gallery').add({
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
      }).catch(console.error);
    });

    galleryUpload.value = '';
  });

  // --- BARBEIROS ---

  const barberForm = document.getElementById('barber-form');
  const barberList = document.getElementById('barber-list');

  barberForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('barber-name').value.trim();
    const photo = document.getElementById('barber-photo').value.trim();

    if (!name) return alert('Nome do barbeiro é obrigatório.');

    // Verifica se já existe barbeiro com esse nome para atualizar
    db.collection('barbers').where('name', '==', name).get()
      .then(snapshot => {
        if (!snapshot.empty) {
          // Atualiza o primeiro documento encontrado
          const docId = snapshot.docs[0].id;
          return db.collection('barbers').doc(docId).update({ photo });
        } else {
          // Adiciona novo barbeiro
          return db.collection('barbers').add({ name, photo });
        }
      })
      .then(() => {
        barberForm.reset();
      })
      .catch(console.error);
  });

  function loadBarbers() {
    db.collection('barbers').orderBy('name').onSnapshot(snapshot => {
      barberList.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.classList.add('barber-item');
        div.innerHTML = `
          <img src="${data.photo || 'https://via.placeholder.com/100?text=Sem+Foto'}" alt="${data.name}" />
          <p>${data.name}</p>
          <button class="delete-barber" data-id="${doc.id}">Excluir</button>
        `;
        barberList.appendChild(div);
      });

      document.querySelectorAll('.delete-barber').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Excluir barbeiro?')) {
            const id = btn.getAttribute('data-id');
            db.collection('barbers').doc(id).delete();
          }
        };
      });
    });
  }
});
              document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });

  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    loadFeedbacks();
    loadGallery();
    loadBarbers();
  });

  // --- FEEDBACKS ---

  const feedbackList = document.getElementById('feedback-list');

  function starRating(rating) {
    // Retorna as estrelas preenchidas 🌟 e vazias ☆
    const maxStars = 5;
    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
      stars += i <= rating ? '🌟' : '☆';
    }
    return stars;
  }

  function loadFeedbacks() {
    db.collection('feedbacks').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      feedbackList.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.classList.add('feedback-item');
        div.innerHTML = `
          <strong>${data.name}</strong> - <span class="stars">${starRating(data.rating)}</span><br/>
          <p>${data.comment}</p>
          <button class="delete-feedback" data-id="${doc.id}">Excluir</button>
        `;
        feedbackList.appendChild(div);
      });

      // Adiciona eventos aos botões de excluir
      document.querySelectorAll('.delete-feedback').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Excluir feedback?')) {
            const id = btn.getAttribute('data-id');
            db.collection('feedbacks').doc(id).delete();
          }
        };
      });
    });
  }

  // --- GALERIA ---

  const galleryList = document.getElementById('gallery-list');
  const galleryUpload = document.getElementById('gallery-upload');
  const uploadGalleryBtn = document.getElementById('upload-gallery-btn');

  function loadGallery() {
    db.collection('gallery').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      galleryList.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.innerHTML = `
          <img src="${data.url}" alt="Foto da galeria" />
          <button class="delete-gallery" data-id="${doc.id}">Excluir</button>
        `;
        galleryList.appendChild(div);
      });

      document.querySelectorAll('.delete-gallery').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Excluir foto da galeria?')) {
            const id = btn.getAttribute('data-id');
            // Exclui do Firestore
            db.collection('gallery').doc(id).get().then(docSnap => {
              if (docSnap.exists) {
                const url = docSnap.data().url;
                // Exclui do Storage
                storage.refFromURL(url).delete()
                  .then(() => db.collection('gallery').doc(id).delete())
                  .catch(console.error);
              }
            });
          }
        };
      });
    });
  }

  uploadGalleryBtn.addEventListener('click', () => {
    const files = galleryUpload.files;
    if (files.length === 0) return alert('Selecione fotos para enviar.');

    Array.from(files).forEach(file => {
      const storageRef = storage.ref(`gallery/${Date.now()}_${file.name}`);
      storageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          db.collection('gallery').add({
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
      }).catch(console.error);
    });

    galleryUpload.value = '';
  });

  // --- BARBEIROS ---

  const barberForm = document.getElementById('barber-form');
  const barberList = document.getElementById('barber-list');

  barberForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('barber-name').value.trim();
    const photo = document.getElementById('barber-photo').value.trim();

    if (!name) return alert('Nome do barbeiro é obrigatório.');

    // Verifica se já existe barbeiro com esse nome para atualizar
    db.collection('barbers').where('name', '==', name).get()
      .then(snapshot => {
        if (!snapshot.empty) {
          // Atualiza o primeiro documento encontrado
          const docId = snapshot.docs[0].id;
          return db.collection('barbers').doc(docId).update({ photo });
        } else {
          // Adiciona novo barbeiro
          return db.collection('barbers').add({ name, photo });
        }
      })
      .then(() => {
        barberForm.reset();
      })
      .catch(console.error);
  });

  function loadBarbers() {
    db.collection('barbers').orderBy('name').onSnapshot(snapshot => {
      barberList.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.classList.add('barber-item');
        div.innerHTML = `
          <img src="${data.photo || 'https://via.placeholder.com/100?text=Sem+Foto'}" alt="${data.name}" />
          <p>${data.name}</p>
          <button class="delete-barber" data-id="${doc.id}">Excluir</button>
        `;
        barberList.appendChild(div);
      });

      document.querySelectorAll('.delete-barber').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Excluir barbeiro?')) {
            const id = btn.getAttribute('data-id');
            db.collection('barbers').doc(id).delete();
          }
        };
      });
    });
  }
});
