// ==================================
// JOVENS PELA CRUZ
// INICIO.JS
// PARTE 1/5
// ==================================


// ==================================
// VARIÁVEIS GLOBAIS
// ==================================

let avisos = [];

let avisosNaoLidos = [];

let avisoAtual = null;





// ==================================
// ESPERAR HEADER CARREGAR
// ==================================

function esperarHeader(callback){


    const verificar = setInterval(()=>{


        const header =
        document.querySelector("header");


        const menu =
        document.getElementById("menu");


        const menuMobile =
        document.getElementById("menuMobile");



        if(header && menu && menuMobile){


            clearInterval(verificar);


            callback();


        }



    },100);



}







// ==================================
// INICIAR HEADER
// ==================================

function iniciarHeader(){


    const header =
    document.querySelector("header");



    if(!header) return;




    window.addEventListener("scroll",()=>{


        if(window.scrollY > 80){


            header.classList.add("scroll");


        }else{


            header.classList.remove("scroll");


        }


    });



}











// ==================================
// MENU DESKTOP
// ==================================

function iniciarMenu(){



    const menu =
    document.getElementById("menu");


    if(!menu)
        return;




    const links =
    menu.querySelectorAll("a");



    links.forEach(link=>{


        link.addEventListener("click",()=>{


            menu.classList.remove("ativo");


        });


    });




    window.addEventListener("resize",()=>{


        if(window.innerWidth > 900){


            menu.classList.remove("ativo");


        }


    });



}








// ==================================
// DROPDOWN MENU
// ==================================

function iniciarDropdown(){



    const dropdowns =
    document.querySelectorAll(".dropdown");



    if(dropdowns.length === 0)
        return;





    dropdowns.forEach(drop=>{



        const botao =
        drop.querySelector(".dropdown-btn");



        const conteudo =
        drop.querySelector(".dropdown-menu");



        if(!botao || !conteudo)
            return;





        botao.addEventListener("click",(e)=>{


            e.preventDefault();



            conteudo.classList.toggle("ativo");



        });



    });



}// ==================================
// JOVENS PELA CRUZ
// INICIO.JS
// PARTE 2/5
// ==================================


// ==================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ==================================

function iniciarAnimacoes(){


    const elementos =
    document.querySelectorAll(".animar");



    if(elementos.length === 0)
        return;




    const observador =
    new IntersectionObserver((entradas)=>{


        entradas.forEach(entrada=>{


            if(entrada.isIntersecting){


                entrada.target.classList.add(
                    "mostrar"
                );



                observador.unobserve(
                    entrada.target
                );


            }


        });



    },{


        threshold:0.15


    });





    elementos.forEach(elemento=>{


        observador.observe(elemento);


    });



}







// ==================================
// BOTÃO VOLTAR AO TOPO
// ==================================

function iniciarVoltarTopo(){


    const botao =
    document.getElementById("voltarTopo");



    if(!botao)
        return;




    window.addEventListener("scroll",()=>{


        if(window.scrollY > 400){


            botao.classList.add(
                "mostrar"
            );


        }else{


            botao.classList.remove(
                "mostrar"
            );


        }


    });





    botao.addEventListener("click",()=>{


        window.scrollTo({


            top:0,


            behavior:"smooth"


        });



    });



}







// ==================================
// CONTADOR DE VISITAS
// ==================================

function iniciarVisitas(){


    let visitas =

    Number(

        localStorage.getItem(
            "visitasJPC"
        )

    )

    || 0;





    visitas++;





    localStorage.setItem(

        "visitasJPC",

        visitas

    );






    const contador =
    document.getElementById(
        "contadorVisitas"
    );



    if(contador){


        contador.innerHTML =
        visitas;


    }



}








// ==================================
// RELÓGIO DO HEADER
// ==================================

function iniciarRelogio(){


    const elemento =
    document.getElementById(
        "dataHora"
    );



    if(!elemento)
        return;





    function atualizar(){



        const agora =
        new Date();





        const opcoes = {


            weekday:"long",

            day:"2-digit",

            month:"long",

            year:"numeric",

            hour:"2-digit",

            minute:"2-digit"


        };





        elemento.innerHTML =

        agora.toLocaleDateString(

            "pt-BR",

            opcoes

        );



    }





    atualizar();



    setInterval(

        atualizar,

        1000

    );



}// ==================================
// JOVENS PELA CRUZ
// INICIO.JS
// PARTE 3/5
// ==================================


// ==================================
// DESTACAR PÁGINA ATUAL NO MENU
// ==================================

