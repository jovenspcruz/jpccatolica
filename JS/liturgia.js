/* ==================================
   JPC - LITURGIA
   Modal + Liturgia Diária
================================== */



// ==================================
// ABRIR MODAL GENÉRICO
// ==================================


window.abrirModal=function(id){


    const modal =
    document.getElementById(id);



    if(modal){


        modal.style.display="flex";


    }


};







// ==================================
// FECHAR MODAL GENÉRICO
// ==================================


window.fecharModal=function(id){


    const modal =
    document.getElementById(id);



    if(modal){


        modal.style.display="none";


    }


};









// ==================================
// MODAL LITURGIA DIÁRIA
// ==================================



window.abrirLiturgia=function(){



    const modal =
    document.getElementById(
        "modalLiturgia"
    );



    if(modal){


        modal.classList.add(
            "ativo"
        );


        document.body.style.overflow=
        "hidden";


    }



};









window.fecharLiturgia=function(){



    const modal =
    document.getElementById(
        "modalLiturgia"
    );



    if(modal){


        modal.classList.remove(
            "ativo"
        );


        document.body.style.overflow=
        "auto";


    }



};









// ==================================
// FECHAR CLICANDO FORA
// ==================================



window.addEventListener(
"click",
(evento)=>{



    document
    .querySelectorAll(
        ".modal"
    )
    .forEach(modal=>{



        if(evento.target === modal){


            modal.style.display=
            "none";


        }



    });








    const modalLiturgia =
    document.getElementById(
        "modalLiturgia"
    );



    if(

        modalLiturgia &&

        evento.target === modalLiturgia

    ){


        fecharLiturgia();


    }



});









// ==================================
// FECHAR COM ESC
// ==================================



document.addEventListener(
"keydown",
(evento)=>{



    if(evento.key==="Escape"){



        document
        .querySelectorAll(
            ".modal"
        )
        .forEach(modal=>{


            modal.style.display=
            "none";


        });




        fecharLiturgia();



    }



});









// ==================================
// CONTEÚDO EXEMPLO
// FUTURO FIREBASE
// ==================================



document.addEventListener(
"DOMContentLoaded",
()=>{



    const data =
    document.getElementById(
        "dataLiturgia"
    );


    const leitura =
    document.getElementById(
        "leituraLiturgia"
    );


    const salmo =
    document.getElementById(
        "salmoLiturgia"
    );


    const evangelho =
    document.getElementById(
        "evangelhoLiturgia"
    );


    const reflexao =
    document.getElementById(
        "reflexaoLiturgia"
    );





    if(data){


        data.innerHTML =
        "Liturgia do dia";


    }



    if(leitura){


        leitura.innerHTML =
        "Primeira leitura será adicionada.";


    }



    if(salmo){


        salmo.innerHTML =
        "Salmo será adicionado.";


    }



    if(evangelho){


        evangelho.innerHTML =
        "Evangelho do dia será adicionado.";


    }



    if(reflexao){


        reflexao.innerHTML =
        "Uma reflexão para aproximar os jovens de Cristo.";


    }




});
function abrirPaulus(){

    const modal = document.getElementById("modalPaulus");

    modal.style.display = "flex";

}


function fecharPaulus(){

    document.getElementById("modalPaulus").style.display="none";

}