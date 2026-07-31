// ==================================
// JPC - ADMIN FIXO
// ==================================


let adminFixo = JSON.parse(

    localStorage.getItem("adminJPC")

);




// ==================================
// CRIAR APENAS SE NÃO EXISTIR
// ==================================


if(!adminFixo){



    adminFixo = {


        id:"admin001",



        nome:"Bernardo",



        usuario:"admin",



        senha:"123456",



        email:"",



        cargo:"Administrador",



        ministerio:"Administração",



        foto:"../imagens/jpc-avatar.png",



        dataCriacao:

        new Date()

        .toLocaleDateString("pt-BR"),



        status:"Ativo",




        preferencias:{


            tema:"light",


            notificacoes:true,


            sons:true


        }



    };






    localStorage.setItem(

        "adminJPC",

        JSON.stringify(adminFixo)

    );



}