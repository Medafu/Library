const button = document.querySelector('button');
const form = document.querySelector('form');
const cards = document.querySelector('#cards');
let idx_incr = 3;
let myLibrary = [];

function Book(idx, title, author, pages, status) {
  this.idx = idx
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.changeStatus = function() {
  if (this.status) {
    this.status = false;
  } else {
    this.status = true
  }
}

form.addEventListener('submit', addBookToLibrary)

function addBookToLibrary(event) {
  event.preventDefault();
  let idx = idx_incr
  let title = event.currentTarget.title.value;
  let author = event.currentTarget.author.value;
  let pages = event.currentTarget.pages.value;
  let status = event.currentTarget.status.checked;
  let newbook = new Book(idx, title, author, pages, status);
  myLibrary.push(newbook);
  idx_incr++;
  renderCards();
}

function handleStatusButton(event) {
  let target_idx = parseInt(event.target.dataset.idx);
  let book = myLibrary.find((el) => {
    return el.idx == target_idx
  })
  book.changeStatus()
  event.target.id = book.status ? 'btn_true' : 'btn_false'
}

function handleDeleteButton(event) {
  let target_idx = parseInt(event.target.dataset.idx);
  let book_idx = myLibrary.findIndex((el) => {
    return el.idx == target_idx
  })

  myLibrary.splice(book_idx, 1);
  renderCards();
}

function clearCards() {
  let div_list = [...cards.childNodes]
  div_list.forEach((el) => {
    cards.removeChild(el)
  })
}

function renderCards() {
  if (cards.childNodes.length != 0) {clearCards()}
  myLibrary.forEach((el) => {
    let div = document.createElement('div');
    let div_btn = document.createElement('div')
    let h3 = document.createElement('h3');
    let ul = document.createElement('ul');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let status_btn = document.createElement('button');
    let delete_btn = document.createElement('button');
    status_btn.innerHTML = "Read";
    status_btn.id = el.status ? "btn_true" : "btn_false";
    delete_btn.innerHTML = "Delete book"
    status_btn.dataset.idx = el.idx;
    delete_btn.dataset.idx = el.idx;
    status_btn.addEventListener('click', handleStatusButton);
    delete_btn.addEventListener('click', handleDeleteButton);
    div.classList.add('card');
    div_btn.appendChild(status_btn);
    div_btn.appendChild(delete_btn)
    h3.innerHTML = el.title;
    p1.innerHTML = `Author: ${el.author}`;
    p2.innerHTML = `Pages: ${el.pages}`;
    ul.appendChild(p1);
    ul.appendChild(p2);
    div.appendChild(h3);
    div.appendChild(ul);
    div.appendChild(div_btn);
    cards.appendChild(div);
  })
}

let book1 = new Book(0, 'The Hobbit', 'J.R.R. Tolkien', 291, true)
let book2 = new Book(1, 'Death on the Nile', 'Agatha Christie', 364, true)
let book3 = new Book(2, 'Alice in Wonderland', 'Lewis Carroll', 256, false)

myLibrary.push(book1, book2, book3)

renderCards()
