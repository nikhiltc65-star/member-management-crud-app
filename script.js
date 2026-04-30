const form = document.getElementById('form');
const tableBody = document.getElementById('tableBody');

const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const designation = document.getElementById('designation');
const photo = document.getElementById('photo');

let members = JSON.parse(localStorage.getItem('members')) || [];
let editIndex = null;

function renderTable() {
  const search = document.getElementById('search').value.toLowerCase();
  tableBody.innerHTML = '';

  members
    .filter(m =>
      m.first_name.toLowerCase().includes(search) ||
      m.last_name.toLowerCase().includes(search) ||
      m.email.toLowerCase().includes(search)
    )
    .forEach((m, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${m.photo ? `<img src="${m.photo}" width="40">` : 'No Image'}</td>
          <td>${m.first_name}</td>
          <td>${m.last_name}</td>
          <td>${m.email}</td>
          <td>${m.designation}</td>
          <td>
            <button onclick="editMember(${index})">Edit</button>
            <button onclick="deleteMember(${index})">Delete</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
}


form.addEventListener('submit', function(e) {
  e.preventDefault();

  const file = photo.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      saveMember(reader.result);
    };

    reader.readAsDataURL(file);

  } else {
    saveMember('');
  }
});

function saveMember(photoData) {
  const member = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    designation: designation.value,
    photo: photoData
  };

  if (editIndex === null) {
    members.push(member);
  } else {
    members[editIndex] = member;
    editIndex = null;
  }

  localStorage.setItem('members', JSON.stringify(members));
  form.reset();
  renderTable();
}


function editMember(index) {
  const m = members[index];
  first_name.value = m.first_name;
  last_name.value = m.last_name;
  email.value = m.email;
  designation.value = m.designation;
  editIndex = index;
}


function deleteMember(index) {
  members.splice(index, 1);
  localStorage.setItem('members', JSON.stringify(members));
  renderTable();
}

renderTable();
