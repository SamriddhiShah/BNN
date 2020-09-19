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


var errorMessage=[];

var userid = localStorage.getItem("User");

console.log(userid);


function validateForm() {
    if(document.getElementById("i-book-name").value==" "){
        errorMessage.push('Title of the Book must be filled out!');
    }

    if(document.getElementById("i-author").value==" "){
        errorMessage.push('Author of the Book must be filled out!');
    }
    
    if(document.getElementById("i-owner-fname").value==" "){
        errorMessage.push('Your first name must be filled out!');
    }

    if(document.getElementById("i-owner-lname").value==" "){
        errorMessage.push('Your last name must be filled out!');
    }
    
    if(document.getElementById("i-class-sec").value==" "){
        errorMessage.push('Your class-section must be filled out!');
    }

    if(document.getElementById("i-mobile-number").value==" "){
        errorMessage.push('Your mobile number must be filled out!');
    }
var mb=document.getElementById("i-mobile-number").value;
    if(mb.length<10){
        errorMessage.push('Your mobile number should contain 10 digits! ');
    }

    if(mb.length>10){
        errorMessage.push('Your mobile number exceeds the character limit of 10 digits! ');
    }
    for(i=0; i < errorMessage.length;){
        document.getElementById("error_label").innerHTML=errorMessage[i];
        console.log(errorMessage);
    }

    if (errorMessage.length=0){
        addbook();
    }
  }


function addbook() {
    console.log("adding book");
    var canvas = document.getElementById("canvas");
    var dataurlV = canvas.toDataURL("image/png");
    var old_book_name = document.getElementById("i-book-name").value;
    var book_name = old_book_name.replace(/ /g, '_');


    var e = document.getElementById("drop-down-genre");
    //var timestamp = Date.now().toString()
    localStorage.setItem("book_name", book_name);
    var owner = document.getElementById("i-owner-fname").value + " " + document.getElementById("i-owner-lname").value + ", " + document.getElementById("i-class-sec").value.toString() + " " + document.getElementById("i-mobile-number").value.toString();
    console.log(owner);

    var book = {
        "Name": document.getElementById("i-book-name").value,
        "Author": document.getElementById("i-author").value,
        "Genre": e.options[e.selectedIndex].text,
        "Review": document.getElementById("i-review").value,
        "cover": dataurlV,
        "Other": document.getElementById("i-other").value,
        "Status": "active",
        "Owner": {
            [userid]: owner
        }
    };
    console.log(book);
    localStorage.setItem("book_name", book_name);
    firebase.database().ref('/books/' + book_name).set(book);

    // firebase.database().ref("books/" + book_name).push(book);

    document.getElementById("dispaly_label").innerHTML = "Your Book has Successfully been added to the Library!";

}


function logOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "main_page.html";
    }).catch(function(error) {
        // An error happened.
    });
}