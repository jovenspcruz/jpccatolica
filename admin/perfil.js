// ==================================
// JPC - MEU PERFIL
// USUÁRIO DA EQUIPE
// ==================================


// ================================
// SESSÃO
// ================================


let usuarioLogado = JSON.parse(

    localStorage.getItem("usuarioLogado")

);



if(!usuarioLogado){


    window.location.href="admin-login.html";


}







// ================================
// BUSCAR USUÁRIO
// ================================


let usuarios = JSON.parse(

    localStorage.getItem("usuariosJPC")

) || [];





let usuario = usuarios.find(

    u => u.id === usuarioLogado.id

);





if(!usuario){


    usuario = usuarioLogado;


}









// ================================
// CARREGAR PERFIL
// ================================


function carregarPerfil(){



document.getElementById("nomeUsuario").innerHTML =

usuario.nome || "--";





document.getElementById("cargoUsuario").innerHTML =

usuario.cargo || "--";






document.getElementById("usuario").innerHTML =

usuario.usuario || "--";







document.getElementById("email").innerHTML =

usuario.email || "Não informado";







let ministerio =

document.getElementById("ministerio");



if(ministerio){


    ministerio.innerHTML =

    usuario.ministerio || "--";


}







let data =

document.getElementById("dataEntradaPerfil");



if(data){


    data.innerHTML =

    usuario.dataCriacao || "--";


}









document.getElementById("fotoUsuario").src =

usuario.foto ||

"../imagens/jpc-avatar.png";







document.getElementById("editarNome").value =

usuario.nome || "";





document.getElementById("editarUsuario").value =

usuario.usuario || "";





document.getElementById("editarEmail").value =

usuario.email || "";



// CARREGAR DESCRIÇÃO PÚBLICA

if(document.getElementById("descricaoPublica")){


document.getElementById("descricaoPublica").value =

usuario.descricaoPublica || "";


}



carregarTema();



}





carregarPerfil();










leitor.readAsDataURL(arquivo);











// ================================
// SALVAR PERFIL
// ================================


function salvarPerfil(){





usuario.nome =

document.getElementById("editarNome")

.value.trim();







usuario.usuario =

document.getElementById("editarUsuario")

.value.trim();








usuario.email =

document.getElementById("editarEmail")

.value.trim();









let senha =

document.getElementById("editarSenha")

.value.trim();





if(senha){


    usuario.senha = senha;


}






salvarUsuario();





localStorage.setItem(

"usuarioLogado",

JSON.stringify(usuario)

);





alert(

"Perfil atualizado!"

);





carregarPerfil();



}









// ================================
// BANCO
// ================================


function salvarUsuario(){



let lista = JSON.parse(

localStorage.getItem("usuariosJPC")

) || [];





let index = lista.findIndex(

u => u.id === usuario.id

);





if(index !== -1){


    lista[index] = usuario;


}





localStorage.setItem(

"usuariosJPC",

JSON.stringify(lista)

);



}









// ================================
// CONFIGURAÇÕES
// ================================


function abrirConfiguracoes(){


document.getElementById("modalConfig")

.style.display="flex";


}





function fecharConfiguracoes(){


document.getElementById("modalConfig")

.style.display="none";


}









// ================================
// TEMA INDIVIDUAL
// ================================


function carregarTema(){



let tema = usuario.tema || "escuro";



document.body.classList.add(

"tema-"+tema

);



}









function alterarTema(tema){



usuario.tema = tema;



salvarUsuario();





localStorage.setItem(

"usuarioLogado",

JSON.stringify(usuario)

);






document.body.className="";



document.body.classList.add(

"tema-"+tema

);



}









// ================================
// CONFIGURAÇÕES EXTRAS
// ================================


let notificacoes =

document.getElementById("notificacoes");



let sons =

document.getElementById("sons");





if(notificacoes){



notificacoes.checked =

usuario.notificacoes ?? true;



notificacoes.addEventListener(

"change",

()=>{


usuario.notificacoes =

notificacoes.checked;


salvarUsuario();


}

);



}







if(sons){



sons.checked =

usuario.sons ?? true;



sons.addEventListener(

"change",

()=>{


usuario.sons =

sons.checked;


salvarUsuario();


}

);



}









// ================================
// SAIR
// ================================


function sairConta(){



localStorage.removeItem(

"usuarioLogado"

);



localStorage.removeItem(

"jpcEquipe"

);





window.location.href=

"admin-login.html";



}