/* ==================================
   JPC - ESCALAS
   Parte 1/4
================================== */

// ==========================
// USUÁRIO LOGADO
// ==========================

const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (!usuarioLogado) {

    window.location.href = "admin-login.html";

}



// ==========================
// DADOS
// ==========================

let escalas = JSON.parse(
    localStorage.getItem("escalasJPC")
) || [];

let usuarios = JSON.parse(
    localStorage.getItem("usuariosJPC")
) || [];




// ==========================
// CONTROLE
// ==========================

let membrosSelecionados = [];

let funcoesSelecionadas = [];

let editandoId = null;




// ==========================
// INICIAR
// ==========================

window.onload = () => {

    verificarPermissao();

    carregarMembros();

    carregarMeses();

};




// ==========================
// PERMISSÕES
// ==========================

function verificarPermissao() {

    const area =
        document.getElementById("areaAdmin");

    if (!area) return;

    if (

        usuarioLogado.cargo === "Administrador" ||

        usuarioLogado.cargo === "Coordenador"

    ) {

        area.style.display = "block";

    }

    else {

        area.style.display = "none";

    }

}




// ==========================
// MEMBROS
// ==========================

function carregarMembros() {

    const lista =
        document.getElementById("listaEscolhaMembros");

    if (!lista) return;

    lista.innerHTML = "";

    usuarios.forEach(usuario => {

        lista.innerHTML += `

<label>

<input
type="checkbox"
value="${usuario.id}"
onchange="selecionarMembro(this)">

${usuario.nome}

</label>

`;

    });

}




function abrirModalMembros() {

    document.getElementById(
        "modalMembros"
    ).style.display = "flex";

}




function selecionarMembro(check) {

    const id = check.value;

    if (check.checked) {

        if (!membrosSelecionados.includes(id)) {

            membrosSelecionados.push(id);

        }

    }

    else {

        membrosSelecionados =
            membrosSelecionados.filter(
                membro => membro !== id
            );

    }

}




function confirmarMembros() {

    const area =
        document.getElementById("membrosSelecionados");

    area.innerHTML = "";

    membrosSelecionados.forEach(id => {

        const membro =
            usuarios.find(
                usuario => usuario.id == id
            );

        if (!membro) return;

        area.innerHTML += `

<span class="tag">

${membro.nome}

</span>

`;

    });

    fecharModal("modalMembros");

}




// ==========================
// FUNÇÕES
// ==========================

function abrirModalFuncoes() {

    document.getElementById(
        "modalFuncoes"
    ).style.display = "flex";

}




function confirmarFuncoes() {

    funcoesSelecionadas = [];

    document.querySelectorAll(
        "#listaEscolhaFuncoes input:checked"
    ).forEach(item => {

        funcoesSelecionadas.push(
            item.value
        );

    });

    const area =
        document.getElementById("funcoesSelecionadas");

    area.innerHTML = "";

    funcoesSelecionadas.forEach(funcao => {

        area.innerHTML += `

<span class="tag">

${funcao}

</span>

`;

    });

    fecharModal("modalFuncoes");

}




// ==========================
// FECHAR MODAIS
// ==========================

function fecharModal(id) {

    document.getElementById(id)
        .style.display = "none";

}

function fecharModalMes() {

    fecharModal("modalMes");

}// ==================================
// PARTE 2/4
// Salvar • Editar • Excluir
// ==================================



// ==========================
// SALVAR ESCALA
// ==========================

function salvarEscala() {

    const data = document.getElementById("data").value;

    if (!data) {

        alert("Selecione uma data.");

        return;

    }

    if (membrosSelecionados.length === 0) {

        alert("Selecione pelo menos um membro.");

        return;

    }

    if (funcoesSelecionadas.length === 0) {

        alert("Selecione pelo menos uma função.");

        return;

    }

    const escala = {

        id: editandoId || Date.now(),

        dia: document.getElementById("dia").value,

        data,

        horario: document.getElementById("horario").value,

        lugar: document.getElementById("lugar").value,

        membros: [...membrosSelecionados],

        funcoes: [...funcoesSelecionadas],

        responsavel:
        document.getElementById("responsavel").value,

        observacoes:
        document.getElementById("observacoes").value

    };



    if (editandoId) {

        const indice = escalas.findIndex(
            e => e.id === editandoId
        );

        if (indice >= 0) {

            escalas[indice] = escala;

        }

    } else {

        escalas.push(escala);

    }



    localStorage.setItem(

        "escalasJPC",

        JSON.stringify(escalas)

    );



    editandoId = null;

    limparFormulario();

    carregarMeses();

    alert("Escala salva com sucesso!");

}



