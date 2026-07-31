/* ==================================
   JPC - JAVASCRIPT PÁGINAS PÚBLICAS
================================== */



/* =========================
   MODAIS
========================= */


function abrirModal(id){

    let modal = document.getElementById(id);

    if(modal){

        modal.style.display = "flex";

        document.body.style.overflow = "hidden";

    }

}



function fecharModal(id){

    let modal = document.getElementById(id);

    if(modal){

        modal.style.display = "none";

        document.body.style.overflow = "auto";

    }

}





/* fechar clicando fora */

window.onclick = function(event){

    let modais = document.querySelectorAll(".modal");


    modais.forEach(modal => {


        if(event.target === modal){

            modal.style.display = "none";

            document.body.style.overflow = "auto";

        }


    });


}





/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */


const botaoTopo = document.getElementById("voltarTopo");


if(botaoTopo){


window.addEventListener("scroll",()=>{


    if(window.scrollY > 300){

        botaoTopo.style.display="flex";

    }else{

        botaoTopo.style.display="none";

    }


});



botaoTopo.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});


}





/* =========================
   FILTRO SANTOS
========================= */


const botoesFiltro = document.querySelectorAll("[data-filtro]");


const santos = document.querySelectorAll(".santo-card");



botoesFiltro.forEach(botao=>{


botao.addEventListener("click",()=>{


let filtro = botao.dataset.filtro;



botoesFiltro.forEach(btn=>{

btn.classList.remove("ativo");

});


botao.classList.add("ativo");



santos.forEach(santo=>{


let categoria = santo.dataset.categoria;



if(filtro === "todos" || categoria.includes(filtro)){


santo.style.display="block";


}else{


santo.style.display="none";


}


});



});


});/* ==========================
   AVISO VÍDEO EM BREVE
========================== */


const botoesVideo = document.querySelectorAll(".btn-video");

const aviso = document.getElementById("avisoVideo");

const fecharAviso = document.getElementById("fecharAviso");


let tempoAviso;



botoesVideo.forEach(botao => {


    botao.addEventListener("click",()=>{


        if(aviso){


            aviso.classList.add("ativo");


            clearTimeout(tempoAviso);


            tempoAviso = setTimeout(()=>{


                aviso.classList.remove("ativo");


            },20000);


        }


    });


});





if(fecharAviso){


    fecharAviso.addEventListener("click",()=>{


        aviso.classList.remove("ativo");


        clearTimeout(tempoAviso);


    });


}