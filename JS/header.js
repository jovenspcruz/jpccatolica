/* ==================================
   JPC - HEADER GLOBAL JS
   PARTE 1/3
================================== */


/* ==================================
        INICIAR HEADER
================================== */


document.addEventListener("DOMContentLoaded",()=>{


    iniciarMenuMobile();


    iniciarPesquisa();


    iniciarLogo();


    destacarPagina();


    console.log("JPC HEADER OK");


});





/* ==================================
        MENU MOBILE
================================== */


function iniciarMenuMobile(){


    const botao = 
    document.getElementById("btnMenu");


    const menu =
    document.getElementById("menuMobile");



    if(!botao || !menu){

        console.log("Menu mobile não encontrado");

        return;

    }




    botao.addEventListener("click",(e)=>{


        e.stopPropagation();



        menu.classList.toggle("ativo");



    });







    document.addEventListener("click",(e)=>{



        if(


            !menu.contains(e.target)

            &&

            !botao.contains(e.target)


        ){


            menu.classList.remove("ativo");


        }


    });






    menu.querySelectorAll("a").forEach(link=>{


        link.addEventListener("click",()=>{


            menu.classList.remove("ativo");


        });


    });



}





/* ==================================
        PESQUISA
================================== */


function iniciarPesquisa(){


    const input =
    document.getElementById("pesquisa");


    const botao =
    document.getElementById("btnPesquisar");


    const resultado =
    document.getElementById("resultadoPesquisa");


    const lista =
    document.getElementById("listaResultados");



    if(!input || !botao || !resultado || !lista){


        console.log("Pesquisa não encontrada");


        return;


    }



    console.log("Pesquisa iniciada");



}/* ==================================
   JPC - HEADER GLOBAL JS
   PARTE 2/3
================================== */


/* ==================================
        BANCO DE PESQUISA JPC
================================== */


const conteudosPesquisa = [


    // =========================
    // SANTOS
    // =========================


    {
        nome:"São Carlo Acutis",

        pagina:"Santos",

        categoria:"Jovens Santos",

        descricao:
        "Jovem apaixonado pela Eucaristia, evangelização e tecnologia.",

        palavras:[
            "carlo",
            "eucaristia",
            "milagres eucarísticos",
            "jovem",
            "santo",
            "tecnologia"
        ],

        link:"santos.html"

    },



    {
        nome:"São Pier Giorgio Frassati",

        pagina:"Santos",

        categoria:"Jovens Santos",

        descricao:
        "Jovem universitário dedicado aos pobres e à Eucaristia.",

        palavras:[
            "pier",
            "caridade",
            "pobres",
            "jovem",
            "eucaristia"
        ],

        link:"santos.html"

    },



    {
        nome:"Beata Imelda Lambertini",

        pagina:"Santos",

        categoria:"Virgens",

        descricao:
        "Exemplo de amor profundo por Jesus Eucarístico desde a infância.",

        palavras:[
            "imelda",
            "eucaristia",
            "comunhão",
            "criança",
            "virgem"
        ],

        link:"santos.html"

    },



    {
        nome:"São Tarcísio",

        pagina:"Santos",

        categoria:"Mártires",

        descricao:
        "Jovem mártir que protegeu a Santíssima Eucaristia.",

        palavras:[
            "tarcisio",
            "martir",
            "eucaristia",
            "sacrário"
        ],

        link:"santos.html"

    },



    {
        nome:"Santa Teresinha do Menino Jesus",

        pagina:"Santos",

        categoria:"Missionários",

        descricao:
        "Doutora da Igreja e padroeira das missões.",

        palavras:[
            "teresinha",
            "missões",
            "carmelo",
            "pequeno caminho"
        ],

        link:"santos.html"

    },





    // =========================
    // LITURGIA
    // =========================


    {
        nome:"Evangelho do Dia",

        pagina:"Liturgia",

        categoria:"Evangelho",

        descricao:
        "Confira o Evangelho e conteúdos litúrgicos da Igreja.",

        palavras:[
            "evangelho",
            "missa",
            "palavra de deus",
            "liturgia"
        ],

        link:"liturgia.html"

    },





    // =========================
    // ORAÇÕES
    // =========================


    {
        nome:"Orações",

        pagina:"Orações",

        categoria:"Vida de Oração",

        descricao:
        "Momentos de oração e encontro com Deus.",

        palavras:[
            "oração",
            "rezar",
            "pedido de oração",
            "prece"
        ],

        link:"oracoes.html"

    },



    {
        nome:"Pedido de Oração",

        pagina:"Orações",

        categoria:"Intenções",

        descricao:
        "Envie seu pedido de oração para a JPC.",

        palavras:[
            "pedido",
            "intenção",
            "oração"
        ],

        link:"oracoes.html"

    },





    // =========================
    // CONTATO
    // =========================


    {
        nome:"Contato JPC",

        pagina:"Contato",

        categoria:"Comunicação",

        descricao:
        "Entre em contato com a Jovens Pela Cruz.",

        palavras:[
            "instagram",
            "email",
            "mensagem",
            "falar"
        ],

        link:"contato.html"

    },





    // =========================
    // EQUIPE
    // =========================


    {
        nome:"Equipe Jovens Pela Cruz",

        pagina:"Equipe",

        categoria:"Fundadores e membros",

        descricao:
        "Conheça os responsáveis pela missão da JPC.",

        palavras:[
            "fundador",
            "equipe",
            "membros",
            "coordenação"
        ],

        link:"equipe.html"

    }


];






