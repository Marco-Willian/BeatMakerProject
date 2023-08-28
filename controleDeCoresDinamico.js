import audio from "./sounds.js";

var areasClique = document.querySelectorAll('.tocadores_colunas');
var cores = ['#1ccb38', '#c1093c', '#a60dc3', '#d09c58', '#B9CF77', '#CFBF80'];
var corPadrao = '#5A5A5A';

var coresAtuais = Array.from(areasClique).map(() => corPadrao);
var arraySons = new Array();

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
      var linha = elemento.id.split('-')[0];
      var coluna = elemento.id.split('-')[1];
      var itemDoArraySelecionado = arraySons.find((item)=> item.linha == linha && item.coluna == coluna);
      if(itemDoArraySelecionado){
      itemDoArraySelecionado.ativo = !itemDoArraySelecionado.ativo;
      itemDoArraySelecionado.div = itemDoArraySelecionado.ativo ? elemento : null;
      // if(itemDoArraySelecionado.ativo){
      // itemDoArraySelecionado.div = elemento;
      // }else{
      // itemDoArraySelecionado.div = null;
      // }
      }
      console.log(arraySons)
    });
  });
});

function verificarColuna(){
  var totalDeColunas = matrizSons[0].length;
  var totalDeElementos = [];

  for(var colIndex = 0; colIndex < totalDeColunas; colIndex++){

    var elementosDaColunaATivo = arraySons.filter((item) => item.coluna == colIndex && item.ativo)

    totalDeElementos.push(elementosDaColunaATivo);
  }
  console.log(totalDeElementos)
  return totalDeElementos;
}




var botaoPlay = document.getElementById('play');
botaoPlay.addEventListener('click', verificarColuna);



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

  Iterar pelos elementos de cada coluna
  Filtrar os elementos que são da mesma coluna.
*/