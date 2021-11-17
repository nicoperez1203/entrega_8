const ORDER_ASC_BY_NAME = "AZ";  //Constantes para criterio de orden
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
const ORD_POR_$_ASC = "Cost.";
const ORD_POR_$_DESC = "Cost Desc.";
var productos = []; //Lista de productos vacía
var actualCrit = undefined; //Criterio actual de orden
var mincost = undefined; //Variable en la que ingresaremos el costo minimo
var maxcost = undefined; //Variable en la que ingresaremos el costo maximo
var buscar = undefined; //Variable que nos servirá para buscar en tiempo real


function mostrarNomb(){
    var nombre = document.getElementById("usuariolog");
    var userName = JSON.parse(localStorage.getItem("user"));
    nombre.innerHTML = `Bienvenido <font color="palegreen"><strong>${userName.usuario}</strong></font> a e-mercado`;
}

mostrarNomb()


document.addEventListener("DOMContentLoaded", function(e){ 
    getJSONData(PRODUCTS_URL).then(function(resultObj){ /*En esta linea se hace el llamado al JSON de 'productos'*/
        if (resultObj.status === "ok"){ /*Aqui chequea que la respuesta al json haya sido efectiva*/
            ordymostProd(ORDER_ASC_BY_NAME, resultObj.data); /*Por defecto los productos se muestran ordenados en orden ascendente por nombre*/
        }
    });

function ordenarProd(criterio, arrprod){ //Aqui se crea una funcion para ordenar segun el criterio elegido
    let result = [];
    if (criterio === ORDER_ASC_BY_NAME) //Por nombre ascendente
    {
        result = arrprod.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; } //Aqui accedemos a la propiedad nombre del objeto 'a'
            if ( a.name > b.name ){ return 1; }  //para compararlo con el nombre del objeto 'b'
            return 0;
        });
    }else if (criterio === ORDER_DESC_BY_NAME){ //Por nombre descendente
        result = arrprod.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_BY_SOLD_COUNT){ //Por cantidad de vendidos
        result = arrprod.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); //Aqui accedemos a la propiedad vendidos del objeto 'a'
            let bCount = parseInt(b.soldCount); //para compararlo con el vendidos del objeto 'b'

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criterio === ORD_POR_$_ASC){ //Por precio ascendente
        result = arrprod.sort(function(a, b) {
            let acost = parseInt(a.cost); //Aqui accedemos a la propiedad precio del objeto 'a'
            let bcost = parseInt(b.cost); //para compararlo con el precio del objeto 'b'

            if ( acost > bcost ){ return 1; }
            if ( acost < bcost ){ return -1; }
            return 0;
        });
    }else if (criterio === ORD_POR_$_DESC){ //Por precio descendente
        result = arrprod.sort(function(a, b) {
            let acost = parseInt(a.cost); 
            let bcost = parseInt(b.cost); 

            if ( acost > bcost ){ return -1; }
            if ( bcost < acost ){ return 1; }
            return 0;
        });
    }

    return result;
}

function mostrarProductos(){

    let listaProductos = ""; /*Se crea un for que vaya recorriendo el arreglo de 'productos'*/
    for(let i = 0; i < productos.length; i++){
        let product = productos[i];

        if (((mincost == undefined) || (mincost != undefined && parseInt(product.cost) >= mincost)) &&
            ((maxcost == undefined) || (maxcost != undefined && parseInt(product.cost) <= maxcost))){
                if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1 || /*Desafiate buscador en vivo(entrega 2)*/
                product.description.toLowerCase().indexOf(buscar) != -1) {/*Desafiate buscador en vivo(entrega 2*/
            
            /*Aqui accedemos a las distintas propiedades que queremos insertar en el html.*/
            listaProductos += `
            <div class="col-6 col-sm-4"> 
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail">
                    </div>
                    <div class="d-flex w-100 justify-content-center">
                            <h6 class="mb-1">`+ product.name +`</h6>
                            </div>
                    <h8 class="small">` + product.description + `</h8>
                    <div class="col">
                        
                        <br>
                        <p class="small">El precio unitario es de: U$S ` + product.cost + `</p>
                        <small class="text-muted">Se vendieron: ` + product.soldCount + ` autos de este modelo.</small>
                    </div>
                </div>
            </a>
            </div>
            ` 
            //Se agrega la clase de la linea 89, para darle el formato de grilla
        }
        
    }

        document.getElementById("listaproductos").innerHTML = listaProductos; //Insertamos la lista en el div con id "listaproductos"
    }
}

function ordymostProd(nuevoCrit, listaProd){ 
    actualCrit = nuevoCrit; 

    if(listaProd != undefined){
        productos = listaProd;
    }

    productos = ordenarProd(actualCrit, productos);

    //Muestro las categorías ordenadas
    mostrarProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


    document.getElementById("sortAsc").addEventListener("click", function(){
        ordymostProd(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordymostProd(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordymostProd(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        ordymostProd(ORD_POR_$_ASC);
    });

    document.getElementById("sortByCostDesc").addEventListener("click", function(){
        ordymostProd(ORD_POR_$_DESC);
    });

    

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFiltercostMin").value = "";
        document.getElementById("rangeFiltercostMax").value = "";

        mincost = undefined;
        maxcost = undefined;

        mostrarProductos();
    });

    document.getElementById("rangeFiltercost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por costo
      
        mincost = document.getElementById("rangeFiltercostMin").value;
        maxcost = document.getElementById("rangeFiltercostMax").value;

        if ((mincost != undefined) && (mincost != "") && (parseInt(mincost)) >= 0){
            mincost = parseInt(mincost);
        }
        else{
            mincost = undefined;
        }

        if ((maxcost != undefined) && (maxcost != "") && (parseInt(maxcost)) >= 0){
            maxcost = parseInt(maxcost);
        }
        else{
            maxcost = undefined;
        }

        mostrarProductos();
    });

    document.getElementById("buscador").addEventListener("input", function (e) {  /*Desafiate buscador en vivo*/
        buscar = document.getElementById("buscador").value.toLowerCase(); /*Desafiate buscador en vivo*/
        mostrarProductos();
    });
    
});



