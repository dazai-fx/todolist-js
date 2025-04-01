export default class Alert {
    // recibimos el alertId para saber cual de los dos alerts queremos manejar
    constructor(alertId){
        this.alert = document.getElementById(alertId);
    }
    show(message){
        this.alert.innerHTML = message;
        this.alert.classList.remove('d-none');
    }
    hide(){
        this.alert.classList.add('d-none');
    }
}