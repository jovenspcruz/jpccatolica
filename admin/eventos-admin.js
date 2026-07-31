// ==================================
// JPC ADMIN - EVENTOS JS
// Jovens Pela Cruz
// ==================================



let eventos = JSON.parse(

    localStorage.getItem("eventosJPC")

) || [];





// Adicionar evento

function adicionarEvento(){


    const nome = document.getElementById("nomeEvento").value;

    const data = document.getElementById("dataEvento").value;

    const local = document.getElementById("localEvento").value;

    const imagemArquivo = document.getElementById("imagemEvento").files[0];

    const descricao = document.getElementById("descricaoEvento").value;




    if(nome === "" || data === ""){


        alert("Preencha o nome e a data do evento!");

        return;

    }





    function salvarEventoComImagem(imagem){


        const evento = {


            id: Date.now(),

            nome: nome,

            data: data,

            local: local,

            imagem: imagem || "https://via.placeholder.com/600x300",

            descricao: descricao


        };



        eventos.push(evento);


        salvarEventos();


        limparFormulario();


        mostrarEventos();


    }






    if(imagemArquivo){


        const leitor = new FileReader();



        leitor.onload = function(e){


            salvarEventoComImagem(e.target.result);


        };



        leitor.readAsDataURL(imagemArquivo);



    }else{


        salvarEventoComImagem("https://via.placeholder.com/600x300");


    }




}



// Mostrar eventos

function mostrarEventos(){



    const lista = document.getElementById("listaEventos");


    lista.innerHTML = "";





    eventos.forEach(function(evento){





        lista.innerHTML += `



        <div class="evento">



            <img src="${evento.imagem}">



            <div class="evento-conteudo">



                <h3>

                    ${evento.nome}

                </h3>



                <p>

                📅 ${evento.data}

                </p>



                <p>

                📍 ${evento.local}

                </p>



                <p>

                ${evento.descricao}

                </p>




                <button onclick="removerEvento(${evento.id})">

                    Excluir

                </button>




            </div>



        </div>



        `;



    });



}








// Remover evento

function removerEvento(id){



    eventos = eventos.filter(function(evento){


        return evento.id !== id;


    });




    salvarEventos();


    mostrarEventos();



}








// Limpar campos

function limparFormulario(){



    document.getElementById("nomeEvento").value = "";


    document.getElementById("dataEvento").value = "";


    document.getElementById("localEvento").value = "";


    document.getElementById("imagemEvento").value = "";


    document.getElementById("descricaoEvento").value = "";



}



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




// Carregar ao abrir

mostrarEventos();