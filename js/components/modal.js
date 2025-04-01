import Alert from './alert.js';
export default class Modal {
    constructor(){
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.completed = document.getElementById('modal-completed');
        this.todo = null;
        this.alert = new Alert('modal-alert');
    }

    setValues(todo){
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
    }

    onClick(callback){
        
        this.btn.onclick = () => {
            // este if es equivalente a if(this.title.value === '' || this.description.value === '') pero más corto pero así nos cubre nulos y undefined
            if(!this.title.value || !this.description.value) {
                this.alert.show('Title and description are required');
                return;
            }
            // Utilizamos el método modal que viene de bootstrap (jquery) para cerrar el modal (viene en la documentacion de bootstrap 4.6 buscando modal y dentro modal(toggle))
            $('#modal').modal('toggle');
            // llamamos al callback que nos pasaron por parametro y le pasamos el id del todo y los valores del modal
            callback(this.todo.id, {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            });
        }
        
    }
}