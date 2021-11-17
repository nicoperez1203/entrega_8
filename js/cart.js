function mostrarNomb(){
    var nombre = document.getElementById("usuariolog");
    var userName = JSON.parse(localStorage.getItem("user"));
    nombre.innerHTML = `Bienvenido <font color="palegreen"><strong>${userName.usuario}</strong></font> a e-mercado`;
}

mostrarNomb()


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CARRO_2_ARTICULOS).then(function (resultObj) { //Llamado a JSON con dos articulos

        if (resultObj.status === "ok") {

            prodCarrito = resultObj.data;
            datosCarro = prodCarrito.articles; //Variable que nos permite acceder al arreglo "articles"
            mostrarCarrito(datosCarro); //Llamado a la funcion 
        }
    });
});

var prodCarrito = [];
var subTotal = 0;
var subsub = 0;


function mostrarCarrito(array) {

    let data = "";
    for (let i = 0; i < array.length; i++) {
        let datoscarrito = array[i];
        
        
        if (datoscarrito.currency === "USD"){
            datoscarrito.unitCost = datoscarrito.unitCost * 40; //Condicional para convertir la moneda a pesos uruguayos 
            }

            let totalProducto = datoscarrito.unitCost * datoscarrito.count; //Costo total de cada producto
            subTotal += totalProducto; //Subtotal de productos sumados
    {

            data +=

                `   <tr>
                        <td>
                            <figure class="itemside align-items-center">
                                <div class="aside"><img src="` + datoscarrito.src + `" class="img-sm"></div>
                                    <figcaption class="info"> <a href="products.html" class="title" data-abc="true">`+ datoscarrito.name + `</a>
                                    </figcaption>
                            </figure>
                        </td>
                        <td> 
                            <p>$<span class="precio"> ` + datoscarrito.unitCost + `</span></p>
                        </td>
                        <td> 
                            <input type=number id="cant${i}" onchange="tiempoReal()" style="width: 45px" name="cantidades" min="1" value="` + datoscarrito.count + `">
                        </td>
                        <td> 
                            <p>$<span id="subtProd${i}">` + totalProducto + `</span></p>
                        </td>
                        <td class="text-right d-none d-md-block"><a onclick="deleteRow(this)" class="btn btn-danger" data-abc="true"><i class="fa fa-trash"></i> Remover</a>
                        </td>
                    </tr>
                `
        }
    
        document.getElementById("carrito").innerHTML = data;
        document.getElementById("precioSubTotal").innerHTML = subTotal;
        
        
         
        
    }
}




    function standard(){  
        document.getElementById("tipoEnvio").innerHTML = `<font color="blue"> Standard</font>`; 
        valor = document.getElementById("precioSubTotal").innerHTML; //Recibimos el el valor de precioSubTotal, que es la suma de los subtotales.
        nuevoValor = (valor * 5) / 100; //Se crea la variable nuevoValor, que calcula el porcentaje correspondiente al envio.
        document.getElementById("costoEnvio").innerHTML = `Costo de envío: $` +nuevoValor;
        precioFinal = parseFloat(valor) + nuevoValor; //Y finalmente se suma el subtotal mas el costo de envio para obtener el precio final.
        document.getElementById("precioFinal").innerHTML = `Total: $` +precioFinal;
        document.getElementById("totalModal").innerHTML = `$` +precioFinal;
        document.getElementById("precioFinalDetalles").innerHTML = `<font color="blue">$ ${precioFinal}</font>`;
    }
    
  
    function express(){
        document.getElementById("tipoEnvio").innerHTML = `<font color="blue"> Express</font>`;
        valor = document.getElementById("precioSubTotal").innerHTML;
        nuevoValor = (valor * 7) / 100;
        document.getElementById("costoEnvio").innerHTML = `Costo de envío: $` +nuevoValor;
        precioFinal = parseFloat(valor) + nuevoValor;
        document.getElementById("precioFinal").innerHTML = `Total: $` +precioFinal;
        document.getElementById("totalModal").innerHTML = `$` +precioFinal;
        document.getElementById("precioFinalDetalles").innerHTML = `<font color="blue">$ ${precioFinal}</font>`;
    }

    function premium(){
        document.getElementById("tipoEnvio").innerHTML = `<font color="blue"> Premium</font>`;
        valor = document.getElementById("precioSubTotal").innerHTML;
        nuevoValor = (valor * 15) / 100;
        document.getElementById("costoEnvio").innerHTML = `Costo de envío: $` +nuevoValor;
        precioFinal = parseFloat(valor) + nuevoValor;
        document.getElementById("precioFinal").innerHTML = `Total: $` +precioFinal; 
        document.getElementById("totalModal").innerHTML =  `$`+precioFinal;  
        document.getElementById("precioFinalDetalles").innerHTML = `<font color="blue">$ ${precioFinal}</font>`;
    }




