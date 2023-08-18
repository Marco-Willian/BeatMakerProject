import audio from "./sounds.js";

var areasClique = document.querySelectorAll('.tocadores_colunas');
var cores = ['#1ccb38', '#c1093c', '#a60dc3', '#d09c58', '#B9CF77', '#CFBF80'];
var corPadrao = '#5A5A5A';

var coresAtuais = Array.from(areasClique).map(() => corPadrao);

var clicarSom = document.querySelectorAll('.som');
var arrayDeSom = new Set();

areasClique.forEach(function (areaClique, index) {
  areaClique.addEventListener('click', function () {
    var corAtual = coresAtuais[index];
    var novaCor = corAtual === corPadrao ? cores[index] : corPadrao;
    mudarCor(areaClique, novaCor);
    coresAtuais[index] = novaCor;
  });
});

function mudarCor(areaClique, cor) {
  areaClique.style.backgroundColor = cor;
}

clicarSom.forEach(clique => 
  clique.addEventListener('click', function () {
    clique.classList.toggle('ativo');
    if(clique.classList.contains('ativo')){
      arrayDeSom.add(clique);
    }else{
      arrayDeSom.delete(clique);
    }
    console.log(arrayDeSom);
    return;  
})
)

var intervaloDeTempo = 1000;
var isPlaying = false;

function reproduzirSonsEmSequencia() {
  var elementosAtivos = Array.from(arrayDeSom);

  function reproduzirProximoSom(indice) {
    if(!isPlaying){
      return;
    }
    if(elementosAtivos.length === 0){
      return;
    }
      var elemento = elementosAtivos[indice % elementosAtivos.length];
      var soundKey = elemento.dataset.sound;
      var som = audio[1][soundKey];
      var quadrado = new Audio(som);

      quadrado.currentTime = 0;
      quadrado.play();

      quadrado.onended = function () {
      setTimeout(function(){
        reproduzirProximoSom(indice + 1);
      },intervaloDeTempo)
      }
  }
  isPlaying = !isPlaying;
  if(isPlaying){
    reproduzirProximoSom(0);
  }
}

var botaoPlay = document.getElementById('play');
botaoPlay.addEventListener('click', reproduzirSonsEmSequencia);


/* 
  E se cada cada quadrado estivesse dentro de um array, onde por padrão possuem estado desativado e ao clicar 
  tornam - se ativados podendo reproduzir o som ? Dessa forma, conseguiriamos colocar um tempo para passar em
  cada index. Se Eu tenho um som na primeira posição e outro na quinta, ambos ativados, com tempo de percurso 
  de 1 segunda por index, o tempo para ir do primeiro ao segundo seria de 5 segundos.
*/