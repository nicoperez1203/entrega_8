function mostrarNomb(){
    var nombre = document.getElementById("usuariolog");
    var userName = JSON.parse(localStorage.getItem("user"));
    nombre.innerHTML = `Bienvenido <font color="palegreen"><strong>${userName.usuario}</strong></font> a e-mercado`;
}
mostrarNomb()


if( !localStorage.getItem('ingreso') ){

        Swal.fire({
            title: '¡Gracias por visitar e-mercado!',
            imageUrl: 'img/smile.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Carita feliz',
            showConfirmButton: false,
            timer: 2500
        })
        // estableces el localstorage en 1 para que no se vuelva a cumplir la condicion
        localStorage.setItem('ingreso',1); 
    
    } 





