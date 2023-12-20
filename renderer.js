const information = document.getElementById('info')
information.innerText = `This is my first App`
window.electronAPI.getclient("get-client",(cli)=>{
    console.log(cli);
    information.innerHTML +=`<br> ${cli.clientId} ${cli.nom} ${cli.prenom} ${cli.email}`
})
