// ==================================
// JPC - ÁREA EM DESENVOLVIMENTO
// CONTROLE DE ACESSO
// ==================================




// ================================
// VOLTAR PARA PAINEL CORRETO
// ================================


function voltarPainel(){



    let usuario = JSON.parse(

        localStorage.getItem("usuarioLogado")

    );





    if(!usuario){


        window.location.href="admin-login.html";


        return;


    }






    if(usuario.cargo === "Administrador"){



        window.location.href="painel.html";



    }else{



        window.location.href="equipe-painel.html";



    }





}









// ================================
// ANIMAÇÃO DOS CARDS
// ================================


const cards = document.querySelectorAll(".card");



cards.forEach((card,index)=>{



    card.style.opacity="0";

    card.style.transform="translateY(30px)";



    setTimeout(()=>{


        card.style.transition=".6s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";



    }, index * 150);



});









// ================================
// DATA DE ATUALIZAÇÃO
// ================================


const mensagem = document.querySelector(".mensagem");



if(mensagem){



    let data = new Date();



    let dataFormatada =

    data.toLocaleDateString("pt-BR");





    mensagem.innerHTML += `

    <small>

    Última atualização: ${dataFormatada}

    </small>

    `;



}









// ================================
// PÁGINAS BLOQUEADAS
// ================================


function paginaDesenvolvimento(nome){



    alert(

    "🚧 A página "

    + nome +

    " ainda está em desenvolvimento."

    );



}