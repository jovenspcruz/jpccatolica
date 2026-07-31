// ==================================
// JPC ADMIN - AVISOS FIRESTORE
// Jovens Pela Cruz
// ==================================


import { db } from "../FIREBASE/firebase-init.js";


import {

    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";




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









// ==================================
// PUBLICAR AVISO
// ==================================

async function publicarAviso(){



    const titulo = document
    .getElementById("titulo")
    .value
    .trim();



    const mensagem = document
    .getElementById("mensagem")
    .value
    .trim();



    const inicio =
    document.getElementById("inicio").value;



    const horaInicio =
    document.getElementById("horaInicio").value;



    const fim =
    document.getElementById("fim").value;



    const horaFim =
    document.getElementById("horaFim").value;



    const prioridade =
    document.getElementById("prioridade").value;



    const destino =
    document.getElementById("destino")
    .value
    .toLowerCase();





    if(
        titulo === "" ||
        mensagem === ""
    ){


        alert(
            "Preencha o título e a mensagem."
        );


        return;


    }






    const aviso = {


        titulo,


        mensagem,


        inicio,


        horaInicio,


        fim,


        horaFim,


        prioridade,


        destino,


        data:
        new Date()
        .toLocaleDateString("pt-BR"),


        criadoEm:
        Date.now(),


        lido:false


    };







    try{


        await addDoc(

            collection(db,"avisos"),

            aviso

        );



        alert(
            "Aviso publicado!"
        );



        limparFormulario();


        mostrarAvisos();



    }


    catch(error){


        console.error(
            "Erro:",
            error
        );


        alert(
            "Erro ao publicar aviso."
        );


    }



}









// ==================================
// MOSTRAR AVISOS ADMIN
// ==================================

async function mostrarAvisos(){



    const lista =
    document.getElementById("listaAvisos");



    if(!lista) return;




    lista.innerHTML="";





    const consulta = query(

        collection(db,"avisos"),

        orderBy(
            "criadoEm",
            "desc"
        )

    );




    const resultado =
    await getDocs(consulta);






    if(resultado.empty){


        lista.innerHTML=`

        <p>
        Nenhum aviso publicado.
        </p>

        `;


        return;


    }







    resultado.forEach((item)=>{


        const aviso =
        item.data();





        let classe="";



        if(aviso.prioridade==="Urgente"){

            classe="urgente";

        }


        else if(aviso.prioridade==="Importante"){

            classe="importante";

        }


        else if(aviso.prioridade==="Novidade"){

            classe="novidade";

        }






        lista.innerHTML += `



        <div class="aviso ${classe}">



            <span class="prioridade">

                ${aviso.prioridade}

            </span>



            <h3>

                📢 ${aviso.titulo}

            </h3>



            <p>

                ${aviso.mensagem}

            </p>



            <small>

                📅 ${aviso.data}

            </small>



            <br>



            <small>

                👥 Destino:

                ${aviso.destino}

            </small>



            <br><br>



            <button onclick="removerAviso('${item.id}')">

                🗑 Excluir

            </button>



        </div>



        `;



    });



}









// ==================================
// REMOVER
// ==================================

async function removerAviso(id){



    try{


        await deleteDoc(

            doc(
                db,
                "avisos",
                id
            )

        );



        mostrarAvisos();



    }


    catch(error){


        console.error(error);


    }



}









// ==================================
// LIMPAR FORMULÁRIO
// ==================================

function limparFormulario(){



    document.getElementById("titulo").value="";

    document.getElementById("mensagem").value="";

    document.getElementById("inicio").value="";

    document.getElementById("horaInicio").value="";

    document.getElementById("fim").value="";

    document.getElementById("horaFim").value="";


}








mostrarAvisos();




// liberar para os botões HTML

window.publicarAviso = publicarAviso;

window.removerAviso = removerAviso;

window.voltarPainel = voltarPainel;