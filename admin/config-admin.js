// ==================================
// JPC - CONFIG ADMIN
// CARDS EQUIPE PÚBLICA
// ==================================


import { db } from "../FIREBASE/firebase-init.js";


import {

    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    orderBy,
    query

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";





let idEditando = null;









// ==================================
// TROCAR SEÇÕES
// ==================================


window.abrirConfig = function(id){


    document
    .querySelectorAll(".config-area")
    .forEach(area=>{

        area.classList.remove("ativa");

    });



    document
    .getElementById(id)
    ?.classList.add("ativa");





    if(id === "equipe"){

        carregarEquipeAdmin();

    }



};









// ==================================
// ABRIR MODAL
// ==================================


window.abrirModalEquipe = function(){


    idEditando = null;


    limparFormulario();


    document
    .getElementById("tituloModalEquipe")
    .innerText = "Adicionar Membro";



    document
    .getElementById("modalEquipe")
    .style.display="flex";


};









// ==================================
// FECHAR MODAL
// ==================================


window.fecharModalEquipe=function(){


    document
    .getElementById("modalEquipe")
    .style.display="none";


    limparFormulario();


};









// ==================================
// LIMPAR FORMULÁRIO
// ==================================


function limparFormulario(){


    document.getElementById("nomeEquipe").value="";

    document.getElementById("cargoEquipe").value="";

    document.getElementById("descricaoCurtaEquipe").value="";

    document.getElementById("descricaoEquipe").value="";

    document.getElementById("instagramEquipe").value="";

    document.getElementById("tiktokEquipe").value="";

    document.getElementById("emailEquipe").value="";

    document.getElementById("ordemEquipe").value=1;

    document.getElementById("ativoEquipe").checked=true;


}









// ==================================
// CARREGAR CARDS
// ==================================


async function carregarEquipeAdmin(){


const lista = document.getElementById(
"listaCardsEquipe"
);



if(!lista)return;




lista.innerHTML="Carregando...";



try{


const q = query(

collection(db,"cardsEquipe"),

orderBy("ordem")

);



const dados = await getDocs(q);



lista.innerHTML="";





if(dados.empty){


lista.innerHTML=`

<p>
Nenhum membro cadastrado.
</p>

`;


return;


}





dados.forEach(item=>{


const card=item.data();



lista.innerHTML += `


<div class="card-admin">


<img 
src="${card.foto || '../../imagens/jpc-avatar.png'}">



<h3>

${card.nome}

</h3>



<p>

${card.cargo}

</p>



<p>

${card.descricaoCurta || ""}

</p>




<button onclick="editarCardEquipe('${item.id}')">

✏ Editar

</button>




<button onclick="excluirCardEquipe('${item.id}')">

🗑 Excluir

</button>



</div>


`;



});




}catch(erro){


console.error(

"Erro ao carregar equipe:",

erro

);


}



}









// ==================================
// SALVAR / ATUALIZAR CARD
// ==================================


window.salvarCardEquipe = async function(){



const dados = {


nome:

document.getElementById("nomeEquipe").value.trim(),



cargo:

document.getElementById("cargoEquipe").value.trim(),



descricaoCurta:

document.getElementById("descricaoCurtaEquipe").value.trim(),



descricao:

document.getElementById("descricaoEquipe").value.trim(),



instagram:

document.getElementById("instagramEquipe").value.trim(),



tiktok:

document.getElementById("tiktokEquipe").value.trim(),



email:

document.getElementById("emailEquipe").value.trim(),



ordem:

Number(
document.getElementById("ordemEquipe").value
),



ativo:

document.getElementById("ativoEquipe").checked



};







try{



// EDITAR


if(idEditando){



await updateDoc(

doc(
db,
"cardsEquipe",
idEditando
),

dados

);



alert(
"Card atualizado!"
);



}






// NOVO


else{



await addDoc(

collection(
db,
"cardsEquipe"
),

dados

);



alert(
"Card criado!"
);



}







fecharModalEquipe();


carregarEquipeAdmin();





}catch(erro){


console.error(

"Erro ao salvar:",

erro

);



}



};









// ==================================
// EDITAR CARD
// ==================================


window.editarCardEquipe = async function(id){



try{



const ref = doc(

db,

"cardsEquipe",

id

);



const dados = await getDoc(ref);



if(!dados.exists()){

alert(
"Card não encontrado"
);

return;

}




const card = dados.data();





document.getElementById("tituloModalEquipe").innerText =
"Editar Membro";




document.getElementById("nomeEquipe").value =
card.nome || "";



document.getElementById("cargoEquipe").value =
card.cargo || "";



document.getElementById("descricaoCurtaEquipe").value =
card.descricaoCurta || "";



document.getElementById("descricaoEquipe").value =
card.descricao || "";



document.getElementById("instagramEquipe").value =
card.instagram || "";



document.getElementById("tiktokEquipe").value =
card.tiktok || "";



document.getElementById("emailEquipe").value =
card.email || "";



document.getElementById("ordemEquipe").value =
card.ordem || 1;



document.getElementById("ativoEquipe").checked =
card.ativo ?? true;





idEditando = id;





document
.getElementById("modalEquipe")
.style.display="flex";





}catch(erro){


console.error(

"Erro ao editar:",

erro

);


}



};









// ==================================
// EXCLUIR CARD
// (deixado preparado)
// ==================================


window.excluirCardEquipe = function(id){


console.log(

"Excluir:",
id

);


};









// ==================================
// INICIAR
// ==================================


document.addEventListener(

"DOMContentLoaded",

()=>{


carregarEquipeAdmin();


}

);