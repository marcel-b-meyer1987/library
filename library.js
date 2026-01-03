    const addBtnTop = document.querySelector("#add-button-top");
    const addBtnBottom = document.getElementById("add-button-bottom");
    const titleDisplay = document.querySelector("form #title");
    const authorDisplay = document.querySelector("form #author");
    const pagesDisplay = document.querySelector("form #pages");

    let myLibrary = loadLibrary() || [];
    displayLibrary();

    addBtnTop.addEventListener("click", (e) =>  {
        createNewBook();
    });

    addBtnBottom.addEventListener("click", () => {
        addBookToLibrary(titleDisplay.value, authorDisplay.value, pagesDisplay.value, myLibrary);
    });


function Book(title, author, pages, read, ID) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read || false;
    this.ID = ID;

    this.info = function() {
        if (this.read === false) {
            return `${title} by ${author}, ${pages} pages, not read yet.`;
        } else {
            return `${title} by ${author}, ${pages} pages, already read.`;
        }
    };
}

function loadLibrary() {
    let library = [];
    const libJSON = localStorage.getItem("library") || {};
    
    if (libJSON.length > 0) {
        const libObj = JSON.parse(libJSON);
        let newEntry;
        for(const book of libObj) {
            newEntry = new Book(book.title, book.author, book.pages, book.read, book.ID);
            library.push(newEntry);
        }
        return library;
    } else {
        library = [];
        return library;
    }
}

function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function displayLibrary() {

    // loop over library array
    // create html for book display for each item    

    // <ul id="book-list">
    //     <li data-id="xxx-xxx-xxx-xxx">
    //         <span class="info">Title (Author)</span>
    //         <img src="./img/check.svg" alt="Mark as read" class="icon-button check-button">
    //         <img src="./img/remove.svg" alt="Remove" class="icon-button remove-button">
    //     </li>
    // </ul>

    if (myLibrary.length < 1) {
        return; // in case no books in the librabry: exit function
    }

    let displayHTML = "";

    for(const book of myLibrary) {
        let bookHTML = 
        `<li data-id="${book.ID}">
            <span class="info">${book.title} (${book.author})</span>
            <img src="./img/check.svg" alt="Mark as read" class="icon-button check-button">
            <img src="./img/remove.svg" alt="Remove" class="icon-button remove-button">
        </li>`;

        displayHTML += bookHTML;
    }

    // attach html of the items to the container:
    const display = document.querySelector("#book-list");
    display.innerHTML = displayHTML;
    
    // add eventlisteners to all li elements in the display
    let liElements = Array.from(display.querySelectorAll("li"));
    liElements.forEach((li) => {
        const info = li.querySelector("span.info");
        const removeBtn = li.querySelector("img.remove-button");

        info.addEventListener("click", (e) => {
            showBookDetails(li.dataset["id"]);      //TESTED OK
        });

        removeBtn.addEventListener("click", (e) => {
            removeBookFromLibrary(li.dataset["id"]);
        });
    });
    
}

//TESTED OK
function showBookDetails(bookID) {
    const book = myLibrary.filter(book => book.ID === bookID)[0];

    titleDisplay.value = book.title || "";
    authorDisplay.value = book.author || "";
    pagesDisplay.value = book.pages || "";
}

//TESTED OK
function createNewBook() {
    titleDisplay.value = "";
    authorDisplay.value = "";
    pagesDisplay.value = "";
    titleDisplay.focus();
}

//TESTED OK
function addBookToLibrary(title, author, pages, library) {
    let newBook = new Book(title, author, pages, false, crypto.randomUUID());
    console.log(`New Book ${newBook} created.`);
    myLibrary.push(newBook);
    console.log("Added to library.");
    saveLibrary();
    console.log("Saved library.");
    displayLibrary();
}

//TESTED OK
function removeBookFromLibrary(bookID) { 
    //remove book with bookID from myLibrary array, save + update display
    myLibrary = myLibrary.filter(book => book.ID !== bookID);
    saveLibrary();
    displayLibrary();
}


// MAIN SECTION BELOW HERE:

    
