const structure = [
  {
    'folder': true,
    'title': 'Films',
    'children': [
      {
        'title': 'Iron Man.avi'
      },
      {
        'folder': true,
        'title': 'Fantasy',
        'children': [
          {
            'title': 'The Lord of the Rings.avi'
          },
          {
            'folder': true,
            'title': 'New folder 1',
            'children': false
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Documents',
    'children': [
      {
        'folder': true,
        'title': 'EPAM Homework answers',
        'children': null
      }
    ]
  }
];

const rootNode = document.getElementById('root');
const fileTree = document.createElement('ul');

renderStructure(structure, fileTree);
rootNode.appendChild(fileTree)

function renderStructure(object, parent) {
  for (let i = 0; i < object.length; i++) {
    const img = document.createElement('i');
    const p = document.createElement('p');
    const li = document.createElement('li');
    const ul = document.createElement('ul');

    img.className = 'material-icons';
    if (object[i].folder) {
      img.innerText = 'folder';
      img.classList.add('folder');
    } else {
      img.innerText = 'insert_drive_file';
      img.classList.add('file');
    }
    p.addEventListener('click', toggleOpen);
    p.appendChild(img);
    p.innerHTML += object[i].title;
    li.appendChild(p);
    parent.appendChild(li);
    if (object[i].children) {
      li.appendChild(ul);
      ul.classList.add('invisible');
      renderStructure(object[i].children, ul);
    }
    if (object[i].folder && !object[i].children) {
      const empty = document.createElement('p');
      empty.innerText = 'Folder is empty';
      empty.classList.add('empty', 'invisible');
      li.appendChild(empty);
    }
  }
}

function toggleOpen(e) {
  const sibling = e.target.nextSibling;
  if (sibling && sibling.classList.contains('invisible')) {
    sibling.classList.toggle('visible');
    sibling.classList.toggle('invisible');
    e.target.firstChild.innerText = 'folder_open';
  } else if (sibling) {
    sibling.classList.toggle('visible');
    sibling.classList.toggle('invisible');
    e.target.firstChild.innerText = 'folder';
  }
}