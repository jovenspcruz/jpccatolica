// ==================================
// JPC - ADMIN LOGIN
// FIREBASE
// ==================================


import {

    collection,
    getDocs

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


import { db } from "../FIREBASE/firebase-init.js";






const form = document.getElementById("loginForm");


const usuarioInput = document.getElementById("usuario");


const senhaInput = document.getElementById("senha");









// ==================================
// LOGIN
// ==================================


form.addEventListener(

"submit",

async function(e){



e.preventDefault();





let usuarioDigitado =

usuarioInput.value.trim();





let senhaDigitada =

senhaInput.value.trim();







let usuarioEncontrado = null;








const resultado = await getDocs(

    collection(db,"usuarios")

);







resultado.forEach((documento)=>{


    let usuario = documento.data();



    if(

    usuario.usuario &&

    usuario.usuario.toLowerCase()

    ===

    usuarioDigitado.toLowerCase()

    &&

    usuario.senha === senhaDigitada

){



        usuarioEncontrado = {


            id: documento.id,


            ...usuario



        };



    }



});









if(!usuarioEncontrado){



alert(

"Usuário ou senha incorretos!"

);



return;



}









// salva sessão


localStorage.setItem(

"usuarioLogado",

JSON.stringify(usuarioEncontrado)

);









// redirecionamento

console.log(usuarioEncontrado);

if(

usuarioEncontrado.cargo === "Administrador"

){



localStorage.setItem(

"jpcAdmin",

"logado"

);



window.location.href="painel.html";



}






else{



localStorage.setItem(

"jpcEquipe",

"logado"

);



window.location.href="equipe-painel.html";



}





});