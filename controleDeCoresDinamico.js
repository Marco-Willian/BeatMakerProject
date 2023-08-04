import audio from "./sounds.js";

var areasClique = document.querySelectorAll('.tocadores_colunas');
var cores = ['#1ccb38', '#c1093c', '#a60dc3', '#d09c58', '#B9CF77', '#CFBF80'];
var corPadrao = '#5A5A5A';

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

var quadrado_re = document.querySelectorAll('.som_re');
var quadrado_si = document.querySelectorAll('.som_si');
var quadrado_do = document.querySelectorAll('.som_do');
var quadrado_mi = document.querySelectorAll('.som_mi');
var quadrado_fa = document.querySelectorAll('.som_fa');
var quadrado_kick = document.querySelectorAll('.kick');

quadrado_re.forEach( elemento => {
  var som = audio[1].re;
  
  var quadrado = new Audio(som);

  elemento.addEventListener('click', () => {
    quadrado.currentTime = 0;
    quadrado.play();
  });
});

quadrado_si.forEach( elemento => {
  var som = audio[1].si;
  
  var quadrado = new Audio(som);

  elemento.addEventListener('click', () => {
    quadrado.currentTime = 0;
    quadrado.play();
  });
});

quadrado_do.forEach( elemento => {
  var som = audio[1].do;
  
  var quadrado = new Audio(som);

  elemento.addEventListener('click', () => {
    quadrado.currentTime = 0;
    quadrado.play();
  });
});

quadrado_mi.forEach( elemento => {
  var som = audio[1].mi;
  
  var quadrado = new Audio(som);

  elemento.addEventListener('click', () => {
    quadrado.currentTime = 0;
    quadrado.play();
  });
});

quadrado_fa.forEach( elemento => {
  var som = audio[1].fa;
  
  var quadrado = new Audio(som);

  elemento.addEventListener('click', () => {
    quadrado.currentTime = 0;
    quadrado.play();
  });
});

quadrado_kick.forEach( elemento => {
  var som = audio[1].kick;
  
  var quadrado = new Audio(som);

  elemento.addEventListener('click', () => {
    quadrado.currentTime = 0;
    quadrado.play();
  });
});

