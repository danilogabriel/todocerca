
import firebase from 'firebase'

//----------  CONFIG A BASE ANTERIOR DE 800 USUARIOS DE PRUEBA ---------
/*
let config = {
    apiKey: "AIzaSyBfOcQPEU7BbwGZ4oJFbUn0IohKq1Q4aXM",
    authDomain: "gestiontodocerca.firebaseapp.com",
    databaseURL: "https://gestiontodocerca.firebaseio.com",
    projectId: "gestiontodocerca",
    storageBucket: "gestiontodocerca.appspot.com",
    messagingSenderId: "149888067000"
  }
*/

//------------------  CONFIG A BASE NUEVA TODO CERCA  ----------------------
//----  URL de la Base:   https://todocerca9.firebaseio.com/

let config = {
    apiKey: "AIzaSyAlWOCFtTWb4QnlIzKqjDHVc2xcL7XDg30",
    authDomain: "todocerca9.firebaseapp.com",
    databaseURL: "https://todocerca9.firebaseio.com",
    projectId: "todocerca9",
    storageBucket: "todocerca9.appspot.com",
    messagingSenderId: "955796542845"
 };


let app = firebase.initializeApp(config)
let db = app.database()
export default db
