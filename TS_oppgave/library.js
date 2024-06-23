var readline = require('readline-sync'); //node pakke for å skrive in consol
var library = {
    books: [],
    totalBooks: 0,
    totalPages: 0,
    FictionBooks: 0,
    NonFictionBooks: 0,
};
function Main() {
    function addBook() {
        console.log("Hello! Welcome to library please add a book");
        //la til readline sync så man kan skrive i konsol
        var title = readline.question('Title of the book? ');
        var author = readline.question('Author name? ');
        var numberOfPages = readline.questionInt('Number of pages? ');
        var genre = readline.question('Genre? ');
        //lager bok objektet
        var newBook = {
            title: title,
            author: author,
            numberOfPages: numberOfPages,
            genre: genre
        };
        //legger til info om bøker til library
        library.books.push(newBook);
        library.totalBooks++;
        library.totalPages += numberOfPages;
        if (genre.toLowerCase() === 'fiction') {
            library.FictionBooks++;
        }
        else {
            library.NonFictionBooks++;
        }
    }
    //legge til ny bok eller stoppe applikasjonen
    var addAnotherBook = true;
    while (addAnotherBook) {
        addBook();
        console.log("Library:", library);
        var choice = readline.question("Add Another book? (Y) ");
        if (choice.toUpperCase() !== 'Y') { //to uppercase så ikke noe skal gå gærent
            addAnotherBook = false;
            console.log("Stopping application..");
        }
    }
}
Main();
