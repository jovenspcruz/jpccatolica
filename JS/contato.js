/* ==================================
   JPC - CONTATO JS
   Modal de mensagem
================================== */



// ==================================
// INICIAR CONTATO
// ==================================

document.addEventListener("DOMContentLoaded",()=>{


    const formulario =
    document.getElementById("formContato");


    const modal =
    document.getElementById("modalContato");



    if(formulario && modal){



        formulario.addEventListener("submit",()=>{


            setTimeout(()=>{


                modal.style.display="flex";


                document.body.style.overflow="hidden";


            },500);



        });



    }



});









// ==================================
// ABRIR MODAL
// ==================================


window.abrirModalContato=function(){



    const modal =
    document.getElementById("modalContato");



    if(modal){


        modal.style.display="flex";


        document.body.style.overflow="hidden";


    }



};









// ==================================
// FECHAR MODAL
// ==================================


window.fecharModal=function(){



    const modal =
    document.getElementById("modalContato");



    if(modal){



        modal.style.display="none";


        document.body.style.overflow="auto";


    }



};









// ==================================
// FECHAR CLICANDO FORA
// ==================================


document.addEventListener("click",(evento)=>{



    const modal =
    document.getElementById("modalContato");



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


document.addEventListener("keydown",(evento)=>{



    if(evento.key==="Escape"){



        fecharModal();



    }



});