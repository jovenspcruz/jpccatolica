// ==================================
// JPC - EVENTOS
// AVISO DESENVOLVIMENTO
// ==================================


document.addEventListener(
"DOMContentLoaded",

()=>{


    const modal = document.getElementById(
        "avisoEventos"
    );


    if(modal){


        modal.style.display = "flex";


        // impede interação com a página atrás

        document.body.style.overflow = "hidden";


    }


});





// ==================================
// VOLTAR PARA INÍCIO
// ==================================

window.voltarInicioEventos = function(){


    window.location.href =
    "inicio.html";


};