function tiempoReal(){
    let precios = document.getElementsByClassName("precio");  //Se reciben todos los elementos que contengan la clase precio
    let cantidades = document.getElementsByTagName("input"); //Se reciben todos los inputs
    let cantidadItems = 0; //Variable que suma la cantidad de productos en el carro
    subsub = 0; //Variable subtotal modificada en tiempo real

    for(let i = 0; i < precios.length; i++){
            subsub += parseFloat(precios[i].innerHTML) * cantidades[i].value; //El subtotal recibe el precio y la cantidad y se modifica en tiempo real
            document.getElementById("subtProd"+i).innerHTML = parseFloat(precios[i].innerHTML) * cantidades[i].value; //Subtotal por cada producto modificada en tiempo real
            cantidadItems += parseFloat(cantidades[i].value); //Cantidad de items en tiempo real
        }

        document.getElementById("precioSubTotal").innerHTML = subsub; 
        document.getElementById("cantidadItems").innerHTML = cantidadItems;
        document.getElementById("numeroProductos").innerHTML = cantidadItems; //Se pega en el dropDownMenu
        
        
        
        

        let envio = document.getElementById("validationCustom06").value;
       
        if (envio == 1){
            standard();
        } if (envio == 2){
                express();
        }   if (envio == 3){
                    premium();
        }


}

/*---------------Desafiate--------------------*/
function deleteRow(r)
    {
    var fila = r.parentNode.parentNode.rowIndex;
    document.getElementById("tablaProductos").deleteRow(fila);
    tiempoReal()
    }
/*----------------------------------------------------------*/


function borrarCampos(){ //Toma los valores de los inputs del formulario y los "borra", al igualarlos a vacío.
    document.getElementById("validationCustom01").value = "";
    document.getElementById("validationCustom02").value = "";
    document.getElementById("validationCustom03").value = "";
    document.getElementById("validationCustom04").value = "";
    document.getElementById("validationCustom05").value = "";
    document.getElementById("validationCustom06").value = "";
}



function creditCard()
{
	document.getElementById("accountNumber").disabled=true;  //De esta forma inhabilito los inputs correspondientes para la opcion de tarjeta de credito
	document.getElementById("banco").disabled=true;
    document.getElementById("passw").disabled=false;
	document.getElementById("expdate").disabled=false;
	document.getElementById("cardNumber").disabled=false;
    document.getElementById("metodoDePagoFinal").innerHTML = `<font color="blue"> Tarjeta de Credito</font>`;
    }

function bankAccount() //Al igual que arriba pero para la funcion de cuenta bancaria.
{
	document.getElementById("passw").disabled=true;
	document.getElementById("expdate").disabled=true;
	document.getElementById("cardNumber").disabled=true;
	document.getElementById("accountNumber").disabled=false;
	document.getElementById("banco").disabled=false;
    document.getElementById("metodoDePagoFinal").innerHTML = `<font color="blue"> Cuenta Bancaria</font>`;
    }






const enviarForm = document.getElementById("formModal"); //Evitar que se refresque la pagina al confirmar el formulario del modal
enviarForm.addEventListener("submit", function (event){
    event.preventDefault();
})

const finalForm = document.getElementById("formFinal"); 
finalForm.addEventListener("submit", function (event){
    event.preventDefault();
})


function finalizarCompra(){ //Comprobamos que los campos requeridos no esten vacios, y de ser asi permite completar la compra.
    
    let nombre = document.getElementById("validationCustom01").value;
    let pais = document.getElementById("validationCustom02").value;
    let calle = document.getElementById("validationCustom03").value;
    let esquina = document.getElementById("validationCustom04").value;
    let cantidades = document.getElementById("cantidadItems").innerHTML;
    let pago = document.getElementById("metodoDePagoFinal").innerHTML;
    let envio = document.getElementById("tipoEnvio").innerHTML;

    if (nombre != "" && pais != "" && calle != "" && esquina != "" && cantidades != 0 
    && pago != "" && envio != ""){
        Swal.fire(
            'Compra realizada con exito',
            '--',
            'success'
        )
    }else{
        Swal.fire(
            'Faltan datos',
            '--',
            'error'
        )
    }
}






































    




















