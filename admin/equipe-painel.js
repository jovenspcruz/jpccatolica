// ==================================
// JPC - PAINEL DA EQUIPE
// COORDENADOR + MEMBRO
// ==================================


// ================================
// SESSÃO
// ================================


let sessao = JSON.parse(

    localStorage.getItem("usuarioLogado")

);




if(!sessao){


    window.location.href="admin-login.html";


}









// ================================
// BUSCAR USUÁRIO DA EQUIPE
// ================================


let usuarios = JSON.parse(

    localStorage.getItem("usuariosJPC")

) || [];






let usuario = usuarios.find(


    u => u.id === sessao.id


);






// caso não encontre

if(!usuario){


    usuario = sessao;


}








// ================================
// BLOQUEAR ADMIN
// ================================


if(usuario.cargo === "Administrador"){


    window.location.href="painel.html";


}









// ================================
// ELEMENTOS
// ================================


const nome =

document.getElementById("nomeUsuario");



const cargo =

document.getElementById("cargoUsuario");



const mensagem =

document.getElementById("boasVindas");



const foto =

document.getElementById("fotoUsuario");









// ================================
// MOSTRAR DADOS
// ================================


function carregarUsuario(){



if(!usuario)return;





if(nome){


    nome.textContent =

    usuario.nome;


}




if(cargo){


    cargo.textContent =

    usuario.cargo;


}




if(mensagem){


    mensagem.textContent =


    "Salve Maria, "

    +

    usuario.nome

    +

    "!";


}




if(foto){



    "../imagens/jpc-avatar.png";



}





}





carregarUsuario();









// ================================
// CARDS
// ================================


const cardMembros =

document.getElementById("cardMembros");



const cardAdicionar =

document.getElementById("cardAdicionar");



const cardRelatorios =

document.getElementById("cardRelatorios");


const cardAvisos =

document.getElementById("cardAvisos");










function esconderCoordenador(){



if(cardMembros){

    cardMembros.style.display="none";

}



if(cardAdicionar){

    cardAdicionar.style.display="none";

}



if(cardRelatorios){

    cardRelatorios.style.display="none";

}


if(cardAvisos){

    cardAvisos.style.display="flex";

}


}









function liberarCoordenador(){



if(cardMembros){

    cardMembros.style.display="flex";

}



if(cardAdicionar){

    cardAdicionar.style.display="flex";

}



if(cardRelatorios){

    cardRelatorios.style.display="flex";

}

if(cardAvisos){

    cardAvisos.style.display="flex";

}


}









// ================================
// PERMISSÕES
// ================================



if(usuario.cargo === "Coordenador"){



    liberarCoordenador();



}






else if(usuario.cargo === "Membro"){



    esconderCoordenador();



}






else{


    esconderCoordenador();


}









// ================================
// SAIR
// ================================


function sairEquipe(){



    localStorage.removeItem(

        "usuarioLogado"

    );



    localStorage.removeItem(

        "jpcEquipe"

    );



    window.location.href="../HTMls/inicio.html"


}// ==================================
// JPC - AVISOS DA EQUIPE
// ==================================


function carregarAvisosEquipe(){


    let avisos = JSON.parse(

        localStorage.getItem("avisosEquipeJPC")

    ) || [];



    let novos = avisos.filter(

        aviso => aviso.lido !== true

    );



    // CONTADOR DO SININHO

    let contador = document.getElementById(
        "contadorAvisos"
    );


    if(contador){


        contador.innerHTML = novos.length;


        if(novos.length === 0){

            contador.style.display="none";

        }else{

            contador.style.display="block";

        }


    }







    // AVISO NO PC


    if(window.innerWidth > 600 && novos.length > 0){



        let aviso = novos[0];



        let caixa = document.getElementById(
            "notificacaoAviso"
        );



        if(caixa){



            caixa.innerHTML = `


            <h3>
            📢 ${aviso.titulo}
            </h3>


            <p>
            ${aviso.mensagem}
            </p>



            <button onclick="abrirAvisoEquipe('${aviso.id}')">

            Ver aviso

            </button>



            `;



            caixa.style.display="block";



        }


    }



}





// ==================================
// ABRIR AVISO
// ==================================


