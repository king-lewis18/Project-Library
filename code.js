let myLibrary = [];

class Book {
 constructor (title, author, pages, read) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
}
}


function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook); 
    displayBooks ();
}

function displayBooks () {
   const displayContainer = document.querySelector("#display");
   displayContainer.innerHTML = "";

   myLibrary.forEach ((book, index)=> {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.innerHTML = `
         <h3> ${book.title} </h3>
         <p> By ${book.author} </p>
         <p>${book.pages} pages </p>
         <p>Status: ${book.read ? "Read" : "Not Read Yet"}</p>
         `;
         displayContainer.appendChild(bookCard);
   });
}

let newBookBtn = document.querySelector("#new-book-btn");
newBookBtn.addEventListener("click", function(event) {
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "flex";
});

document.querySelector("#new-book-form").addEventListener("submit", function(event) {
   event.preventDefault();
   addBookToLibrary();

   event.target.reset();
   event.target.style.display = "none";
})