function destacarPagina(){


    const links =
    document.querySelectorAll(
        "nav a"
    );



    if(links.length === 0)
        return;




    let paginaAtual =

    window.location.pathname

    .split("/")

    .pop();





    if(paginaAtual === ""){


        paginaAtual = "inicio.html";


    }





    links.forEach(link=>{


        const destino =
        link.getAttribute("href");



        if(destino === paginaAtual){


            link.classList.add(
                "pagina-atual"
            );


        }



    });



}








// ==================================
// FECHAR MENUS AO NAVEGAR
// ==================================

function fecharMenus(){


    const menus =
    document.querySelectorAll(
        ".menu-aberto"
    );



    menus.forEach(menu=>{


        menu.classList.remove(
            "menu-aberto"
        );


    });



}








// ==================================
// COMPARTILHAMENTO
// ==================================

function iniciarCompartilhamento(){


    const botoes =
    document.querySelectorAll(
        "[data-compartilhar]"
    );



    if(botoes.length === 0)
        return;





    botoes.forEach(botao=>{


        botao.addEventListener(
            "click",
            ()=>{


                const titulo =
                document.title;



                const link =
                window.location.href;





                if(navigator.share){


                    navigator.share({


                        title:titulo,


                        url:link



                    });



                }else{



                    navigator.clipboard.writeText(
                        link
                    );



                    alert(
                        "Link copiado!"
                    );



                }



            }

        );



    });



}








// ==================================
// PROTEÇÃO CONTRA ERROS
// ==================================

function protegerHeader(){


    window.addEventListener(

        "error",

        (erro)=>{


            console.warn(

                "JPC Header:",

                erro.message

            );


        }


    );



}








// ==================================
// FECHAR MODAL AO CLICAR FORA
// ==================================

function fecharModalFora(){


    document.addEventListener(
        "click",
        (evento)=>{


            if(
                evento.target.classList.contains(
                    "modal"
                )
            ){


                evento.target.style.display =
                "none";


                document.body.style.overflow =
                "auto";


            }



        }
    );


}







// ==================================
// FECHAR MODAIS COM ESC
// ==================================

function fecharModalESC(){


    document.addEventListener(
        "keydown",
        (evento)=>{


            if(evento.key === "Escape"){


                document
                .querySelectorAll(".modal")
                .forEach(modal=>{


                    modal.style.display =
                    "none";


                });



                document.body.style.overflow =
                "auto";


            }


        }
    );



}// ==================================
// JOVENS PELA CRUZ
// INICIO.JS
// PARTE 4/5
// ==================================


// ==================================
// MODAL DE NOVIDADES AUTOMÁTICO
// ==================================

function iniciarNovidades(){


    const jaViu =

    sessionStorage.getItem(
        "novidadesJPC"
    );



    // remove esta parte se quiser abrir
    // toda vez que entrar no site

    if(jaViu){

        return;

    }






    const modal =
    document.createElement("div");



    modal.className =
    "modal";



    modal.id =
    "modalNovidades";






    modal.innerHTML = `


        <div class="modal-conteudo">


            <button class="fechar-modal" id="fecharNovidades">

                ×

            </button>



            <h2>

                Novidades JPC

            </h2>




            <p>

                Confira as novidades do
                Jovens Pela Cruz!

            </p>




            <button id="okNovidades">

                Ok, entendi

            </button>



        </div>


    `;







    document.body.appendChild(
        modal
    );






    // abrir modal

    setTimeout(()=>{


        modal.style.display =
        "flex";


        document.body.style.overflow =
        "hidden";



    },300);









    function fechar(){



        modal.style.display =
        "none";



        document.body.style.overflow =
        "auto";



        sessionStorage.setItem(

            "novidadesJPC",

            "true"

        );



    }







    document
    .getElementById(
        "okNovidades"
    )
    .addEventListener(
        "click",
        fechar
    );






    document
    .getElementById(
        "fecharNovidades"
    )
    .addEventListener(
        "click",
        fechar
    );







    // fechar automático

    setTimeout(()=>{


        fechar();



    },15300);



}// ==================================
// JOVENS PELA CRUZ
// INICIO.JS
// PARTE 5/5
// ==================================


// ==================================
// INICIAR SITE JPC
// ==================================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{



        // Header

        esperarHeader(()=>{


            iniciarHeader();


            iniciarMenu();


            iniciarDropdown();


            destacarPagina();


        });





        // Funções gerais


        iniciarAnimacoes();


        iniciarVoltarTopo();


        iniciarVisitas();


        iniciarRelogio();


        iniciarCompartilhamento();


        fecharMenus();


        fecharModalFora();


        fecharModalESC();




        // Modal de novidades




    }

);
