var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var readline = require('readline-sync'); //Så man kan skrive i consol (node pakke)
var fs = require('fs'); //For å lagre json
var Book = /** @class */ (function () {
    function Book(title, author, numberOfPages, genre) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.genre = genre;
    }
    return Book;
}());
var RareBook = /** @class */ (function (_super) {
    __extends(RareBook, _super);
    function RareBook(title, author, numberOfPages, genre) {
        return _super.call(this, title, author, numberOfPages + 50, genre) || this;
    }
    return RareBook;
}(Book));
var library = {
    books: [],
    totalBooks: 0,
    totalPages: 0,
    Fiction: 0,
    Other: 0,
    Rare: 0,
};
function saveLibraryToFile() {
    var libraryData = {
        libraryType: "General",
        books: library.books.map(function (book) { return ({
            title: book.title,
            author: book.author,
            pages: book.numberOfPages,
            genre: book.genre,
        }); }),
        summary: {
            totalBooks: library.totalBooks,
            totalPages: library.totalPages,
            genreCount: {
                Fiction: library.Fiction,
                Rare: library.Rare,
                Other: library.Other,
            }
        }
    };
    fs.writeFileSync('library.json', JSON.stringify(libraryData, null, 2));
    console.log("saved to library.json");
}
function Main() {
    function addBook() {
        console.log("Hello! Welcome to the library, please add a book");
        //props som må fylles for å et bok objekt
        var title = readline.question('Title of the book? ');
        var author = readline.question('Author name? ');
        var numberOfPages = readline.questionInt('Number of pages? ');
        var genre = readline.question('Genre? ');
        var newBook; //lager ny bok 
        //Sjekker om bøker er rare, hvis rare kaller vi må arv klassen, ellers kjører som vanlig
        if (genre.toLowerCase() === 'rare') {
            newBook = new RareBook(title, author, numberOfPages, genre);
        }
        else {
            newBook = new Book(title, author, numberOfPages, genre);
        }
        //oppdaterer library med nye verdier fra bok man har lagt til
        library.books.push(newBook);
        library.totalBooks++;
        library.totalPages += newBook.numberOfPages;
        //sjekker hvilken sjanger som skal incrementes 
        //Kunne også hatt en switch her hvis det skulle vært flere verdier
        if (genre.toLowerCase() === 'fiction') {
            library.Fiction++;
        }
        else if (genre.toLowerCase() === 'rare') {
            library.Rare++;
        }
        else {
            library.Other++;
        }
        console.log("book added to the library:", newBook);
    }
    //Legge til ny bok eller avsutte applikasjon. 
    var addAnotherBook = true;
    while (addAnotherBook) {
        addBook();
        console.log("Library:", library);
        var choice = readline.question("Add another book? 'Y' to continue. ");
        if (choice.toUpperCase() !== 'Y') {
            addAnotherBook = false;
            saveLibraryToFile();
            console.log("Stopping application..");
        }
    }
}
Main();
