// Este evento sirve para que el código se ejecute una vez que el documento ha sido cargado.
document.addEventListener('DOMContentLoaded', function () {

    // la mayoría de variables se declaran como constantes.
    const btn = document.getElementById('add');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');

    let id=1;

    function removeToDo(id){
        document.getElementById(id).remove();
    }

    function addToDo() {
        if(title.value === '' || description.value === '') {
            //console.error('Title and description are required');
            alert.classList.remove('d-none');
            alert.innerText = 'Title and description are required';
            return
        }
        alert.classList.add('d-none');
        // en vez de crear un elemento del dom usamos la función insertRow() que nos da la tabla
        const row = table.insertRow();
        row.setAttribute('id', id++); // le asignamos ese id y ademas voy a incrementarlo en 1,
        //  en los frameworks de javascript suelen utilizar el atributo key
        // en vez de ir creando los elementos del DOM asignando el valor y luego agregandolos a la fila,
        // lo que hacemos es asignar el valor directamente a la propiedad innerHTML de la fila 
        row.innerHTML = `
        <td>${title.value}</td>
        <td>${description.value}</td>
        <td class="text-center">
            <input type="checkbox"> 
        </td>
        <td class="text-right">
            <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
            </button>
        </td>
        `;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = function (e) {
            removeToDo(row.getAttribute('id'));
        }
        
        row.children[3].appendChild(removeBtn);
    }

    btn.onclick = addToDo;

    /* 
        no la llamamos de esta forma  btn.onclick = addToDo();
        porque si no lo que haría sería ejecutar el retorno de la función addToDo() 
        
        cuando una función no devuelve nada se asume que va a retornar undefined
    */

});


