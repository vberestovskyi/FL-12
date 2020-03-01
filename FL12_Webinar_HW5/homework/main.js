document.addEventListener('DOMContentLoaded', getUsers);
const root = document.querySelector('#root');
let usersArr;

//! Function getUsers()
function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      usersArr = users;
      users.forEach(user => displayUser(user))
    });

}

//! Function displayUser
function displayUser(user) {
  location.hash = '#root';

  const userList = document.createElement('ul');
  userList.setAttribute('id', `user${user.id}`);
  userList.setAttribute('data-id', user.id);
  userList.setAttribute('title', "Person's details");


  const avatar = document.createElement('img');
  avatar.setAttribute('id', `avatar${user.id}`);
  //avatar.setAttribute('src', `http://placekitten.com/g/200/300`);
  getAvatar(user.id);
  userList.appendChild(avatar);

  const name = document.createElement('li');
  name.textContent = `Name - ${user.name}`;
  name.addEventListener('click', showPosts);
  userList.appendChild(name);

  const username = document.createElement('li');
  username.textContent = `Username - ${user.username}`;
  userList.appendChild(username);

  const email = document.createElement('li');
  email.textContent = `Email - ${user.email}`;
  userList.appendChild(email);

  const phone = document.createElement('li');
  phone.textContent = `Phone - ${user.phone}`;
  userList.appendChild(phone);

  const website = document.createElement('li');
  website.textContent = `Website - ${user.website}`;
  userList.appendChild(website);

  const editButton = document.createElement('button');
  editButton.setAttribute('type', 'button');
  editButton.innerText = 'Edit user';
  editButton.addEventListener('click', editUser);
  userList.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.innerText = 'Delete user';
  deleteButton.addEventListener('click', deleteUser);
  userList.appendChild(deleteButton);

  root.appendChild(userList);
}

//!Function editUser
function editUser(event) {
  showSpinner(`#${event.target.parentNode.id}`);
  location.hash = '#edit';
  root.innerHTML = '';
  const userId = Number(event.target.parentNode.dataset.id);
  const user = usersArr.find(user => user.id === userId);
  const userList = document.createElement('form');
  userList.setAttribute('id', `user${user.id}`);
  userList.setAttribute('data-id', user.id);
  userList.setAttribute('title', "Person's details");
  userList.addEventListener('submit', saveChanges)

  const avatar = document.createElement('img');
  avatar.setAttribute('id', `avatar${user.id}`);
  //vatar.setAttribute('src', `http://placekitten.com/g/200/300`);
  getAvatar(user.id);
  userList.appendChild(avatar);

  const name = document.createElement('div');
  name.innerHTML = `
    <label for="name">Name</label> <br>
    <input type="text" id="name" name="name" value="${user.name}">
  `;
  userList.appendChild(name);

  const username = document.createElement('div');
  username.innerHTML = `
    <label for="name">Username</label> <br>
    <input type="text" id="username" name="username" value="${user.username}">
  `;
  userList.appendChild(username);

  const email = document.createElement('div');
  email.innerHTML = `
    <label for="name">Email</label> <br>
    <input type="text" id="email" name="email" value="${user.email}">
  `;
  userList.appendChild(email);

  const phone = document.createElement('div');
  phone.innerHTML = `
  <label for="phone">Phone</label> <br>
  <input type="text" id="phone" name="phone" value="${user.phone}">
  `;
  userList.appendChild(phone);

  const website = document.createElement('div');
  website.innerHTML = `
  <label for="name">Website</label> <br>
  <input type="text" id="website" name="website" value="${user.website}">
  `;
  userList.appendChild(website);

  const saveUser = document.createElement('input');
  saveUser.setAttribute('type', 'submit');
  saveUser.setAttribute('value', 'Save changes');
  userList.appendChild(saveUser);

  root.appendChild(userList);
}

//! Function saveChanges
function saveChanges(event) {
  event.preventDefault();
  const userID = event.target.dataset.id;
  const inputs = event.target.elements;
  const updatedUser = {};
  updatedUser.id = userID;
  for (const input of inputs) {
    if (input.id) {
      updatedUser[input.id] = input.value;
    };
  };
  showSpinner(`#${event.target.id}`);

  fetch(`https://jsonplaceholder.typicode.com/users/${userID}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
       showSpinner(`#${event.target.id}`);
    })


}

//!function DeleteUser
function deleteUser(event) {
  event.preventDefault();
  showSpinner(`#${event.target.parentNode.id}`);

  const userList = document.querySelector(`#${event.target.parentNode.id}`);

  const id = event.target.parentNode.id.replace('#user', '');
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.status === 200) {
        userList.remove();
        console.log('User has been deleted');
      } else {
        console.log(`Error: ${response.status}`);
      }
    })


  //console.log(event.target.parentNode.dataset.id);
}


