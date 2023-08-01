var areasClique = document.querySelectorAll('.area-clique');
var cores = ['#000000', '#ff0000', '#00ff00', '#f5a742', '#9400d3'];
var corPadrao = '#4287f5';

var coresAtuais = Array.from(areasClique).map(() => corPadrao);

areasClique.forEach(function(areaClique, index) {
  areaClique.addEventListener('click', function() {
    var corAtual = coresAtuais[index];
    var novaCor = corAtual === corPadrao ? cores[index] : corPadrao;
    mudarCor(areaClique, novaCor);
    coresAtuais[index] = novaCor;
  });
});

function mudarCor(areaClique, cor) {
  areaClique.style.backgroundColor = cor;
}

var quadrado = document.getElementById('quadrado1');
var som = new Audio('sounds/piano/316913__jaz_the_man_2__si.wav');

quadrado.addEventListener('click', function() {
    som.play();
});
