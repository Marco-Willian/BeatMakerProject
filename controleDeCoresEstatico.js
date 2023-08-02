var areasClique = document.querySelectorAll('.tocadores_linhas');

var cor = '#1ccb38';
var corOriginal = '#5A5A5A';

areasClique.forEach(function(areaClique) {
    areaClique.addEventListener('click', ()=>{
        if(areaClique.style.backgroundColor === 'rgb(26, 203, 56)'){
            areaClique.style.backgroundColor = '#5A5A5A';
        }else{
            areaClique.style.backgroundColor = '#1ccb38';
        }
    });
});