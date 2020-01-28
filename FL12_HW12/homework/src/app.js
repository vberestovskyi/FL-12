const container = document.getElementById('root');
const page = getHash('page');
let setsList = [];
let studiedSetsList = [];

if (localStorage.getItem('list')) {
  setsList = JSON.parse(localStorage.getItem('list'));
}
if (localStorage.getItem('studiedList')) {
  studiedSetsList = JSON.parse(localStorage.getItem('studiedList'));
}
if (!page) {
  buildMain();
} else if (page === 'add' || page === 'modify') {
  buildEdit();
}

window.addEventListener('hashchange', () => {
  const page = getHash('page');
  if (!page) {
    changePage('main');
  } else if (page === 'add' || page === 'modify') {
    changePage('edit');
  }
});

function createAddnewBtn() {
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btnContainer');
  const button = document.createElement('button');
  button.innerHTML = 'Add new';
  button.addEventListener('click', () => {
    location.hash = '/add';
  });
  btnContainer.appendChild(button);
  return btnContainer;
}

function createList() {
  const list = document.createElement('ul');
  list.classList.add('list');
  const createItem = (set, studied = null) => {
    const item = document.createElement('li');
    const text = document.createElement('p');
    const btnBox = document.createElement('div');
    const btnEdit = document.createElement('button');
    const btnRemove = document.createElement('button');
    item.classList.add('list_item');
    text.innerHTML = `${set.term} — ${set.description}`;
    item.appendChild(text);
    item.appendChild(btnBox);
    btnEdit.innerHTML = 'Edit';
    btnEdit.addEventListener('click', (event) => {
      event.stopPropagation();
      location.hash = '/modify/:' + set.id;
    });
    btnBox.appendChild(btnEdit);
    btnRemove.innerHTML = 'Remove';
    btnRemove.addEventListener('click', (event) => {
      event.stopPropagation();
      setsList = setsList.filter(item => item.id !== set.id);
      studiedSetsList = studiedSetsList.filter(item => item.id !== set.id);
      saveStorage();
      changePage('main');
    });
    btnBox.appendChild(btnRemove);
    if (studied) {
      item.classList.add(studied);
    } else {
      item.addEventListener('click', () => {
        studiedSetsList.push(set);
        setsList = setsList.filter(item => item.id !== set.id);
        saveStorage();
        changePage('main');
      });
    }
    return item;
  };
  setsList.forEach(set => {
    list.appendChild(createItem(set));
  });
  studiedSetsList.forEach(set => {
    list.appendChild(createItem(set, 'studied'));
  });
  return list;
}

function buildMain() {
  const main = document.createElement('div');
  main.appendChild(createAddnewBtn());
  main.appendChild(createList());
  container.appendChild(main);
}

function buildEdit() {
  let term;
  let description;
  const page = getHash('page');
  const setId = getHash('setId');
  const edit = document.createElement('div');
  const termInput = document.createElement('input');
  const btnSave = document.createElement('button');
  const btnCancel = document.createElement('button');
  const descriptionInput = document.createElement('input');
  termInput.placeholder = 'Enter term';
  if (page === 'modify') {
    term = getData(setId, 'term');
    termInput.value = term;
  }
  termInput.addEventListener('input', (event) => {
    term = event.target.value;
  });
  edit.appendChild(termInput);
  descriptionInput.placeholder = 'Enter description';
  if (page === 'modify') {
    description = getData(setId, 'description');
    descriptionInput.value = description;
  }
  descriptionInput.addEventListener('input', (event) => {
    description = event.target.value;
  });
  edit.appendChild(descriptionInput);
  btnSave.innerHTML = 'Save';
  btnSave.addEventListener('click', () => {
    if (term && description) {
      if (page === 'add') {
        setsList.push({ id: getNewId(), term: term, description: description });
      } else if (page === 'modify') {
        setsList = setsList.map(item =>
          item.id === setId ? { id: item.id, term: term, description: description } : item);
        studiedSetsList = studiedSetsList.map(item =>
          item.id === setId ? { id: item.id, term: term, description: description } : item);
      }
      saveStorage();
      location.hash = '';
    }
  });
  edit.appendChild(btnSave);
  btnCancel.innerHTML = 'Cancel';
  btnCancel.addEventListener('click', () => {
    location.hash = '';
  });
  edit.appendChild(btnCancel);
  container.appendChild(edit);
}

function changePage(page) {
  for (const i of container.children) {
    container.removeChild(i);
  }
  if (page === 'main') {
    buildMain();
  } else if (page === 'edit') {
    buildEdit();
  }
}

function saveStorage() {
  localStorage.setItem('list', JSON.stringify(setsList));
  localStorage.setItem('studiedList', JSON.stringify(studiedSetsList));
}

function getHash(name) {
  const hash = location.hash.split('/');
  const pageNum = 1;
  const setIdNum = 2;
  if (name === 'page') {
    return hash[pageNum] ? hash[pageNum] : null;
  } else if (name === 'setId') {
    return hash[setIdNum] ? Number(hash[setIdNum].slice(1)) : null;
  }
}

function getData(id, name) {
  let result;
  setsList.forEach(item => {
    if (item.id === id) {
      result = item[name];
    }
  });
  studiedSetsList.forEach(item => {
    if (item.id === id) {
      result = item[name];
    }
  });
  return result;
}

function getNewId() {
  let id = 0;
  id = setsList.reduce((max, item) => item.id > max ? item.id : max, id);
  id = studiedSetsList.reduce((max, item) => item.id > max ? item.id : max, id);
  return id + 1;
}