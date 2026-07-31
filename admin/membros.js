// ==================================
// JPC - MEMBROS JS
// ==================================


let usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
);


if(!usuarioLogado){

    window.location.href="admin-login.html";

}




let usuarios = JSON.parse(
    localStorage.getItem("usuariosJPC")
) || [];



let membros = usuarios.filter(

u => u && u.cargo === "Membro"

);



let membroSelecionado = null;







window.onload=function(){


verificarAcesso();

carregarMembros();


};







// ================================
// PERMISSÃO
// ================================


function verificarAcesso(){


if(usuarioLogado.cargo === "Membro"){


alert("Você não tem permissão para acessar essa página");


window.location.href="painel.html";


}


}








// ================================
// STATUS
// ================================


function iconeStatus(status){


switch(status){


case "Ativo":

return "🟢";


case "Disponível":

return "🔵";


case "Ausente":

return "🟡";


case "Inativo":

return "🔴";


default:

return "⚪";


}


}









// ================================
// LISTAR
// ================================


function carregarMembros(){



let lista =
document.getElementById("listaMembros");



lista.innerHTML="";







membros.forEach(membro=>{



lista.innerHTML += `



<div class="membro-card">


<img src="${membro.foto || '../imagens/jpc-avatar.png'}">


<h3>
${membro.nome}
</h3>


<p>
${membro.ministerio || "--"}
</p>


<p class="status">

${iconeStatus(membro.status)}

${membro.status || "Ativo"}

</p>



<button onclick="abrirPerfil('${membro.id}')">

👁 Ver perfil

</button>



</div>



`;



});



}









// ================================
// PERFIL
// ================================


function abrirPerfil(id){



membroSelecionado = usuarios.find(

u=>u.id===id

);



if(!membroSelecionado)return;






document.getElementById("fotoPerfil").src =

membroSelecionado.foto ||
"../imagens/jpc-avatar.png";




document.getElementById("nomePerfil").innerHTML =

membroSelecionado.nome;



document.getElementById("usuarioPerfil").innerHTML =

membroSelecionado.usuario;



document.getElementById("cargoPerfil").innerHTML =

membroSelecionado.cargo;



document.getElementById("ministerioPerfil").innerHTML =

membroSelecionado.ministerio || "--";



document.getElementById("statusPerfil").innerHTML =

iconeStatus(membroSelecionado.status)
+
" "
+
(membroSelecionado.status || "Ativo");





let excluir = document.getElementById("btnExcluir");



if(usuarioLogado.cargo === "Administrador"){


excluir.style.display="block";


}else{


excluir.style.display="none";


}




document.getElementById("modalPerfil")
.style.display="flex";


}









function fecharModal(){


document.getElementById("modalPerfil")
.style.display="none";


}









// ================================
// EDITAR
// ================================


function editarMembro(){



fecharModal();




document.getElementById("editarNome").value =

membroSelecionado.nome;




document.getElementById("editarUsuario").value =

membroSelecionado.usuario;




document.getElementById("editarMinisterio").value =

membroSelecionado.ministerio;




document.getElementById("editarStatus").value =

membroSelecionado.status || "Ativo";






document.getElementById("modalEditar")
.style.display="flex";


}









function fecharEdicao(){


document.getElementById("modalEditar")
.style.display="none";


}









// ================================
// SALVAR EDIÇÃO
// ================================


function salvarEdicao(){



membroSelecionado.nome =

document.getElementById("editarNome").value;




membroSelecionado.usuario =

document.getElementById("editarUsuario").value;




membroSelecionado.ministerio =

document.getElementById("editarMinisterio").value;




membroSelecionado.status =

document.getElementById("editarStatus").value;








let index = usuarios.findIndex(

u=>u.id === membroSelecionado.id

);






if(index !== -1){


usuarios[index] = membroSelecionado;


}






localStorage.setItem(

"usuariosJPC",

JSON.stringify(usuarios)

);






alert("Perfil atualizado!");



fecharEdicao();



location.reload();



}









// ================================
// EXCLUIR
// ================================


function excluirMembro(){



if(usuarioLogado.cargo !== "Administrador"){


alert("Sem permissão!");

return;


}






if(!confirm(

"Excluir este membro?"

))return;







usuarios = usuarios.filter(

u=>u.id !== membroSelecionado.id

);






localStorage.setItem(

"usuariosJPC",

JSON.stringify(usuarios)

);






alert("Membro excluído!");



location.reload();



}









// ================================
// PESQUISA
// ================================


document
.getElementById("pesquisa")
.addEventListener("input",function(){



let valor = this.value.toLowerCase();




let resultado = membros.filter(

m=>m.nome.toLowerCase().includes(valor)

);




mostrarResultado(resultado);



});









function mostrarResultado(lista){


let area =
document.getElementById("listaMembros");


area.innerHTML="";




lista.forEach(membro=>{



area.innerHTML += `


<div class="membro-card">


<img src="${membro.foto || '../imagens/jpc-avatar.png'}">


<h3>${membro.nome}</h3>


<p>${membro.ministerio || "--"}</p>


<p class="status">

${iconeStatus(membro.status)}

${membro.status || "Ativo"}

</p>


<button onclick="abrirPerfil('${membro.id}')">

👁 Ver perfil

</button>


</div>



`;



});



}









// ================================
// FILTRO MINISTÉRIO
// ================================


document
.getElementById("filtroMinisterio")
.addEventListener("change",function(){



let valor=this.value;




if(valor==="Todos"){


carregarMembros();

return;


}






let filtrados = membros.filter(

m=>m.ministerio === valor

);





mostrarResultado(filtrados);



});// ==================================
// VOLTAR PARA PAINEL CORRETO
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