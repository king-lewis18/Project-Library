

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
displayBooks();

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
   saveAndDisplay();
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

};

function saveAndDisplay() {
   localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
   displayBooks();
}

let newBookBtn = document.querySelector("#new-book-btn");
newBookBtn.addEventListener("click", function(event) {
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "flex";
});

document.querySelector("#new-book-form").addEventListener("submit", function(event) {
  event.preventDefault();

    if (!validateInputs()) {
        return; 
    }

    addBookToLibrary();
    event.target.reset();
    clearValidationState();
    event.target.style.display = "none";
})

const form = document.getElementById("new-book-form");
const author = document.getElementById("author");
const titleInput = document.getElementById("title");

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const clearValidationState = () => {
    [author, titleInput].forEach((input) => {
        const inputControl = input.parentElement;
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = "";
        inputControl.classList.remove("error", "success");
    });
};

const validateTitle = () => {
    const titleValue = titleInput.value.trim();
    if (titleValue === "") {
        setError(titleInput, "Book title required");
        return false;
    }
    setSuccess(titleInput);
    return true;
};

const validateAuthor = () => {
    const authorValue = author.value.trim();
    if (authorValue === "") {
        setError(author, "Author's name required");
        return false;
    }
    setSuccess(author);
    return true;
};

const validateInputs = () => {
    const isTitleValid = validateTitle();
    const isAuthorValid = validateAuthor();
    return isTitleValid && isAuthorValid;
};

titleInput.addEventListener("input", validateTitle);
author.addEventListener("input", validateAuthor);

newBookBtn.addEventListener("click", function () {
    clearValidationState();
    form.style.display = "flex";
    titleInput.focus();
});