// ==========================
// EDITAR
// ==========================

function editarEscala(id) {

    const escala =
        escalas.find(e => e.id === id);

    if (!escala) return;

    editandoId = id;

    document.getElementById("dia").value =
        escala.dia || "";

    document.getElementById("data").value =
        escala.data || "";

    document.getElementById("horario").value =
        escala.horario || "";

    document.getElementById("lugar").value =
        escala.lugar || "";

    document.getElementById("responsavel").value =
        escala.responsavel || "";

    document.getElementById("observacoes").value =
        escala.observacoes || "";



    membrosSelecionados =
        [...(escala.membros || [])];

    funcoesSelecionadas =
        [...(escala.funcoes || [])];



    atualizarTagsMembros();

    atualizarTagsFuncoes();



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



// ==========================
// EXCLUIR
// ==========================

function excluirEscala(id) {

    if (

        usuarioLogado.cargo !== "Administrador" &&

        usuarioLogado.cargo !== "Coordenador"

    ) {

        return;

    }



    if (!confirm("Deseja excluir esta escala?")) {

        return;

    }



    escalas = escalas.filter(

        e => e.id !== id

    );



    localStorage.setItem(

        "escalasJPC",

        JSON.stringify(escalas)

    );



    fecharModalMes();

    carregarMeses();

}



// ==========================
// LIMPAR FORMULÁRIO
// ==========================

function limparFormulario() {

    document.getElementById("dia").value = "Domingo";

    document.getElementById("data").value = "";

    document.getElementById("horario").value = "";

    document.getElementById("lugar").value = "";

    document.getElementById("responsavel").value = "";

    document.getElementById("observacoes").value = "";



    membrosSelecionados = [];

    funcoesSelecionadas = [];



    document.querySelectorAll(

        "#listaEscolhaMembros input"

    ).forEach(i => i.checked = false);



    document.querySelectorAll(

        "#listaEscolhaFuncoes input"

    ).forEach(i => i.checked = false);



    atualizarTagsMembros();

    atualizarTagsFuncoes();

}



// ==========================
// TAGS MEMBROS
// ==========================

function atualizarTagsMembros() {

    const area =
        document.getElementById("membrosSelecionados");

    area.innerHTML = "";



    membrosSelecionados.forEach(id => {

        const membro = usuarios.find(

            u => u.id == id

        );



        if (!membro) return;



        area.innerHTML += `

<span class="tag">

${membro.nome}

</span>

`;

    });

}



// ==========================
// TAGS FUNÇÕES
// ==========================

function atualizarTagsFuncoes() {

    const area =
        document.getElementById("funcoesSelecionadas");

    area.innerHTML = "";



    funcoesSelecionadas.forEach(funcao => {

        area.innerHTML += `

<span class="tag">

${funcao}

</span>

`;

    });

}// ==================================
// PARTE 3/4
// Meses • Modal • Listagem
// ==================================



// ==========================
// CARREGAR MESES
// ==========================

function carregarMeses() {

    const area = document.getElementById("listaMeses");

    if (!area) return;

    area.innerHTML = "";

    // Ignora registros antigos/incompletos
    escalas = escalas.filter(e =>
        e &&
        e.data &&
        Array.isArray(e.membros) &&
        Array.isArray(e.funcoes)
    );

    localStorage.setItem(
        "escalasJPC",
        JSON.stringify(escalas)
    );

    const meses = {};

    escalas.forEach(escala => {

        const data = new Date(
            escala.data + "T00:00:00"
        );

        const chave =
            data.getFullYear() + "-" +
            String(data.getMonth() + 1).padStart(2, "0");

        if (!meses[chave]) {

            meses[chave] = [];

        }

        meses[chave].push(escala);

    });

    const lista = Object.keys(meses).sort();

    if (lista.length === 0) {

        area.innerHTML = `

<div class="card-mes">

<h3>Nenhuma escala</h3>

<p>Cadastre a primeira escala.</p>

</div>

`;

        return;

    }

    lista.forEach(chave => {

        const partes = chave.split("-");

        const data = new Date(
            partes[0],
            partes[1]-1,
            1
        );

        const nomeMes =
            data.toLocaleDateString(
                "pt-BR",
                {
                    month:"long",
                    year:"numeric"
                }
            );

        area.innerHTML += `

<div
class="card-mes"
onclick="abrirMes('${chave}')">

<h3>

${nomeMes}

</h3>

<p>

${meses[chave].length}
escala(s)

</p>

</div>

`;

    });

}





// ==========================
// ABRIR MÊS
// ==========================

function abrirMes(chave) {

    const lista =
        document.getElementById("listaEscalasMes");

    const titulo =
        document.getElementById("tituloMes");

    lista.innerHTML = "";

    const partes = chave.split("-");

    const data = new Date(
        partes[0],
        partes[1]-1,
        1
    );

    titulo.innerText =
        data.toLocaleDateString(
            "pt-BR",
            {
                month:"long",
                year:"numeric"
            }
        );

    const escalasMes =
        escalas.filter(e => {

            const d = new Date(
                e.data + "T00:00:00"
            );

            const c =
                d.getFullYear() + "-" +
                String(d.getMonth()+1)
                .padStart(2,"0");

            return c === chave;

        });

    escalasMes.sort((a,b)=>
        new Date(a.data) -
        new Date(b.data)
    );

    escalasMes.forEach(e => {

        const membros = (e.membros || [])
        .map(id => {

            const usuario =
                usuarios.find(
                    u => u.id == id
                );

            return usuario
                ? usuario.nome
                : "Membro";

        });

        lista.innerHTML += `

<div class="escala-item">

<h3>

${e.dia}

</h3>

<p>

📅 ${formatarData(e.data)}

</p>

<p>

⏰ ${e.horario || "--"}

</p>

<p>

📍 ${e.lugar || "--"}

</p>

<p>

<b>Membros</b>

<br>

${membros.join("<br>")}

</p>

<p>

<b>Funções</b>

<br>

${(e.funcoes || []).join(", ")}

</p>

<p>

<b>Responsável</b>

<br>

${e.responsavel || "--"}

</p>

<p>

<b>Observações</b>

<br>

${e.observacoes || "--"}

</p>

<div class="escala-acoes">

${
usuarioLogado.cargo==="Administrador" ||
usuarioLogado.cargo==="Coordenador"

?

`

<button
class="editar"
onclick="editarEscala(${e.id});fecharModalMes();">

✏ Editar

</button>

<button
class="excluir"
onclick="excluirEscala(${e.id})">

🗑 Excluir

</button>

`

:""

}

</div>

</div>

`;

    });

    document.getElementById(
        "modalMes"
    ).style.display = "flex";

}





// ==========================
// FORMATAR DATA
// ==========================

function formatarData(data){

    if(!data) return "--";

    const p = data.split("-");

    return `${p[2]}/${p[1]}/${p[0]}`;

}// ==================================
// PARTE 4/4
// Finalização
// ==================================


// ==========================
// VOLTAR AO PAINEL
// ==========================

function voltarPainel(){

    if(

        usuarioLogado.cargo === "Administrador"

    ){

        window.location.href = "painel.html";

    }

    else{

        window.location.href = "equipe-painel.html";

    }

}




// ==========================
// FECHAR MODAL CLICANDO FORA
// ==========================

window.onclick = function(event){

    const modalMes =
    document.getElementById("modalMes");

    const modalMembros =
    document.getElementById("modalMembros");

    const modalFuncoes =
    document.getElementById("modalFuncoes");

    if(event.target === modalMes){

        fecharModalMes();

    }

    if(event.target === modalMembros){

        fecharModal("modalMembros");

    }

    if(event.target === modalFuncoes){

        fecharModal("modalFuncoes");

    }

};




// ==========================
// ENTER SALVA A ESCALA
// ==========================

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        const modalAberto =

        document.querySelector(".modal[style*='flex']");

        if(modalAberto) return;

        const area = document.getElementById("areaAdmin");

        if(area && area.style.display!=="none"){

            e.preventDefault();

            salvarEscala();

        }

    }

});




// ==========================
// REMOVER ESCALAS INVÁLIDAS
// ==========================

function limparEscalasInvalidas(){

    escalas = escalas.filter(e=>{

        return(

            e &&

            e.id &&

            e.data &&

            e.dia &&

            Array.isArray(e.membros) &&

            Array.isArray(e.funcoes)

        );

    });

    localStorage.setItem(

        "escalasJPC",

        JSON.stringify(escalas)

    );

}

limparEscalasInvalidas();




// ==========================
// ORDENA AS ESCALAS
// ==========================

function ordenarEscalas(){

    escalas.sort(

        (a,b)=>

        new Date(a.data)-

        new Date(b.data)

    );

}

ordenarEscalas();




// ==========================
// ATUALIZA TELA
// ==========================

carregarMeses();




// ==========================
// DEBUG
// ==========================

console.log(

"✅ Sistema de Escalas carregado!"

);

console.log(

escalas

);