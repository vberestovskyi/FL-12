const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $item = $(".item");

let todos = [];

// Display data from local storage, if available
if (localStorage.getItem("todoApp")) {
  todos = JSON.parse(localStorage.getItem("todoApp"));
  $(todos).each((i, elem) => {
    let done = elem.done ? 'done' : '';
    let listItem = `<li class="item"><span class="item-text ${done}">${elem.text}</span>
      <button class="item-remove">Delete</button></li>`;
    $(".list").append(listItem);
  })
}

// Add a task
$add.click(function (e) {
  e.preventDefault();
  let getInput = $input.val();
  if (!getInput) {
    alert('Ooops... You forgot to add a task name :-)');
  } else {
    let todoItem = { text: getInput, done: false };
    todos.push(todoItem);
    let listItem = `<li class="item"><span class="item-text">${getInput}</span>
      <button class="item-remove">Delete</button></li>`;
    $(".list").append(listItem);
    localStorage.setItem("todoApp", JSON.stringify(todos));
    $input.val("");
  }
});

// Switching "done" and "not done" status of a task
$(document).on("click", ".item-text", function () {
  $(this).toggleClass("done");
  let i = $list.children().index($(this).parent());
  if (todos[i].done) {
    todos[i].done = false;
  } else {
    todos[i].done = true;
  }
  localStorage.setItem("todoApp", JSON.stringify(todos));
});

// Delete a task
$list.on("click", ".item-remove", function (e) {
  e.preventDefault();
  let i = $list.children().index($(this).parent());
  $(this).parent().remove();
  todos.splice(i, 1);
  localStorage.setItem("todoApp", JSON.stringify(todos));
});

// Task search
$("#search-button").click(e => {
  let value = $("#search-input").val();
  e.preventDefault();
  if (!value) {
    alert('Ooops... You forgot to fill the search input :-)');
  } else {
    $(todos).each(() => {
      $(`.item-text:not(:contains(${value}))`).parent().hide(1000, 'linear', () => {
        $(`.item-text:not(:contains(${value}))`).parent().show(2000, 'linear');
      });
    });
  }
});
