// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyBG_NV3niMDE_gPYsbHQsW_9xa-3nM07_Q",
    authDomain: "booknetwork-235c5.firebaseapp.com",
    databaseURL: "https://booknetwork-235c5.firebaseio.com",
    projectId: "booknetwork-235c5",
    storageBucket: "booknetwork-235c5.appspot.com",
    messagingSenderId: "672093405851",
    appId: "1:672093405851:web:4e0cb82cc0153e08093c3e",
    measurementId: "G-T6VF1LXZDZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var booksSnapshot = [];
var pictures = [];
var booksSnapshot1 = [];
var uid = localStorage.getItem("User");

console.log(typeof pictures);
user_name = localStorage.getItem("user_name");


function logOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "main_page.html";
    }).catch(function(error) {
        // An error happened.
    });
}






function getData() {
    firebase.database().ref("/books/").once('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            booksSnapshot1.push(childSnapshot.val());
        });
        var filteredBooks = booksSnapshot1.filter(function(book) {
            if (book.Status.toLowerCase() == "active") {
                return book.Status;
            }
        });
        console.log(filteredBooks);
        filteredBooks.forEach(function(book) {
            booksSnapshot.push(book);
            row = " <div class='gallery' id = '" +
                book.Name + "' onclick ='redirectTobookName(this.id)'><a ><img src = " + book.cover + "alt =" + book.Name + "width = '600' height ='400' > </a > <div class ='desc' >" + book.Name + "<br>-" + book.Author + "</div></div > ";
            document.getElementById("output").innerHTML += row;
        });
    })
}

getData();

function redirectTobookName(name) {
    localStorage.setItem("book_name", name.replace(/ /g, '_'));
    window.location = "page.html";
}

function search_genre() {
    selected_genre = document.getElementById("keyword").value;
    var filteredBooks = booksSnapshot.filter(function(book) {
        console.log(selected_genre);
        if (book.Genre.toLowerCase().search(selected_genre.toLowerCase()) != -1) {
            return book.Genre;
        }
    });

    document.getElementById("output").innerHTML = ""
    filteredBooks.forEach(function(book) {
        row = " <div class='gallery' id = '" +
            book.Name + "' onclick ='redirectTobookName(this.id)'><a ><img src = " + book.cover + "alt =" + book.Name + "width = '600' height ='400' > </a > <div class ='desc' >" + book.Name + "-" + book.Author + "</div></div > ";
        document.getElementById("output").innerHTML += row;

    })
}

function searchName() {
    var keyword = document.getElementById("keyword").value;
    var filteredBooks = booksSnapshot.filter(function(book) {
        if (book.Name.toLowerCase().search(keyword.toLowerCase()) != -1) {
            console.log(book.Name)
            return book.Name;
        }
    })
    document.getElementById("output").innerHTML = ""
    filteredBooks.forEach(function(book) {
        row = " <div class='gallery' id = '" +
            book.Name + "' onclick ='redirectTobookName(this.id)'><a ><img src = " + book.cover + "alt =" + book.Name + "width = '600' height ='400' > </a > <div class ='desc' >" + book.Name + "-" + book.Author + "</div></div > ";
        document.getElementById("output").innerHTML += row;


    })
}


function searchAuthor() {
    var keyword = document.getElementById("keyword").value;

    var filteredBooks = booksSnapshot.filter(function(book) {
        if (book.Author.toLowerCase().search(keyword.toLowerCase()) != -1) {
            return book.Author;
        }
    })
    console.log(filteredBooks)
    document.getElementById("output").innerHTML = ""
    filteredBooks.forEach(function(book) {
        row = " <div class='gallery' id = '" +
            book.Name + "' onclick ='redirectTobookName(this.id)'><a ><img src = " + book.cover + "alt =" + book.Name + "width = '600' height ='400' > </a > <div class ='desc' >" + book.Name + "-" + book.Author + "</div></div > ";
        document.getElementById("output").innerHTML += row;

    })
}

function my_book() {

    var filteredBooks = booksSnapshot.filter(function(book) {
        var ownerkey = Object.keys(book.Owner);
        console.log(ownerkey[ownerkey.length - 1] + uid)
        if (ownerkey[ownerkey.length - 1] == uid) {
            return book.Owner;
        }
    })
    console.log(filteredBooks)
    document.getElementById("output").innerHTML = ""
    filteredBooks.forEach(function(book) {
        row = " <div class='gallery' id = '" +
            book.Name + "' onclick ='redirectTobookName(this.id)'><a ><img src = " + book.cover + "alt =" + book.Name + "width = '600' height ='400' > </a > <div class ='desc' >" + book.Name + "-" + book.Author + "</div></div > ";
        document.getElementById("output").innerHTML += row;

    })
}