/* ==================================
   JPC - ORAÇÕES JS
   Modais + Pedidos de Oração
================================== */



/* ==================================
        ABRIR MODAL
================================== */


window.abrirModal = function(id){


    const modal =
    document.getElementById(id);



    if(modal){


        modal.style.display="flex";


        document.body.style.overflow="hidden";


    }


};







/* ==================================
        FECHAR MODAL
================================== */


window.fecharModal = function(id){


    const modal =
    document.getElementById(id);



    if(modal){


        modal.style.display="none";


        document.body.style.overflow="auto";


    }


};









/* ==================================
        FECHAR CLICANDO FORA
================================== */


document.addEventListener("click",(evento)=>{


    if(
        evento.target.classList.contains("modal")
    ){


        evento.target.style.display="none";


        document.body.style.overflow="auto";


    }



});









/* ==================================
        FECHAR COM ESC
================================== */


document.addEventListener("keydown",(evento)=>{


    if(evento.key==="Escape"){



        document
        .querySelectorAll(".modal")
        .forEach(modal=>{


            modal.style.display="none";


        });



        document.body.style.overflow="auto";


    }


});









/* ==================================
        PEDIDOS DE ORAÇÃO
================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    const pedidos =
    document.getElementById("listaPedidos");



    if(!pedidos)
        return;





    const lista = JSON.parse(

        localStorage.getItem(
            "pedidosOracaoJPC"
        )

    ) || [];





    pedidos.innerHTML="";





    if(lista.length===0){


        pedidos.innerHTML=`

        <div class="pedido-vazio">

            <h3>
            Nenhum pedido de oração ainda.
            </h3>

            <p>
            Seja o primeiro a colocar sua intenção de oração.
            </p>

        </div>

        `;


        return;


    }







    lista.forEach(pedido=>{



        pedidos.innerHTML += `


        <div class="pedido-card">


            <h3>
                ${pedido.nome || "Anônimo"}
            </h3>



            <p>
                ${pedido.mensagem}
            </p>



        </div>



        `;



    });




});
/* ==================================
   CORREÇÃO MENU MOBILE ORAÇÕES
================================== */


document.addEventListener("DOMContentLoaded",()=>{


    const btn =
    document.getElementById("btnMenu");


    const menu =
    document.getElementById("menuMobile");



    if(!btn || !menu)
        return;




    btn.onclick = (e)=>{


        e.stopPropagation();


        menu.classList.toggle("ativo");


    };





    document.addEventListener("click",(e)=>{


        if(

            !menu.contains(e.target)

            &&

            !btn.contains(e.target)

        ){


            menu.classList.remove("ativo");


        }


    });



});