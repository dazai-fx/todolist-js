export default class Filters {
    constructor(){
        // obtenemos el formulario completo (no vamos a coger cada input por separado, para ver otras formas de hacerlo)
        this.form = document.getElementById('filters');
        this.btn = document.getElementById('search');
    }
    
    onClick(callback){
        this.btn.onclick = (e) => {
            // los botones de los forms hacen submit (envia info y refresca la página) por defecto, por lo que tenemos que evitarlo
            e.preventDefault();
            // obtenemos los datos del formulario (esto es un objeto que contiene todos los inputs del formulario y sus valores, muy util para react y angular)
            const data = new FormData(this.form);
            callback({
                type: data.get('type'),
                words: data.get('words'),
            })
        }
    }

}