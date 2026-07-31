/* ==================================
   JPC - FORÇAR MENU MOBILE GLOBAL
   Todas as páginas
================================== */


document.addEventListener("DOMContentLoaded",()=>{


    const botao =
    document.getElementById("btnMenu");


    const menu =
    document.getElementById("menuMobile");



    if(!botao || !menu){

        console.log("Menu mobile não encontrado");

        return;

    }





    // Remove eventos antigos
    const novoBotao =
    botao.cloneNode(true);


    botao.parentNode.replaceChild(
        novoBotao,
        botao
    );




    novoBotao.addEventListener(
    "click",
    (e)=>{


        e.preventDefault();


        e.stopPropagation();



        menu.classList.toggle("ativo");



        console.log(
            "Menu mobile aberto"
        );



    });






    // Fecha ao clicar nos links


    menu
    .querySelectorAll("a")
    .forEach(link=>{


        link.addEventListener(
        "click",
        ()=>{


            menu.classList.remove(
                "ativo"
            );


        });


    });







    // Fecha clicando fora


    document.addEventListener(
    "click",
    (e)=>{


        if(

            !menu.contains(e.target)

            &&

            !novoBotao.contains(e.target)

        ){


            menu.classList.remove(
                "ativo"
            );


        }



    });




});