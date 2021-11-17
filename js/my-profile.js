function mostrarNomb(){
    var nombre = document.getElementById("usuariolog");
    var nombre2 = document.getElementById("usuariolog2");
    var userName = JSON.parse(localStorage.getItem("user"));
    nombre.innerHTML = `Bienvenido <font color="palegreen"><strong>${userName.usuario}</strong></font> a e-mercado`;
    nombre2.innerHTML = `<font color="midnightblue"><strong>${userName.usuario}</strong></font>`;
}
mostrarNomb()

function previewFile() {
  let preview = document.getElementById('foto'); 
  let file    = document.querySelector('input[type=file]').files[0]; 
  let reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result; 
    document.getElementById('contenido').innerHTML= reader.result;
    
  }

  if (file) {
    reader.readAsDataURL(file);
   
  } else {
    preview.src = "img/avatar.png";
  }
}

function guardar() {
  let preview = document.getElementById('foto'); 
  let perfil = {}; //Creamos el objeto perfil

  perfil.nombre = document.getElementById("nombre").value; //Le agregamos los elementos con sus valores correspondientes, extraidos desde los id's del html
  perfil.apellido = document.getElementById("apellido").value;
  perfil.edad = document.getElementById("edad").value; 
  perfil.celular = document.getElementById("celular").value;
  perfil.email = document.getElementById("email").value;
  perfil.imagen = preview.src;

  localStorage.setItem('usuario', JSON.stringify(perfil)); //Convertimos el objeto en una cadena de texto JSON y lo guardamos con la key usuario en el localStorage
  
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Perfil guardado correctamente, por favor, actualice la pagina!',  //Alerta que nos indica que el perfil se guardó correctamente
    showConfirmButton: true,
    })
}

document.addEventListener('DOMContentLoaded',()=>{ //Luego de que el documento esta cargado 
  let preview = document.getElementById('foto');
  let perfil = JSON.parse(localStorage.getItem('usuario')); //Inversamente convierte la cadena de texto JSON en un objeto JS.
 
  if (perfil != null){ //Si "perfil" no esta vacio
      

    document.getElementById('nombre').value = perfil.nombre; //Pegamos los elementos en los inputos correspondientes
    document.getElementById("apellido").value = perfil.apellido;
    document.getElementById('edad').value= perfil.edad;
    document.getElementById('celular').value= perfil.celular;
    document.getElementById('email').value= perfil.email;
    document.getElementById('foto').src = perfil.imagen;

  }else {
    preview.src = "img/avatar.png"; //Si esta vacio, los inputs se muestran de esa manera y con una imagen predefinida
  }
 

})

    






  