import { observable, action, makeObservable, computed } from 'mobx'
import axios from "axios";


export default class Taarees {
    constructor() {
        this.currentUser = {}
        
        makeObservable(this, {
            saveToLocalStorage: action,
            currentUser:observable,
            emptyLocalStorage:observable,
            checkLocalStorage:observable,
            save:observable
        })
    }

    saveToLocalStorage(){
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))             
    }

    
    emptyLocalStorage() {
        localStorage.clear()
        this.currentUser = {}
    }

    checkLocalStorage() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            this.currentUser = {}
            return
        }
        this.currentUser = currentUser
    }

    save(userName){
        this.currentUser = userName
        this.saveToLocalStorage()
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))    
    }


}


