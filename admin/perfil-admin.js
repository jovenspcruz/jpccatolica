// ==================================
// JPC - PERFIL ADMIN
// ADMIN FIXO adminJPC
// ==================================



// ==================================
// VOLTAR PAINEL
// ==================================

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






// ==================================
// BUSCAR ADMIN FIXO
// ==================================


let admin = JSON.parse(

    localStorage.getItem("adminJPC")

);





if(!admin){


    alert("Administrador não encontrado!");

    window.location.href="admin-login.html";


}







// ==================================
// CARREGAR PERFIL
// ==================================


function carregarAdmin(){



    document.getElementById("nomeAdmin").innerHTML =

    admin.nome || "--";





    document.getElementById("usuarioAdmin").innerHTML =

    admin.usuario || "--";





    document.getElementById("emailAdmin").innerHTML =

    admin.email || "Não informado";





    document.getElementById("dataAdmin").innerHTML =

    admin.dataCriacao || "--";







    document.getElementById("fotoAdmin").src =

    admin.foto ||

    "../imagens/behh.jpc.jpg";







    document.getElementById("editarNomeAdmin").value =

    admin.nome || "";





    document.getElementById("editarUsuarioAdmin").value =

    admin.usuario || "";





    document.getElementById("editarEmailAdmin").value =

    admin.email || "";






    if(document.getElementById("descricaoPublicaAdmin")){


        document.getElementById("descricaoPublicaAdmin").value =

        admin.descricaoPublica || "";


    }



    carregarTema();


}





carregarAdmin();











// ==================================
// SALVAR ADMIN
// ==================================


function salvarAdmin(){



    localStorage.setItem(

        "adminJPC",

        JSON.stringify(admin)

    );



    // mantém a sessão atualizada

    localStorage.setItem(

        "usuarioLogado",

        JSON.stringify(admin)

    );


}









// ==================================
// FOTO ADMIN
// ==================================


let inputFoto = document.getElementById(

    "inputFoto"

);




if(inputFoto){



    inputFoto.addEventListener(

    "change",

    function(){



        let arquivo = this.files[0];



        if(!arquivo)return;





        let leitor = new FileReader();





        leitor.onload=function(e){



            admin.foto = e.target.result;



            salvarAdmin();





            document.getElementById(

                "fotoAdmin"

            ).src = e.target.result;



            alert(

            "Foto atualizada!"

            );



        };





        leitor.readAsDataURL(arquivo);



    });



}









// ==================================
// SALVAR PERFIL
// ==================================


function salvarPerfilAdmin(){





    admin.nome = document.getElementById(

        "editarNomeAdmin"

    ).value.trim();





    admin.usuario = document.getElementById(

        "editarUsuarioAdmin"

    ).value.trim();





    admin.email = document.getElementById(

        "editarEmailAdmin"

    ).value.trim();






    let senha = document.getElementById(

        "editarSenhaAdmin"

    ).value.trim();





    if(senha){


        admin.senha = senha;


    }






    salvarAdmin();



    alert(

    "Perfil administrador atualizado!"

    );



    carregarAdmin();



}









// ==================================
// DESCRIÇÃO PÚBLICA
// ==================================


function salvarDescricaoPublicaAdmin(){



    let campo = document.getElementById(

        "descricaoPublicaAdmin"

    );



    if(!campo)return;




    admin.descricaoPublica = campo.value;




    salvarAdmin();



    alert(

    "Descrição pública atualizada!"

    );



}









// ==================================
// TEMA INDIVIDUAL
// ==================================


function carregarTema(){



    let tema = admin.tema || "escuro";



    document.body.classList.remove(

        "tema-claro",

        "tema-escuro"

    );



    document.body.classList.add(

        "tema-"+tema

    );


}






function alterarTema(tema){



    admin.tema = tema;



    salvarAdmin();



    document.body.classList.remove(

        "tema-claro",

        "tema-escuro"

    );



    document.body.classList.add(

        "tema-"+tema

    );


}









// ==================================
// CONFIGURAÇÕES
// ==================================


function abrirConfiguracoes(){


    document.getElementById(

        "modalConfig"

    ).style.display="flex";


}





function fecharConfiguracoes(){


    document.getElementById(

        "modalConfig"

    ).style.display="none";


}









// ==================================
// NOTIFICAÇÕES
// ==================================


let notificacoes = document.getElementById(

    "notificacoesAdmin"

);



if(notificacoes){



    notificacoes.checked =

    admin.notificacoes ?? true;





    notificacoes.addEventListener(

    "change",

    ()=>{


        admin.notificacoes =

        notificacoes.checked;



        salvarAdmin();



    });



}









// ==================================
// SONS
// ==================================


let sons = document.getElementById(

    "sonsAdmin"

);



if(sons){



    sons.checked =

    admin.sons ?? true;





    sons.addEventListener(

    "change",

    ()=>{


        admin.sons =

        sons.checked;



        salvarAdmin();



    });



}









// ==================================
// SAIR
// ==================================


function sairAdmin(){



    localStorage.removeItem(

        "usuarioLogado"

    );



    localStorage.removeItem(

        "jpcAdmin"

    );



    window.location.href=

    "admin-login.html";


}