function abrirAvisoEquipe(id){



    let avisos = JSON.parse(

        localStorage.getItem("avisosEquipeJPC")

    ) || [];



    let aviso = avisos.find(

        a => a.id === id

    );



    if(!aviso)return;




    alert(

        "📢 " + aviso.titulo +

        "\n\n" +

        aviso.mensagem

    );



    aviso.lido = true;



    localStorage.setItem(

        "avisosEquipeJPC",

        JSON.stringify(avisos)

    );



    carregarAvisosEquipe();



}






// ==================================
// SININHO CELULAR
// ==================================


let sininho = document.getElementById(

    "sininhoMobile"

);



if(sininho){



    sininho.addEventListener("click",()=>{


        let avisos = JSON.parse(

            localStorage.getItem("avisosEquipeJPC")

        ) || [];



        let novos = avisos.filter(

            aviso => aviso.lido !== true

        );




        if(novos.length === 0){


            alert("Nenhum aviso novo.");


            return;


        }




        let texto = "";



        novos.forEach(aviso=>{


            texto += 

            "📢 " +

            aviso.titulo +

            "\n" +

            aviso.mensagem +

            "\n\n";


        });





        alert(texto);





        avisos.forEach(aviso=>{


            aviso.lido = true;


        });




        localStorage.setItem(

            "avisosEquipeJPC",

            JSON.stringify(avisos)

        );



        carregarAvisosEquipe();



    });



}







// INICIAR

window.addEventListener(

    "load",

    carregarAvisosEquipe

);
// ==================================
// CARDS EXCLUSIVOS COORDENADOR
// ==================================

let usuarioPainel = JSON.parse(
    localStorage.getItem("usuarioLogado")
);


let cardsCoordenador = document.querySelectorAll(
    ".coordenador"
);



cardsCoordenador.forEach(card => {


    if(
        usuarioPainel &&
        usuarioPainel.cargo === "Coordenador"
    ){

        card.style.display = "block";


    }else{


        card.style.display = "none";


    }


});// ==================================
// JPC - NOTIFICAÇÃO DE AVISOS EQUIPE
// PC + MOBILE
// ==================================


let avisoAtual = null;



// ==================================
// CARREGAR AVISOS
// ==================================


function carregarAvisosEquipe(){



    let usuario = JSON.parse(

        localStorage.getItem("usuarioLogado")

    );



    if(!usuario) return;




    let avisos = JSON.parse(

        localStorage.getItem("avisosJPC")

    ) || [];





    let avisosPermitidos = avisos.filter(aviso => {



        return (

            aviso.destino === "equipe" ||

            aviso.destino === "ambos"

        );



    });







    if(avisosPermitidos.length){



        avisoAtual =

        avisosPermitidos[

            avisosPermitidos.length - 1

        ];



        mostrarAvisoEquipe(avisoAtual);



    }



}








// ==================================
// MOSTRAR NOTIFICAÇÃO
// ==================================


function mostrarAvisoEquipe(aviso){



    let modal = document.getElementById(

        "modalAviso"

    );



    if(!modal) return;





    document.getElementById(

        "tituloAviso"

    ).innerHTML = aviso.titulo || "Novo aviso";







    let resumo = aviso.mensagem || "";




    if(resumo.length > 120){


        resumo =

        resumo.substring(0,120)

        + "...";


    }






    document.getElementById(

        "resumoAviso"

    ).innerHTML = resumo;







    modal.style.display = "block";



}








// ==================================
// FECHAR AVISO
// ==================================


function fecharAviso(){



    let modal = document.getElementById(

        "modalAviso"

    );



    if(modal){


        modal.style.display="none";


    }


}








// ==================================
// ABRIR AVISO COMPLETO
// ==================================

function abrirAvisoCompleto(){


    if(!avisoAtual) return;



    document.getElementById("tituloCompleto").innerHTML =
    avisoAtual.titulo;



    document.getElementById("mensagemCompleta").innerHTML =
    avisoAtual.mensagem;



    document.getElementById("autorCompleto").innerHTML =
    "Por: " + (avisoAtual.criadoPor || "JPC");



    document.getElementById("dataCompleto").innerHTML =
    avisoAtual.data || "";



    document.getElementById("modalAvisoCompleto").style.display =
    "flex";


}function fecharAvisoCompleto(){

    document.getElementById(
        "modalAvisoCompleto"
    ).style.display = "none";

}