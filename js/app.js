//variables

const carrito = document.querySelector('#carrito'),
      listaCursos = document.querySelector('#lista-cursos'),
      contenedorCarrito = document.querySelector('#lista-carrito tbody'),
      vaciarCarritobtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];      

      

//Funciones 
cargarEventListener();
function cargarEventListener () {
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar cursos
    carrito.addEventListener('click',eliminarCuso);

    //Vaciar carrito

    vaciarCarritobtn.addEventListener('click', () =>{
        console.log('vaciando carrito');
        articulosCarrito = [];
        limpiarHtml();
    })
}

function agregarCurso(e) {
    e.preventDefault();
    const cursoSeleccionado = e.target.parentElement.parentElement;
    if (e.target.classList.contains('agregar-carrito')){
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//eliminar cursos

function eliminarCuso (e){
    console.log('eliminar');
    if (e.target.classList.contains('borrar-curso')){
        console.log(e.target);
        const cursoID = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
    }
    console.log(articulosCarrito);
    carritoHtml(); //Itera sobre el carrito y muestra el html
}

//leer el contenido del html cuando le damos click
function leerDatosCurso(curso) {

    //crear un objeto con el curso actualizar 
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1,
    }

    //Revisar si un elemento ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe){
        const cursos = articulosCarrito.map ( curso =>{
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el obj actualizado
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];

    } else {
 // console.log(infoCurso);
    //agregar al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
    console.log(articulosCarrito);
    }
    console.log(existe);



  

    carritoHtml();
}

//Mostrar el carrito en el HTML

function carritoHtml() {
    //Limpiar el HTML
  
    limpiarHtml();

    //Generando el html
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
       // const {imagen,titulo,precio,cantidad} = curso;
        row.innerHTML = `
        <td>
        <img src="${curso.imagen}">
        </td>
            <td> ${curso.titulo}</td>
            <td>  ${curso.precio}</td>
            <td>   ${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> x</a>
            </td>
        `;
        //Agregar al tbody lo que contiene el carrito
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }
}