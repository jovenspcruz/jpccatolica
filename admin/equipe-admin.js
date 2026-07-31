// ==================================
// JPC - EQUIPE ADMIN
// EQUIPE + SITE PUBLICO
// ==================================

import { db } from "../FIREBASE/firebase-init.js";

import {

    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
// ================================
// SESSÃO
// ================================


let usuarioLogado = JSON.parse(

    localStorage.getItem("usuarioLogado")

);



if(!usuarioLogado){

    window.location.href = "admin-login.html";

}







// ================================
// BANCO DE USUÁRIOS
// ================================

let usuarios = [];




let membroSelecionado = null;









// ================================
// INICIAR
// ================================


window.onload = function(){


    verificarPermissao();


    carregarUsuarios();


};









// ================================
// PERMISSÕES
// ================================


function verificarPermissao(){



const cadastro = document.querySelector(".cadastro");


const cargo = document.getElementById("cargo");





if(!usuarioLogado){

    return;

}






// ADMINISTRADOR


if(usuarioLogado.cargo === "Administrador"){



    if(cadastro){

        cadastro.style.display = "block";

    }





    if(cargo){


        cargo.innerHTML = `


        <option value="Membro">

        Membro

        </option>


        <option value="Coordenador">

        Coordenador

        </option>


        <option value="Administrador">

        Administrador

        </option>


        `;


    }


}








// COORDENADOR


else if(usuarioLogado.cargo === "Coordenador"){



    if(cadastro){

        cadastro.style.display = "block";

    }




    if(cargo){


        cargo.innerHTML = `


        <option value="Membro">

        Membro

        </option>


        `;


    }


}







// MEMBRO


else{


    if(cadastro){

        cadastro.style.display = "none";

    }


}



}











// ================================
// CADASTRAR MEMBRO
// ================================


async function cadastrarMembro(){



let nome = document

.getElementById("nome")

.value

.trim();





let login = document

.getElementById("login")

.value

.trim();





let senha = document

.getElementById("senha")

.value

.trim();





let data = document

.getElementById("dataEntrada")

.value;





let ministerio = document

.getElementById("ministerio")

.value;





let cargo = document

.getElementById("cargo")

.value;









if(!nome || !login || !senha){



alert(

"Preencha todos os campos!"

);


return;


}







if(

usuarioLogado.cargo === "Coordenador"

&&

cargo !== "Membro"

){



alert(

"Coordenadores só podem criar membros!"

);


return;


}








let existe = usuarios.find(


usuario =>


usuario.usuario.toLowerCase()

===

login.toLowerCase()



);






if(existe){



alert(

"Usuário já existe!"

);


return;


}








let novoUsuario = {



id:

"user_"+Date.now(),




nome:nome,




usuario:login,




senha:senha,




cargo:cargo,




ministerio:ministerio,




dataCriacao:

data ||

new Date()

.toLocaleDateString("pt-BR"),




foto:

"../imagens/jpc-avatar.png",




status:

"Ativo",




publico:true



};





await addDoc(

    collection(db, "usuarios"),

    novoUsuario

);


alert(
"Usuário cadastrado!"
);





limparCampos();




const resultado = await getDocs(
    collection(db,"usuarios")
);



}









// ================================
// LIMPAR CAMPOS
// ================================


function limparCampos(){



document.getElementById("nome").value="";


document.getElementById("login").value="";


document.getElementById("senha").value="";


document.getElementById("dataEntrada").value="";



}// ================================
// LISTAR USUÁRIOS
// ================================


async function carregarUsuarios(){


let lista = document.getElementById("listaMembros");


if(!lista) return;



lista.innerHTML = "";



const resultado = await getDocs(

    collection(db,"usuarios")

);



usuarios = [];



resultado.forEach((documento)=>{


    usuarios.push({

        id: documento.id,

        ...documento.data()

    });


});






usuarios.forEach(usuario=>{



let card = document.createElement("div");



card.className = "usuario-card";





card.innerHTML = `


<img src="${usuario.foto || '../imagens/jpc-avatar.png'}">


<div>

<h3>${usuario.nome}</h3>

<p>${usuario.cargo}</p>

<p>${usuario.ministerio || "--"}</p>

</div>



<button onclick="abrirPerfil('${usuario.id}')">

👁 Ver

</button>


`;



lista.appendChild(card);



});



}









// ================================
// ABRIR PERFIL
// ================================


function abrirPerfil(id){



membroSelecionado = usuarios.find(


usuario => usuario.id === id


);





if(!membroSelecionado){

    return;

}







document.getElementById("modalFoto").src =


membroSelecionado.foto ||

"../imagens/jpc-avatar.png";







document.getElementById("modalNome").innerHTML =


membroSelecionado.nome;







document.getElementById("modalMinisterio").innerHTML =


membroSelecionado.ministerio || "--";







document.getElementById("modalCargo").innerHTML =


membroSelecionado.cargo;







document.getElementById("modalLogin").innerHTML =


membroSelecionado.usuario;







document.getElementById("modalStatus").innerHTML =


membroSelecionado.status || "Ativo";







document.getElementById("modalData").innerHTML =


membroSelecionado.dataCriacao || "--";







document.getElementById("modalPerfil").style.display = "flex";



}









// ================================
// FECHAR MODAL
// ================================


function fecharModal(){


document.getElementById("modalPerfil").style.display="none";


}









// ================================
// EXCLUIR USUÁRIO
// ================================

async function excluirMembro(){


if(!membroSelecionado){

    return;

}



let confirmar = confirm(
"Tem certeza que deseja excluir este usuário?"
);



if(!confirmar){

    return;

}




await deleteDoc(

    doc(
        db,
        "usuarios",
        membroSelecionado.id
    )

);




alert(
"Usuário excluído!"
);



fecharModal();



carregarUsuarios();



}









// ================================
// BANCO
// ================================


function salvarBanco(){



localStorage.setItem(


"usuariosJPC",


JSON.stringify(usuarios)



);



}// ================================
// EDITAR MEMBRO
// ================================


function editarMembro(){



if(!membroSelecionado){

    return;

}







document.getElementById("editarNome").value =


membroSelecionado.nome;







document.getElementById("editarMinisterio").value =


membroSelecionado.ministerio || "";







document.getElementById("editarCargo").value =


membroSelecionado.cargo;







document.getElementById("editarLogin").value =


membroSelecionado.usuario;







document.getElementById("editarData").value =


membroSelecionado.dataCriacao || "";







document.getElementById("editarSenha").value = "";







document.getElementById("modalEditar").style.display="flex";



}









// ================================
// SALVAR EDIÇÃO
// ================================


async function salvarEdicao(){


if(!membroSelecionado){

    return;

}







membroSelecionado.nome =


document.getElementById("editarNome")

.value

.trim();







membroSelecionado.ministerio =


document.getElementById("editarMinisterio")

.value;







membroSelecionado.cargo =


document.getElementById("editarCargo")

.value;







membroSelecionado.usuario =


document.getElementById("editarLogin")

.value

.trim();








let novaSenha =


document.getElementById("editarSenha")

.value

.trim();







if(novaSenha){


membroSelecionado.senha = novaSenha;


}







let novaData =


document.getElementById("editarData")

.value;







if(novaData){


membroSelecionado.dataCriacao = novaData;


}








await updateDoc(

    doc(
        db,
        "usuarios",
        membroSelecionado.id
    ),

    {

        nome:membroSelecionado.nome,

        usuario:membroSelecionado.usuario,

        cargo:membroSelecionado.cargo,

        ministerio:membroSelecionado.ministerio,

        dataCriacao:membroSelecionado.dataCriacao

    }

);






carregarUsuarios();






fecharEdicao();






alert(

"Perfil atualizado!"

);




}









// ================================
// FECHAR EDIÇÃO
// ================================


function fecharEdicao(){


document.getElementById("modalEditar").style.display="none";


}









// ================================
// LIBERAR FUNÇÕES PARA HTML
// ================================


window.cadastrarMembro = cadastrarMembro;


window.carregarUsuarios = carregarUsuarios;


window.abrirPerfil = abrirPerfil;


window.fecharModal = fecharModal;


window.excluirMembro = excluirMembro;


window.editarMembro = editarMembro;


window.salvarEdicao = salvarEdicao;


window.fecharEdicao = fecharEdicao;