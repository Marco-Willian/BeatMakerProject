import audio from "./sounds.js";

var areasClique = document.querySelectorAll('.tocadores_colunas');
var cores = ['#1ccb38', '#c1093c', '#a60dc3', '#d09c58', '#B9CF77', '#CFBF80'];
var corPadrao = '#5A5A5A';

var coresAtuais = Array.from(areasClique).map(() => corPadrao);
var coresAtivas = new Set();

areasClique.forEach(function(areaClique, index) {
  areaClique.addEventListener('click', function() {
    var corAtual = coresAtuais[index];
    var novaCor = corAtual === corPadrao ? cores[index] : corPadrao;
    mudarCor(areaClique, novaCor);
    coresAtuais[index] = novaCor;

    if(novaCor !== corPadrao){
      areaClique.classList.add('ativo');
    }else{
      areaClique.classList.remove('ativo');
    }

    if (novaCor === corPadrao) {
      coresAtivas.delete(index);
    }else{
      coresAtivas.add(index);
    }
  });
});

function mudarCor(areaClique, cor) {
  areaClique.style.backgroundColor = cor;
}

function reproduzirSonsEmSequencia() {
  var indicesAtivos = Array.from(coresAtivas);

  function reproduzirProximoSom(indice){
     if(indice < indicesAtivos.length){
      
      var som = audio[1].kick;
      var quadrado = new Audio(som);

      quadrado.currentTime = 0;
      quadrado.play();

      quadrado.onended = function() {
        reproduzirProximoSom(indice + 1);
      }
     }
  }
  reproduzirProximoSom(0);
}

var botaoPlay = document.getElementById('play');
botaoPlay.addEventListener('click', reproduzirSonsEmSequencia);


/*
------ Sai som ao clicar ------

const soundMap = {
  '.som_re': 're',
  '.som_si': 'si',
  '.som_do': 'do',
  '.som_mi': 'mi',
  '.som_fa': 'fa',
  '.kick': 'kick',
};

function adicionarEventoESom(elemento, somKey) {
  var som = audio[1][somKey];
  var quadrado = new Audio(som);

  elemento.addEventListener('click', () => {
    quadrado.currentTime = 0;
    quadrado.play();
  });
}

for (const selector in soundMap) {
  const elements = document.querySelectorAll(selector);
  const soundKey = soundMap[selector];

  elements.forEach((elemento) => {
    adicionarEventoESom(elemento, soundKey);
  });
}

*/

