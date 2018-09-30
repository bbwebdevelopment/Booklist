// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {}
// add book to list in UI
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // create tr element
  const row = document.createElement('tr');

  // insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  // appending to the tbody 
  list.appendChild(row)
  
}

// show alert
UI.prototype.showAlert = function(message, className) {
  //  create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  // get form
  const form = document.querySelector('#book-form');
  // insert alert 
  container.insertBefore(div, form);

  // Set Timeout 3 secs

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}
// clear all input fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // getting form values 
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  isbn = document.getElementById('isbn').value;

  // instantiate book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // add book to list
  ui.addBookToList(book);

   // show success
   ui.showAlert('book added!', 'success');

  // clear fields
  ui.clearFields();
  }

  
// default action is submit on Form prevent this below
  e.preventDefault();
});

// event listener for delete 
document.getElementById('book-list').addEventListener('click', function(e){
  ui = new UI();

  ui.deleteBook(e.target);

  //show message

  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
})