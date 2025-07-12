document.addEventListener('DOMContentLoaded', ()=> {
    //current year
    document.getElementById('current year').textContent=new Date().getFullYear();
    //last modified
    document.getElementById('last modified').textContent = 'Last Modification: ' + document.lastModified;
})