// let output = '<h2>Users</h2>';
// users.forEach(user => {
//   output += `
//   <ul title="Person's details">
//   <li>${user.id}</li>
//   <li>${user.name}</li>
//   <li>${user.username}</li>
//   <li>${user.email}</li>
//   <li>${user.phone}</li>
//   <li>${user.website}</li>
//   <button type="button" class="btn btn-success editBtn editPersonal">Edit</button>
// </ul>
// <ul title="Address">
//   <li>${user.address.street}</li>
//   <li>${user.address.suite}</li>
//   <li>${user.address.city}</li>
//   <li>${user.address.zipcode}</li>
//   <button type="button" class="btn btn-success editBtn editAdress">Edit</button>
// </ul>
// <ul title="Geo">
//   <li>${user.address.geo.lat}</li>
//   <li>${user.address.geo.lng}</li>
//   <button type="button" class="btn btn-success editBtn editGeo">Edit</button>
// </ul>

// <ul title="Company">
//   <li>${user.company.name}</li>
//   <li>${user.company.catchPhrase}</li>
//   <li>${user.company.bs}</li>
//   <button type="button" class="btn btn-success editBtn editCompany">Edit</button>
// </ul>
// <button type="button" class="btn btn-danger deleteBtn">Delete</button>
//   `;

// });

// document.querySelectorAll('.editBtn').forEach(node => node.addEventListener('click', editUser));
//! function ShowPosts
function showPosts(event) {
  document.querySelector('#root').style.display = 'none';
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${event.target.parentNode.dataset.id}`)
    .then(response => response.json())
    .then(posts => userPosts(posts))
}

//! function userPosts
function userPosts(data) {
  let container = document.createElement('div');
  container.setAttribute('id', `user${data[0].userId}_posts`);
  document.body.appendChild(container);
  location.hash = `#user${data[0].userId}_posts`;

  data.forEach(post => {
    const article = document.createElement('article');
    article.setAttribute('id', `post${post.id}`);
    article.innerHTML = `<h3>Post ${post.id}: </h3>`;

    const header = document.createElement('h4');
    header.textContent = post.header;

    const paragraph = document.createElement('p');
    paragraph.textContent = post.body;

    article.appendChild(header);
    article.appendChild(paragraph);
    userComments(article);
    container.appendChild(article);
  });
}

//! function userComments
function userComments(article) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${article.getAttribute('id').replace('post', '')}/comments`)
    .then(response => response.json())
    .then(comments => {
      const content = document.createElement('div');
      content.setAttribute('class', 'comments');
      comments.forEach(comment => {
        const container = document.createElement('div');
        container.setAttribute('class', 'container');
        container.innerHTML = `<h4>Comment ${comment.id}: </h4>`;

        const nameDiv = document.createElement('div');
        nameDiv.setAttribute('class', 'name');
        nameDiv.textContent = `Name: ${comment.name}`;
        container.appendChild(nameDiv);

        const emailDiv = document.createElement('div');
        emailDiv.setAttribute('class', 'email');
        emailDiv.textContent = `Email: ${comment.email}`;
        container.appendChild(emailDiv);

        const text = document.createElement('p');
        text.setAttribute('class', 'text');
        text.textContent = comment.body;
        container.appendChild(text);

        article.appendChild(container);
      });
    })
}



//   })

//   root.appendChild(userList);
// }

function showSpinner(id) {
  if (!document.querySelector('.spinner')) {
    const container = document.querySelector(id);
    const spinner = document.createElement('img');
    spinner.setAttribute('src', 'img/spinner.gif');
    spinner.setAttribute('class', 'spinner');
    container.appendChild(spinner);
  } else {
    document.querySelector('.spinner').remove();
  }
}


function getAvatar(userId) {
  fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then(result => {
      const avatar = document.querySelector(`#avatar${userId}`);
      avatar.setAttribute('src', `${result[0].url}`);
      avatar.setAttribute('style', `
        max-width: 250px;
      `);
    });
}




// function editUser(event) {

//   const userID = event.target.parentNode.childNodes[1].innerText;
//   const user = users[userID];
//   let output;
//   if (event.target.classList.contains('editPersonal')) {
//     output = `
//     <form id="personal" class="form" >

//     <ul title="Person's details">

//       <li>
//         <label for="id">Id</label>
//         <input type="text" id="id" name="id" value="${user.id}" disabled>
//       </li>

//       <li>
//         <label for="name">Name</label>
//         <input type="text" id="name" name="name" value="${user.name}">
//       </li>

//       <li>
//         <label for="name">User Name</label>
//         <input type="text" id="username" name="username" value="${user.username}">
//       </li>

//       <li>
//         <label for="name">Email</label>
//         <input type="text" id="email" name="email" value="${user.email}">
//       </li>

//       <li>
//         <label for="name">Email</label>
//         <input type="text" id="email" name="email" value="${user.phone}">
//       </li>

//       <li>
//         <label for="name">Email</label>
//         <input type="text" id="email" name="email" value="${user.website}">
//       </li>

//       <input type="submit" value="Submit">
//   </form>
//     `
//   userlist.innerHTML = output;

//   document.querySelector('.form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log(e);

//     <input type="submit" value="Submit">
//     <button type="button" class="btn btn-success saveBtn">Save</button>
//     <button type="button" class="btn btn-success backBtn">Back</button>
//   </ul>





