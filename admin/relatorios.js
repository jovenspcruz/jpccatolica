// ==================================
// JPC - RELATÓRIOS JS
// ==================================
// ==================================
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

let usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
);



if(
!usuarioLogado ||
(
usuarioLogado.cargo !== "Administrador" &&
usuarioLogado.cargo !== "Coordenador"
)

){

window.location.href="equipe-painel.html";

}






let escalas = JSON.parse(
    localStorage.getItem("escalasJPC")
) || [];



let usuarios = JSON.parse(
    localStorage.getItem("usuariosJPC")
) || [];








window.onload = function(){


carregarResumo();


carregarMeses();


carregarMembros();


carregarFuncoes();


carregarProximas();


};









// ================================
// CARDS PRINCIPAIS
// ================================


function carregarResumo(){



document.getElementById(
"totalEscalas"
).innerText = escalas.length;





document.getElementById(
"totalMembros"
).innerText = usuarios.length;






let funcoes = [];





escalas.forEach(e=>{


if(e.funcoes){


funcoes.push(...e.funcoes);


}


});







let unicas = [...new Set(funcoes)];





document.getElementById(
"totalFuncoes"
).innerText = unicas.length;



}









// ================================
// ESCALAS POR MÊS
// ================================


function carregarMeses(){



let area =
document.getElementById(
"relatorioMeses"
);



area.innerHTML="";



let meses={};





escalas.forEach(e=>{



if(!e.data)return;



let data =
new Date(
e.data+"T00:00:00"
);



let nome =
data.toLocaleDateString(
"pt-BR",
{
month:"long",
year:"numeric"
}
);





if(!meses[nome]){


meses[nome]=0;


}



meses[nome]++;



});







Object.keys(meses).forEach(m=>{


area.innerHTML += `


<div class="relatorio-item">


<span>
📅 ${m}
</span>


<span class="valor">

${meses[m]} escala(s)

</span>


</div>


`;


});



}









// ================================
// PARTICIPAÇÃO DOS MEMBROS
// ================================


function carregarMembros(){



let area =
document.getElementById(
"relatorioMembros"
);



area.innerHTML="";



let contagem={};





usuarios.forEach(u=>{


contagem[u.id]=0;


});







escalas.forEach(e=>{


e.membros.forEach(id=>{


if(contagem[id] !== undefined){


contagem[id]++;


}


});


});







let ranking = Object.entries(contagem)

.sort((a,b)=>b[1]-a[1]);








ranking.forEach(item=>{


let membro =
usuarios.find(
u=>u.id==item[0]
);





if(membro){


let porcentagem =
escalas.length ?

(item[1] / escalas.length) * 100

:0;





area.innerHTML += `


<div class="relatorio-item">


<div>


<span>

👤 ${membro.nome}

</span>


<div class="barra">

<div style="width:${porcentagem}%"></div>

</div>


</div>



<span class="valor">

${item[1]}x

</span>



</div>


`;



}


});



}









// ================================
// FUNÇÕES MAIS USADAS
// ================================


function carregarFuncoes(){



let area =
document.getElementById(
"relatorioFuncoes"
);



area.innerHTML="";



let funcoes={};





escalas.forEach(e=>{


e.funcoes.forEach(f=>{


if(!funcoes[f]){


funcoes[f]=0;


}


funcoes[f]++;


});


});








Object.entries(funcoes)

.sort((a,b)=>b[1]-a[1])

.forEach(f=>{



area.innerHTML += `


<div class="relatorio-item">


<span>
⭐ ${f[0]}
</span>


<span class="valor">

${f[1]} vez(es)

</span>


</div>


`;



});



}









// ================================
// PRÓXIMAS ESCALAS
// ================================


function carregarProximas(){



let area =
document.getElementById(
"proximasEscalas"
);



area.innerHTML="";



let hoje = new Date();





let proximas = escalas.filter(e=>{


let data =
new Date(
e.data+"T00:00:00"
);



return data >= hoje;



});







proximas
.sort(
(a,b)=>
new Date(a.data)-new Date(b.data)
)

.slice(0,5)

.forEach(e=>{



area.innerHTML += `


<div class="escala-relatorio">


<h4>

📅 ${e.dia}

</h4>


<p>

📆 ${formatarData(e.data)}

</p>


<p>

⏰ ${e.horario}

</p>


<p>

📍 ${e.lugar}

</p>


</div>


`;



});



}









function formatarData(data){


if(!data)return "--";



let p=data.split("-");



return `${p[2]}/${p[1]}/${p[0]}`;


}