"use strict";

const myLibrary = [];

function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read || false;

    this.info = function() {
        if (this.read === false) {
            return `${title} by ${author}, ${pages} pages, not read yet.`;
        } else {
            return `${title} by ${author}, ${pages} pages, already read.`;
        }
    };
}

function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages, false);
    book.ID = crypto.randomUUID();
    myLibrary.push(book);
}

