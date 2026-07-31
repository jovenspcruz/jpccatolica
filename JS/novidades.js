/* ==================================
   JPC - SISTEMA DE NOVIDADES
   Firebase + Sino + Boas-vindas
================================== */


import { db } from "../FIREBASE/firebase-init.js";


import {

    collection,
    getDocs,
    query,
    orderBy

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";




// ==================================
// ESPERAR HEADER CARREGAR
// ==================================

function esperarNovidades(){


    const verificar = setInterval(()=>{


        const sino =
        document.getElementById("abrirNovidades");


        const modal =
        document.getElementById("modalNovidades");



        if(sino && modal){


            clearInterval(verificar);


            iniciarNovidades();


        }



    },100);



}


esperarNovidades();





async function iniciarNovidades(){



    const sino =
    document.getElementById("abrirNovidades");



    const modal =
    document.getElementById("modalNovidades");



    const fechar =
    document.getElementById("fecharNovidades");



    const lista =
    document.getElementById("listaNovidades");



    const contador =
    document.getElementById("contadorAviso");





    if(!sino || !modal || !lista)
        return;









    // ==================================
    // ABRIR PELO SININHO
    // ==================================


    sino.addEventListener("click",()=>{


        carregarAvisos();


        modal.classList.add("ativo");


        document.body.style.overflow="hidden";


    });










    // ==================================
    // FECHAR
    // ==================================


    function fecharModal(){


        modal.classList.remove("ativo");


        document.body.style.overflow="auto";


    }






    if(fechar){


        fechar.addEventListener(
            "click",
            fecharModal
        );


    }







    modal.addEventListener("click",(e)=>{


        if(e.target === modal){


            fecharModal();


        }


    });







    document.addEventListener("keydown",(e)=>{


        if(e.key==="Escape"){


            fecharModal();


        }


    });














    // ==================================
    // CARREGAR AVISOS
    // ==================================


    async function carregarAvisos(){



        const consulta = query(

            collection(db,"avisos"),

            orderBy(
                "criadoEm",
                "desc"
            )

        );




        const resultado =
        await getDocs(consulta);




        let avisos=[];







        resultado.forEach((item)=>{


            const aviso=item.data();


            let mostrar=true;







            // DATA INÍCIO

            if(aviso.inicio){


                const inicio =
                new Date(

                    aviso.inicio +

                    (

                    aviso.horaInicio

                    ?

                    "T"+aviso.horaInicio

                    :

                    "T00:00"

                    )

                );



                if(new Date() < inicio){

                    mostrar=false;

                }


            }









            // DATA FIM


            if(aviso.fim && mostrar){



                const fim =
                new Date(


                    aviso.fim +

                    (

                    aviso.horaFim

                    ?

                    "T"+aviso.horaFim

                    :

                    "T23:59"

                    )


                );



                if(new Date() > fim){

                    mostrar=false;

                }


            }









            // DESTINO


            if(

                aviso.destino !== "site"

                &&

                aviso.destino !== "ambos"

            ){


                mostrar=false;


            }








            if(mostrar){


                avisos.push({

                    id:item.id,

                    ...aviso

                });


            }



        });








        atualizarContador(avisos);






        lista.innerHTML="";









        // SEM AVISOS = BOAS VINDAS


        if(avisos.length===0){



            lista.innerHTML=`


            <div class="novidade-item">


                <h3>
                📌 Novidades | JPC
                </h3>



                <p>
                Salve Maria, juventude!!
                </p>



                <p>
                Nosso site está de cara nova,
                juntamente com a nossa nova logo,
                trazendo uma experiência ainda melhor
                para todos que acompanham a
                Jovens Pela Cruz.
                </p>




                <p>
                Agora você encontra:
                </p>



                <ul>

                <li>
                ✝ História dos santos jovens
                </li>


                <li>
                📖 Liturgia e Evangelho do dia
                </li>


                <li>
                🙏 Pedidos de oração
                </li>


                <li>
                👥 Nossa equipe
                </li>


                <li>
                📩 Contato com a JPC
                </li>


                <li>
                🔔 Novidades e avisos
                </li>


                </ul>




                <p>
                Tudo foi preparado com muito carinho
                para aproximar ainda mais os jovens
                de Cristo.
                </p>



            </div>


            `;


            return;


        }









        avisos.forEach(aviso=>{



            lista.innerHTML +=`



            <div class="novidade-item">


                <h3>
                📢 ${aviso.titulo}
                </h3>



                <p>
                ${aviso.mensagem}
                </p>




                <small>
                📌 ${aviso.prioridade || ""}
                </small>



                <br>



                <small>
                📅 ${aviso.data || ""}
                </small>



                <br><br>




                <button

                class="marcar-lido"

                onclick="marcarLido('${aviso.id}')">


                ✓ Marcar como lido


                </button>



            </div>


            `;



        });



    }












    // ==================================
    // CONTADOR DO SININHO
    // ==================================


    function atualizarContador(lista){



        let quantidade=0;




        lista.forEach(aviso=>{



            if(

                !localStorage.getItem(

                    "aviso_"+aviso.id

                )

            ){


                quantidade++;


            }


        });







        if(contador){



            if(quantidade>0){


                contador.innerHTML =
                quantidade;


                contador.style.display="flex";


            }else{


                contador.style.display="none";


            }



        }



    }

// ==================================
// ABRIR AUTOMÁTICO AO ENTRAR
// ==================================

setTimeout(()=>{


    carregarAvisos();


    modal.classList.add("ativo");


    document.body.style.overflow="hidden";



    setTimeout(()=>{


        modal.classList.remove("ativo");


        document.body.style.overflow="auto";


    },15000);



},500);






}












// ==================================
// MARCAR COMO LIDO
// ==================================


window.marcarLido=function(id){



    localStorage.setItem(

        "aviso_"+id,

        "true"

    );



    location.reload();


};