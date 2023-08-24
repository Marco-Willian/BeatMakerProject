import audio from "./sounds.js";

var areasClique = document.querySelectorAll('.tocadores_colunas');
var cores = ['#1ccb38', '#c1093c', '#a60dc3', '#d09c58', '#B9CF77', '#CFBF80'];
var corPadrao = '#5A5A5A';

var coresAtuais = Array.from(areasClique).map(() => corPadrao);
var arraySons = new Array()

/*
var clicarSom = document.querySelectorAll('.som');
var arrayDeSom = new Set();
*/

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

var matrizSons = [];


console.log(arraySons)

for(var i = 0;i < 6; i++){
  var linha = [];
  for(var j = 0; j < 6; j++){
    arraySons.push({
      linha: i,
      coluna: j,
      ativo: false,
      div: null
    })
    var elemento = document.querySelector('.som[data-row="' + i + '"][data-col="' + j +'"]');
    linha.push(elemento);
    elemento.setAttribute("id",i +"-"+ j);
  }
  matrizSons.push(linha);
}

console.log(matrizSons);

matrizSons.forEach(function(linha){
  linha.forEach(function(elemento){
    elemento.addEventListener('click',function(){
      var linha = elemento.id.split('-')[0]
      var coluna = elemento.id.split('-')[1]
      console.log(arraySons)
      var itemDoArraySelecionado = arraySons.find((item)=> item.linha == linha && item.coluna == coluna)
      console.log(itemDoArraySelecionado)
      itemDoArraySelecionado.ativo = !itemDoArraySelecionado.ativo
      itemDoArraySelecionado.div = elemento;

      elemento.classList.toggle('ativo');
      if(elemento.classList.contains('ativo')){
        arraySons.push(elemento)
      }else{
        arraySons.pop(elemento)
      }
      console.log(arraySons)
    });
  });
});

function reproduzirSons(){
  matrizSons.forEach(function(linha){
    linha.forEach(function(elemento, colIndex){
      if(elemento.classList.contains('ativo')){
        var soundKey = elemento.dataset.sound;
        var som = audio[1][soundKey];
        var quadrado = new Audio(som);

        quadrado.currentTime = 0;
        quadrado.play();

        // quadrado.onended = function () {
          
        //   if(linha[colIndex + 1] && linha[colIndex + 1].classList.contains('ativo')){
        //     var nextSoundKey = linha[colIndex + 1].dataset.sound;
        //     var nextSound = audio[1][nextSoundKey];

        //     setTimeout(function () {
        //       var nextQuadrado = new Audio(nextSound);
        //       nextQuadrado.currentTime = 0;
        //       nextQuadrado.play();

        //     },1000);
        //   }
        // }
      }
    })
  })
}

var botaoPlay = document.getElementById('play');
botaoPlay.addEventListener('click',reproduzirSons);
/*
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

var intervaloDeTempo = 100;
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

*/

/* 
(1°)  E se cada cada quadrado estivesse dentro de um array, onde por padrão possuem estado desativado e ao clicar 
  tornam - se ativados podendo reproduzir o som ? Dessa forma, conseguiriamos colocar um tempo para passar em
  cada index. Se Eu tenho um som na primeira posição e outro na quinta, ambos ativados, com tempo de percurso 
  de 1 segundo por index, o tempo para ir do primeiro ao segundo seria de 5 segundos.

  Cada quadrado possue uma posição fixa no vetor, já predefindo.

  = [

  [1° som (desativado)] ---> [2° som (desativado)] ---> [3° som (desativado)] ---> [4° som (desativado)] ---> [...] ---> ...

  ]
  
  [som ativo (tocar)] ---> [som desativado] ---> [som ativo (tocar)] ---> [som desativado] ---> [...] ---> ...

  o que eu quero dizer ?

  array = [
  [1,2,3]
  [4,5,6]
  [7,8,9]
  [10,11,12]
  [13,14,15]
  ]

  O espaço array[3][1] = 8, possue seu espaço fixo e ninguém pode invadir ele. Não será uma fila ou pilha.
  O som 10 é fixo no lugar que ele está. Por exemplo. Suponha que eu adicione os sons 1, 5, 9; caso eu adicione
  o 8, a sequência deve ficar 1, 5, 8, 9.

  E se eu tivesse uma matriz onde eu verifico sempre a coluna? Verifico se na primeira coluna existe som em suas linhas
  e vou fazendo isso para todas as outras colunas.

  criar um array para colocar os elementos que estao ativos na matriz. Porem, a matriz tera uma ierarquia, indo de 1 ate n
  [1,2,3,4,5,6]
  ...
  [31,32,33,34,35,36]

  Esse array eh um 6x6, logo meu vetor tera tamanho 36. Se eu pegar o elemento 5 na matriz ele devera ocupar a posicao no
  array.

  [_,_,_,_,5,_,_,...,_] onde _ significa vazio.

  Elementos da mesma coluna devem tocar ao mesmo tempo se estiverem ativos.
*/