const readline = require('readline-sync'); //Så man kan skrive i consol (node pakke)
const fs = require('fs'); //For å lagre json

interface Book { //book interface
  title: string;
  author: string;
  numberOfPages: number;
  genre: string;
}

interface Library { //interface for bibliotek
  books: Array<Book>;
  totalBooks: number;
  totalPages: number;
  Rare: number;
  Fiction: number;
  Other: number;
}

class Book { //book klasse
  constructor(
    public title: string,
    public author: string,
    public numberOfPages: number,
    public genre: string
  ) {}
}

class RareBook extends Book { //arv klasse av book
  constructor(title: string, author: string, numberOfPages: number, genre: string) {
    super(title, author, numberOfPages + 50, genre);
  }
}

const library: Library = { //lager library objekt
  books: [],
  totalBooks: 0,
  totalPages: 0,
  Fiction: 0,
  Other: 0,
  Rare: 0,
};

function saveLibraryToFile() { //funksjon for å lagre output til json format
  const libraryData = {
    libraryType: "General",
    books: library.books.map(book => ({
      title: book.title,
      author: book.author,
      pages: book.numberOfPages,
      genre: book.genre,
    })),
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

function Main() {  //main funksjon som kjører bok laging

  function addBook() { 
    console.log("Hello! Welcome to the library, please add a book");

    //props som må fylles for å et bok objekt
    const title = readline.question('Title of the book? ');
    const author = readline.question('Author name? ');
    const numberOfPages = readline.questionInt('Number of pages? ');
    const genre = readline.question('Genre? ');

    let newBook: Book; //lager ny bok 

    //Sjekker om bøker er rare, hvis rare kaller vi må arv klassen, ellers kjører som vanlig
    if (genre.toLowerCase() === 'rare') {
      newBook = new RareBook(title, author, numberOfPages, genre);
    } else {
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
    } else if (genre.toLowerCase() === 'rare') {
      library.Rare++;
    } else {
      library.Other++;
    }
    console.log("book added to the library:", newBook);
  }

  //Legge til ny bok eller avsutte applikasjon. 

  let addAnotherBook = true;

  while (addAnotherBook) {
    addBook();
    console.log("Library:", library);

    const choice = readline.question("Add another book? 'Y' to continue. ");

    if (choice.toUpperCase() !== 'Y') {
      addAnotherBook = false;
      saveLibraryToFile();
      console.log("Stopping application..");
    }
  }
}

Main();