// ==================================
// JPC - PAINEL ADMIN
// ADMIN FIXO (adminJPC)
// ==================================



let sessao = JSON.parse(

    localStorage.getItem("usuarioLogado")

);





if(!sessao){


    window.location.href="admin-login.html";


}







let usuario = null;





// ==================================
// BUSCAR ADMIN FIXO
// ==================================


if(sessao.cargo === "Administrador"){



    usuario = JSON.parse(

        localStorage.getItem("adminJPC")

    );



}






// ==================================
// BUSCAR EQUIPE
// ==================================


if(!usuario){



    let usuarios = JSON.parse(

        localStorage.getItem("usuariosJPC")

    ) || [];





    usuario = usuarios.find(

        u => u.id === sessao.id

    );



}






// SEGURANÇA

if(!usuario){


    usuario = sessao;


}








// ==================================
// MOSTRAR DADOS
// ==================================



const nomeTopo = document.getElementById(
    "nomeUsuarioTopo"
);



const mensagem = document.getElementById(
    "boasVindas"
);



const cargo = document.getElementById(
    "cargoUsuario"
);



const foto = document.getElementById(
    "fotoUsuario"
);








if(usuario){



    if(nomeTopo){

        nomeTopo.textContent =
        usuario.nome;

    }





    if(mensagem){


        mensagem.textContent =

        "Salve Maria, " + usuario.nome + "!";


    }





    if(cargo){


        cargo.textContent =

        usuario.cargo;


    }






    
if(foto){

    if(usuario.cargo === "Administrador"){

        foto.src = "../imagens/behh.jpc.jpg";

    }else{

        foto.src = usuario.foto || "../imagens/jpc-avatar.png";

    }

}

    



}









// ==================================
// SAIR
// ==================================


function sair(){



    localStorage.removeItem(

        "usuarioLogado"

    );



    localStorage.removeItem(

        "jpcAdmin"

    );



    window.location.href="admin-login.html";



}