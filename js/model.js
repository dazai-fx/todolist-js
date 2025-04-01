// exportamos la clase para poder importarla en app.js
export default class Model {
    constructor(){
        this.view=null;
        this.todos= JSON.parse(localStorage.getItem('todos')); // obtenemos los todos del localStorage
        if(!this.todos || this.todos.length < 1){ // si no hay todos o la longitud nos cubre la lista vacía o los nulos
            this.todos = [
                {
                    id: 0,
                    title: 'Aprender JavaScript',
                    description: 'Ver tutoriales de JavaScript',
                    completed: false,
                }
            ]
            this.currentId=1; // si no hay todos, el id inicial será 1
        }else{
            this.currentId = this.todos[this.todos.length - 1].id + 1; // si hay todos, el id inicial será el último id + 1
        }
        
    }
    setView(view){
        this.view=view;
    }

    save(){
        // guardamos los todos en el localStorage convirtiendolos a objetos en formato cadena (JSON)
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos(){
        // Pasamos una copia de los todos para evitar problemas de referencias 
        /* const todos = [];
        for (const todo of this.todos) {
            todos.push(todo); // añadimos cada todo a la copia
        }
        return todos; */
        // podemos usar map para hacerlo todo en una línea 
        return this.todos.map(todo => ({...todo})); // los parentesis son para que no se confunda con el bloque de código y el spreed operators para clonar el objeto
    }

    addTodo(title, description){
        // este tipo de objetos se asimilan a los hashMaps de java, pero tambien podemos añadir métodos dentro
        // son tambien parecidos al concepto de diccionarios en python: clave valor
        /* const todo = {
            id: this.currentId++, // incrementamos el id en 1
            title: title,
            description: description,
            completed: false
        }; */
        // en js moderno podemos evitar repetir el nombre de la clave y el valor si se llaman igual
        const todo = {
            id: this.currentId++, 
            title,
            description,
            completed: false,
        }
        this.todos.push(todo);
        console.log(this.todos);
        this.save();
        //return Object.assign({}, todo); // para evitar que se modifique el objeto original retornamos un clon 
        return {...todo}; // spreed operator, es lo mismo que Object.assign({}, todo);
    }

    // extraemos el findIndex para poder reutilizarlo
    findToDo(id){
        // findIndex sería lo mismo que hacer un for y recorrer el array pero mucho más corto
        return this.todos.findIndex(todo => todo.id == id)
    }

    removeToDo(id){
        const index = this.findToDo(id);
        // splice: le damos un indice y le decimos el número de elementos que queremos borrar
        this.todos.splice(index, 1);
        this.save();
    }

    toggleCompleted(id){
        const index = this.findToDo(id); // obtenemos el indice del todo que queremos modificar
        const todo = this.todos[index]; // obtenemos el todo que queremos modificar
        todo.completed = !todo.completed; // invertimos el valor de completed
        console.log(this.todos)
        this.save();
    }

    editTodo(id, values){
        const index = this.findToDo(id); // obtenemos el indice del todo que queremos modificar
        Object.assign(this.todos[index], values); // modificamos el todo con los nuevos valores
        this.save(); // guardamos los cambios en el localStorage
    }

}