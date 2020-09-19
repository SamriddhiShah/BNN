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

user_name = localStorage.getItem("user_name");
book_name = localStorage.getItem("book_name");
document.getElementById("header_label").innerHTML = book_name.replace(/_/g, ' ');
var uid = localStorage.getItem("User");
console.log(book_name)



function getData() {
    firebase.database().ref("/books/" + book_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        image_src = snapshot.val().cover;
        //Start code
        var Owner = snapshot.val().Owner;
        var ownerkey = Object.keys(Owner);
        var book_name = snapshot.val().Name;
        var genre = snapshot.val().Genre;
        var other = snapshot.val().Other;
        var author = snapshot.val().Author;
        var review = snapshot.val().Review;
        var status_display = snapshot.val().Status;
        console.log(status_display);
        var display = "<br><br><h4 class='text-display'>" + "This Book Belongs To-  " + Owner[ownerkey[ownerkey.length - 1]] + "<br>" +
            "Author- " + author + "<br>" + "Genre- " + genre + "<br>" + "The Reader's Review-" + review + "<br>" +
            "Any Other Details- " + other + "</h4>";
        message_with_tag = "<h4 class='message_h4'>" + Owner.owner + "</h4>";
        row = display;
        document.getElementById("output").innerHTML += row;
        document.getElementById("pic").src = image_src;
        if (status_display == "active") {
            document.getElementById("status_button").innerHTML = "Available";
        } else {
            document.getElementById("status_button").innerHTML = "UnAvailable";
        }

        if (ownerkey[ownerkey.length - 1] != uid) {
            var inactivebutn = document.getElementById('inactive')
            inactivebutn.style.display = "none";
        }
    })

}
getData();




function logout() {
    localStorage.removeItem("user_name");

    window.location.replace("recently_added.html");
}

function Inactive() {
    firebase.database().ref('/books/' + book_name).update({ 'Status': 'InActive' });
    window.location = "recently_added.html"
}

function logOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "main_page.html";
    }).catch(function(error) {
        // An error happened.
    });
}