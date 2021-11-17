function guardarNomb(){
    var inputUser = document.getElementById("usuario");
    localStorage.setItem("user", JSON.stringify({usuario: inputUser.value}));
}

function redireccion(){
    
    let user2 = document.getElementById("usuario").value;
    let pass2 = document.getElementById("pass").value;
    
    if (user2 != "" && pass2 != "" ){ 
            guardarNomb()       
            window.location = "home.html";
        }else{
            
            
              Swal.fire(
                'Los campos usuario y/o contraseña, no pueden estar vacíos',
                '-',
                'warning'
              )
            document.getElementById("usuario").focus();
            }
    }