/* ==================================
        EXECUTAR PESQUISA
================================== */


function executarPesquisa(){



    const input =
    document.getElementById("pesquisa");


    const resultado =
    document.getElementById("resultadoPesquisa");


    const lista =
    document.getElementById("listaResultados");



    if(!input || !resultado || !lista)
        return;




    const termo = 
    input.value
    .toLowerCase()
    .trim();




    lista.innerHTML="";



    if(termo===""){


        resultado.style.display="none";

        return;


    }





    const encontrados =
    conteudosPesquisa.filter(item=>{


        return(


            item.nome
            .toLowerCase()
            .includes(termo)



            ||

            item.categoria
            .toLowerCase()
            .includes(termo)



            ||

            item.descricao
            .toLowerCase()
            .includes(termo)



            ||

            item.palavras.some(
                palavra=>
                palavra
                .toLowerCase()
                .includes(termo)
            )


        );


    });


}
/* ==================================
   JPC - HEADER GLOBAL JS
   PARTE 3/3
================================== */


/* ==================================
        MOSTRAR RESULTADOS
================================== */


function mostrarResultados(){


    const input =
    document.getElementById("pesquisa");


    const botao =
    document.getElementById("btnPesquisar");


    const resultado =
    document.getElementById("resultadoPesquisa");


    const lista =
    document.getElementById("listaResultados");



    if(!input || !resultado || !lista)
        return;



    const termo =
    input.value
    .toLowerCase()
    .trim();



    if(termo===""){


        resultado.style.display="none";


        return;

    }




    executarPesquisa();



    const encontrados =
    conteudosPesquisa.filter(item=>{


        return(


            item.nome
            .toLowerCase()
            .includes(termo)


            ||

            item.categoria
            .toLowerCase()
            .includes(termo)


            ||

            item.descricao
            .toLowerCase()
            .includes(termo)


            ||

            item.palavras.some(
                palavra=>
                palavra
                .toLowerCase()
                .includes(termo)
            )


        );


    });




    lista.innerHTML="";




    if(encontrados.length===0){


        lista.innerHTML=`

        <div class="resultado-item">

            <h3>
            Nenhum resultado encontrado
            </h3>

            <p>
            Tente pesquisar outro termo.
            </p>

        </div>

        `;


    }else{



        encontrados.forEach(item=>{



            lista.innerHTML += `


            <div class="resultado-item">


                <h3>
                    ${item.nome}
                </h3>


                <span>
                    ${item.pagina} • ${item.categoria}
                </span>


                <p>
                    ${item.descricao}
                </p>


                <a href="${item.link}">
                    Abrir
                </a>


            </div>


            `;



        });



    }





    resultado.style.display="flex";



}







/* ==================================
        ATIVAR PESQUISA
================================== */


document.addEventListener("DOMContentLoaded",()=>{


    const input =
    document.getElementById("pesquisa");


    const botao =
    document.getElementById("btnPesquisar");



    if(input){


        input.addEventListener(
            "input",
            mostrarResultados
        );


    }



    if(botao){


        botao.addEventListener(
            "click",
            mostrarResultados
        );


    }



});








/* ==================================
        FECHAR PESQUISA
================================== */


document.addEventListener("click",(e)=>{


    const resultado =
    document.getElementById("resultadoPesquisa");


    const input =
    document.getElementById("pesquisa");


    const botao =
    document.getElementById("btnPesquisar");



    if(
        resultado
        &&
        !resultado.contains(e.target)
        &&
        !input.contains(e.target)
        &&
        !botao.contains(e.target)
    ){


        resultado.style.display="none";


    }



});









/* ==================================
        LOGO JPC
================================== */


function iniciarLogo(){


    const logo =
    document.getElementById("logoJPC");



    if(!logo)
        return;



    let clique;



    logo.addEventListener("click",(e)=>{


        e.preventDefault();



        clearTimeout(clique);



        clique =
        setTimeout(()=>{


            window.location.href="inicio.html";


        },300);



    });






    logo.addEventListener("dblclick",(e)=>{


        e.preventDefault();



        clearTimeout(clique);



        window.location.href="../admin/admin-login.html";



    });





    let segurando;



    logo.addEventListener("touchstart",()=>{


        segurando =
        setTimeout(()=>{


            window.location.href="../admin/admin-login.html";


        },5000);



    });




    logo.addEventListener("touchend",()=>{


        clearTimeout(segurando);


    });



}










/* ==================================
        DESTACAR PÁGINA
================================== */


function destacarPagina(){


    const atual =
    window.location.pathname
    .split("/")
    .pop();




    document
    .querySelectorAll("#menu a, #menuMobile a")
    .forEach(link=>{


        const href =
        link.getAttribute("href");



        if(href===atual){


            link.classList.add(
                "pagina-atual"
            );


        }



    });


}