/* ===================================================
        JPC - RECOMENDAÇÕES JS
=================================================== */


document.addEventListener("DOMContentLoaded",()=>{



/* ===================================================
        FILTRO DE CATEGORIAS
=================================================== */


const botoes =
document.querySelectorAll(
".categorias-grid button"
);



const cards =
document.querySelectorAll(
".card-recomendacao"
);



if(botoes.length > 0 && cards.length > 0){



botoes.forEach(botao=>{


botao.addEventListener("click",()=>{


// remove ativo

botoes.forEach(btn=>{

btn.classList.remove("ativo");

});



// adiciona ativo

botao.classList.add("ativo");



const filtro =
botao.getAttribute("data-filtro");





cards.forEach(card=>{


const categoria =
card.getAttribute("data-categoria");





if(
filtro === "todos" ||
categoria.includes(filtro)
){



card.style.display="flex";



setTimeout(()=>{

card.classList.add("mostrar");

},50);



}else{


card.style.display="none";


}



});



});



});



}







/* ===================================================
        ANIMAÇÃO DOS CARDS
=================================================== */


const observador =
new IntersectionObserver((entradas)=>{


entradas.forEach(entrada=>{


if(entrada.isIntersecting){


entrada.target.classList.add(
"mostrar"
);


}



});



},{
threshold:0.15
});





cards.forEach(card=>{


observador.observe(card);


});








/* ===================================================
        VOLTAR AO TOPO
=================================================== */


const botaoTopo =
document.getElementById(
"voltarTopo"
);



if(botaoTopo){



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 400){


botaoTopo.classList.add(
"ativo"
);


}else{


botaoTopo.classList.remove(
"ativo"
);


}


});






botaoTopo.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});



}



});