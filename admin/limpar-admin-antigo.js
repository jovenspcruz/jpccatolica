// ==================================
// JPC - REMOVER ADM ANTIGO
// ==================================


let usuarios = JSON.parse(

    localStorage.getItem("usuariosJPC")

) || [];



// remove somente o administrador antigo

usuarios = usuarios.filter(

    usuario => usuario.cargo !== "Administrador"

);




// salva novamente

localStorage.setItem(

    "usuariosJPC",

    JSON.stringify(usuarios)

);



console.log(
"ADM antigo removido do usuariosJPC"
);