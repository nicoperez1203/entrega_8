function checkLogin() {
   
    if (localStorage.getItem("user") === null) {
        window.location = "index.html"; 
    }
}

checkLogin();

