var classes = ['.first','.second','.third','.fourth','.fifth','.sixth'];

classes.forEach(function(classe){
    var areasClique = document.querySelectorAll(classe);

    areasClique.forEach(function(areaClique){
        areaClique.addEventListener('click',function(){
            areaClique.classList.toggle('alterado');
        });
    });
});