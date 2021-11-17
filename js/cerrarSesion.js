document.addEventListener("DOMContentLoaded", function (e) {
    onLoad();
});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.href = "index.html";
        sesionStorage.clear();
        localStorage.removeItem('user');
        window.location = "index.html";
    });
}

function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}


function cerrarSesion(){
    localStorage.removeItem('user') //Cambié esto para que solo borre el item con la key de "user", en lugar de todo el local storage
    localStorage.removeItem('ingreso')
    window.location = "index.html";
}

