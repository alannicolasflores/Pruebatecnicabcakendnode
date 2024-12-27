const userTable = document.getElementById('userTable');
const userForm = document.getElementById('userForm');
const editForm = document.getElementById('editForm');
const editId = document.getElementById('editId');

// Mostrar sección
function showSection(section) {
  document.querySelectorAll('div[id]').forEach(div => div.classList.add('d-none'));
  document.getElementById(section).classList.remove('d-none');

  if (section === 'list') {
    loadUsers(); // Cargar usuarios si se abre la lista
  }
}

// Cargar usuarios
async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Error al cargar usuarios');

    const users = await response.json();
    userTable.innerHTML = ''; // Limpiar tabla

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.email}</td>
        <td>
          <img src="/uploads/${user.imagen_perfil || 'placeholder.jpg'}" alt="Perfil" class="img-thumbnail" width="50">
        </td>
        <td>
          <button class="btn btn-warning btn-sm" onclick='loadEditForm(${JSON.stringify(user)})'>Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Eliminar</button>
        </td>
      `;
      userTable.appendChild(row);
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    alert('Error al cargar usuarios.');
  }
}

// Crear usuario
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(userForm);

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Usuario creado exitosamente');
      userForm.reset();
      showSection('menu');
    } else {
      alert('Error al crear usuario.');
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    alert('Error al conectar con el servidor.');
  }
});

// Precargar datos para edición
function loadEditForm(user) {
  showSection('edit');
  editId.value = user.id;
  document.getElementById('editNombre').value = user.nombre;
  document.getElementById('editApellido').value = user.apellido;
  document.getElementById('editEmail').value = user.email;
}

// Actualizar usuario
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(editForm);
  const id = editId.value;

  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      alert('Usuario actualizado exitosamente');
      showSection('list');
      loadUsers();
    } else {
      alert('Error al actualizar usuario.');
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    alert('Error al conectar con el servidor.');
  }
});

// Eliminar usuario
async function deleteUser(id) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });

      if (response.ok) {
        alert('Usuario eliminado exitosamente');
        loadUsers();
      } else {
        alert('Error al eliminar usuario.');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor.');
    }
  }
}

// Inicialización
showSection('menu');
