// const readline = require('readline-sync'); //node pakke for å skrive in consol
// //bok objekt. 
// interface Book { 
//     title: string;
//     author: string;
//     numberOfPages: number;
//     genre : string;
//   }
// //bilbiotek som består av en array med bøker
// interface Library {
//     books: Array<Book>;
//     totalBooks: number;
//     totalPages: number;
//     FictionBooks: number;
//     NonFictionBooks: number;
//   }
//   const library: Library = {
//     books: [],
//     totalBooks: 0,
//     totalPages: 0,
//     FictionBooks: 0,
//     NonFictionBooks: 0,
//   };
//   function Main() {
//     function addBook() {
//     console.log("Hello! Welcome to library please add a book");
//         //la til readline sync så man kan skrive i konsol
//         const title = readline.question('Title of the book? ');
//         const author = readline.question('Author name? ');
//         const numberOfPages = readline.questionInt('Number of pages? ');
//         const genre = readline.question('Genre? ');
//     //lager bok objektet
//         const newBook = {
//             title: title,
//             author: author,
//             numberOfPages: numberOfPages,
//             genre: genre
//           };
//     //legger til info om bøker til library
//           library.books.push(newBook);
//           library.totalBooks++;
//           library.totalPages += numberOfPages;
//           if (genre.toLowerCase() === 'fiction') {
//             library.FictionBooks++;
//           } else {
//             library.NonFictionBooks++;
//           }
//     }
//     //legge til ny bok eller stoppe applikasjonen
//     let addAnotherBook = true;
//     while (addAnotherBook) {
//       addBook();
//       console.log("Library:", library);
//       const choice = readline.question("Add Another book? (Y) ") 
//       if (choice.toUpperCase() !== 'Y') { //to uppercase så ikke noe skal gå gærent
//         addAnotherBook = false;
//         console.log("Stopping application..");
//       }
//     }
// }
// Main();
