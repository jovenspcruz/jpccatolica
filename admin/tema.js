// ==================================
// JPC - TEMA GLOBAL
// ==================================


function aplicarTemaGlobal(){



let usuarioLogado = JSON.parse(

    localStorage.getItem("usuarioLogado")

);





if(!usuarioLogado){

    return;

}





let tema = "escuro";






// ================================
// ADMIN
// ================================


if(usuarioLogado.cargo === "Administrador"){



    let admin = JSON.parse(

        localStorage.getItem("adminJPC")

    );



    if(admin && admin.tema){


        tema = admin.tema;


    }



}






// ================================
// EQUIPE
// ================================


else{



    let usuarios = JSON.parse(

        localStorage.getItem("usuariosJPC")

    ) || [];





    let membro = usuarios.find(

        u => u.id === usuarioLogado.id

    );





    if(membro && membro.tema){


        tema = membro.tema;


    }



}







document.body.classList.remove(

"tema-claro",

"tema-escuro"

);





document.body.classList.add(

"tema-"+tema

);



}






document.addEventListener(

"DOMContentLoaded",

()=>{


aplicarTemaGlobal();


}

);