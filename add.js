console.log('hello');
document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    let nom=document.getElementById("nom").value;
    let prenom=document.getElementById("prenom").value;
    let email=document.getElementById("email").value;
    window.electronAPI.setclient({nom,prenom,email})
})