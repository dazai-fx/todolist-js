import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";
// exportamos la clase para poder importarla en app.js
export default class View {
    constructor(){
        this.model=null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filters();
        this.addTodoForm.onClick((title, description)=> this.addTodo(title, description));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
    }

    setModel(model){
        this.model=model;
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach(todo => this.createRow(todo));
    }

    filter(filters){
        // desestructuramos el objeto filters para obtener los valores que nos interesan
        const {type, words} = filters;
        //const rows = this.table.getElementsByTagName('tr'); // obtenemos todas las filas de la tabla
        /* for (const row of rows) {
            // el primer row es la cabecera, por lo que lo ignoramos
            console.log(row)
        } */
       // desesctructuramos el array para quedarnos con las filas que nos interesan (sin la cabecera que es el primer elemento lo indicamos con la coma y el resto de los elementos con ...rows) 
       const [, ...rows] = this.table.getElementsByTagName('tr');
       for(const row of rows){
            const [title, description, completed] = row.children;
            // esto es como si pusieramos const title = row.children[0]; pero más corto
            // const description = row.children[1]; y asi con todo lo que queramos de la fila
            let shouldHide = false; // por defecto no ocultamos nada
            if(words){
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words); // si no incluye las palabras ocultamos la fila
            }
            const shoulBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked; 
            
            if(type !== 'all' && shoulBeCompleted !== isCompleted){
                shouldHide= true; // si el tipo no es all y el estado no es el que queremos ocultamos la fila
            }

            if(shouldHide){
                row.classList.add('d-none') // ocultamos la fila
            }else{
                row.classList.remove('d-none') // mostramos la fila
            }
             
        }
    }

    addTodo(title, description){
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    removeToDo(id){
        this.model.removeToDo(id);
        document.getElementById(id).remove();   
    }

    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    editTodo(id, values){
        // llamamos al modelo pasandole el id y los valores del modal
        this.model.editTodo(id, values);
        // obtenemos la fila que queremos modificar y le asignamos los nuevos valores
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }
    
    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id); // le asignamos ese id y ademas voy a incrementarlo en 1,
        //  en los frameworks de javascript suelen utilizar el atributo key
        // en vez de ir creando los elementos del DOM asignando el valor y luego agregandolos a la fila,
        // lo que hacemos es asignar el valor directamente a la propiedad innerHTML de la fila 
        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">

        </td>
        <td class="text-right">
        
        </td>
        `;
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.completed;
        checkBox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkBox);
        
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        // Añadimos un atributo data-toggle con el valor modal para que se abra el modal al hacer click (bootstrap)
        editBtn.setAttribute('data-toggle', 'modal');
        // Añadimos un atributo data-target con el valor del id del modal (#modal) que queremos abrir (bootstrap)
        editBtn.setAttribute('data-target', '#modal');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.onclick = () => this.modal.setValues({
          id: todo.id,
          title: row.children[0].innerText,  
          description: row.children[1].innerText,
          completed: row.children[2].children[0].checked,
        });
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeToDo(todo.id);
        row.children[3].appendChild(removeBtn);

        

    }

}