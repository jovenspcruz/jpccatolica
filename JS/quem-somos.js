/* ==================================
   JPC - QUEM SOMOS JS
   Controle do Modal
================================== */



// ==================================
// ABRIR MODAL
// ==================================


window.abrirModal = function(){



    const modal =
    document.getElementById("modal");



    if(modal){



        modal.style.display="flex";


        document.body.style.overflow="hidden";



    }



};









// ==================================
// FECHAR MODAL
// ==================================


window.fecharModal = function(){



    const modal =
    document.getElementById("modal");



    if(modal){



        modal.style.display="none";


        document.body.style.overflow="auto";



    }



};









// ==================================
// FECHAR CLICANDO FORA
// ==================================


document.addEventListener(
"click",
(evento)=>{



    const modal =
    document.getElementById("modal");



    if(

        modal

        &&

        evento.target === modal

    ){



        fecharModal();



    }



});









// ==================================
// FECHAR COM ESC
// ==================================


document.addEventListener(
"keydown",
(evento)=>{



    if(evento.key==="Escape"){



        fecharModal();



    }



});