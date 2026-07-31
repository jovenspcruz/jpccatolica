/* ==================================
   JPC - EQUIPE PÚBLICA
   FIREBASE + CARDS + MODAL
================================== */


import { db } from "../FIREBASE/firebase-init.js";

import {

    collection,
    getDocs,
    query,
    orderBy

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";





const listaEquipe =
document.getElementById("listaEquipe");





const imagemPadrao =
"../imagens/jpc-avatar.png";








// ==================================
// CARREGAR CARDS
// ==================================


async function carregarEquipe(){



    if(!listaEquipe)
        return;



    listaEquipe.innerHTML="";



    try{



        const consulta = query(

            collection(
                db,
                "cardsEquipe"
            ),

            orderBy(
                "ordem"
            )

        );



        const resultado =
        await getDocs(consulta);






        if(resultado.empty){



            listaEquipe.innerHTML=`

            <div class="equipe-vazia">


                <h3>
                Nossa equipe está crescendo
                </h3>


                <p>
                Deus está preparando jovens
                para servir nesta missão.
                </p>


            </div>

            `;


            return;


        }






        resultado.forEach((documento)=>{



            const membro =
            documento.data();




            if(membro.ativo === false)
                return;






            listaEquipe.innerHTML += `


            <div class="card-equipe">



                <img

                src="${
                membro.foto
                ?
                membro.foto
                :
                imagemPadrao
                }"

                alt="${membro.nome}"

                >




                <h3>

                    ${membro.nome || ""}

                </h3>





                <h4>

                    ${membro.cargo || ""}

                </h4>






                <p>

                ${resumirDescricao(
                    membro.descricao
                )}

                </p>






                <button

                onclick="abrirPerfil('${documento.id}')">

                    Conhecer →

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
// RESUMIR DESCRIÇÃO
// ==================================


function resumirDescricao(texto){



    if(!texto)
        return "";



    if(texto.length <= 100)
        return texto;



    return texto.substring(0,100)+"...";


}









// ==================================
// ABRIR PERFIL
// ==================================


window.abrirPerfil = async function(id){



    try{



        const resultado =
        await getDocs(
            collection(
                db,
                "cardsEquipe"
            )
        );



        let membro=null;




        resultado.forEach(doc=>{



            if(doc.id===id){


                membro=doc.data();


            }



        });






        if(!membro)
            return;






        document.getElementById(
            "perfilFoto"
        ).src =

        membro.foto
        ?
        membro.foto
        :
        imagemPadrao;







        document.getElementById(
            "perfilNome"
        ).innerHTML =
        membro.nome || "";






        document.getElementById(
            "perfilCargo"
        ).innerHTML =
        membro.cargo || "";







        document.getElementById(
            "perfilDescricao"
        ).innerHTML =
        membro.descricao || "";







        configurarRede(
            "perfilInstagram",
            membro.instagram
        );



        configurarRede(
            "perfilTikTok",
            membro.tiktok
        );



        configurarRede(
            "perfilEmail",
            membro.email
        );







        document.getElementById(
            "modalPerfilEquipe"
        ).style.display="flex";



        document.body.style.overflow="hidden";





    }catch(erro){


        console.error(
            "Erro ao abrir perfil:",
            erro
        );


    }



};









// ==================================
// REDES SOCIAIS
// ==================================


function configurarRede(id,valor){



    const elemento =
    document.getElementById(id);



    if(!elemento)
        return;





    if(valor){



        elemento.style.display="inline-block";



        elemento.href =

        id==="perfilEmail"

        ?

        "mailto:"+valor

        :

        valor;



    }else{


        elemento.style.display="none";


    }



}









// ==================================
// FECHAR MODAL
// ==================================


window.fecharModal=function(id){



    const modal =
    document.getElementById(id);



    if(modal){



        modal.style.display="none";


        document.body.style.overflow="auto";


    }



};









// ==================================
// FECHAR CLICANDO FORA
// ==================================


document.addEventListener(
"click",
(evento)=>{


    const modal =
    document.getElementById(
        "modalPerfilEquipe"
    );



    if(

        modal

        &&

        evento.target===modal

    ){



        modal.style.display="none";


        document.body.style.overflow="auto";


    }



});









// ==================================
// ESC FECHA MODAL
// ==================================


document.addEventListener(
"keydown",
(evento)=>{


    if(evento.key==="Escape"){


        const modal =
        document.getElementById(
            "modalPerfilEquipe"
        );



        if(modal){


            modal.style.display="none";


            document.body.style.overflow="auto";


        }


    }



});









// ==================================
// AVISO EQUIPE
// ==================================


window.addEventListener(
"load",
()=>{


    const aviso =
    document.getElementById(
        "avisoEquipe"
    );



    if(aviso){



        setTimeout(()=>{


            aviso.classList.add(
                "mostrar"
            );


        },500);





        setTimeout(()=>{


            aviso.classList.remove(
                "mostrar"
            );


        },5500);



    }



});









// ==================================
// INICIAR
// ==================================


carregarEquipe();