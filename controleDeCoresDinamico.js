import audio from "./sounds.js";

var areasClique = document.querySelectorAll(".tocadores_colunas");
var evento = document.querySelectorAll(".som");
var cores = ["#1ccb38", "#c1093c", "#a60dc3", "#d09c58", "#B9CF77", "#CFBF80"];
var corPadrao = "#5A5A5A";

var coresAtuais = Array.from(areasClique).map(() => corPadrao);
var arraySons = new Array();
var arrayInvertido = [];
var matrizSons = [];

areasClique.forEach(function (areaClique, index) {
  areaClique.addEventListener("click", function () {
    var corAtual = coresAtuais[index];
    var novaCor = corAtual === corPadrao ? cores[index] : corPadrao;
    mudarCor(areaClique, novaCor);
    coresAtuais[index] = novaCor;
  });
});

function mudarCor(areaClique, cor) {
  areaClique.style.backgroundColor = cor;
}

console.log(arraySons);

for (var j = 0; j < 6; j++) {
  var coluna = [];
  for (var i = 0; i < 6; i++) {
    arraySons.push({
      linha: i,
      coluna: j,
      ativo: false,
      div: null,
    });
    var elemento = document.querySelector(
      '.som[data-row="' + i + '"][data-col="' + j + '"]'
    );
    coluna.push(elemento);
    elemento.setAttribute("id", i + "-" + j);
  }
  matrizSons.push(coluna);
}

// console.log(matrizSons);

var arraysPorColuna = {};

arraySons.forEach(function(elemento){
  var coluna = elemento.coluna;
  if(!arraysPorColuna[coluna]){
    arraysPorColuna[coluna] = [];
  }
  arraysPorColuna[coluna].push(elemento)
})

// console.log(arraysPorColuna)

matrizSons.forEach(function (linha) {
  linha.forEach(function (elemento) {
    elemento.addEventListener("click", function () {
      var linha = elemento.id.split("-")[0];
      var coluna = elemento.id.split("-")[1];
      var itemDoArraySelecionado = arraySons.find((item) => item.linha == linha && item.coluna == coluna);
      if (itemDoArraySelecionado) {
        itemDoArraySelecionado.ativo = !itemDoArraySelecionado.ativo;
        arraysPorColuna[coluna][linha].ativo = itemDoArraySelecionado.ativo;
        itemDoArraySelecionado.div = itemDoArraySelecionado.ativo ? elemento: null;
      }
      // console.log(arraySons);
      console.log(arraysPorColuna)
    });
  });
});

function reproduzirSons(){
  var colunaAtual = 0;
  var linha = 0;

  function tocarColuna(){
    if(colunaAtual >= 6){
      return;
    }

    var sonsAtivosDaColuna = [];
    for(var linha = 0; linha < 6; linha++){
      if(arraysPorColuna[colunaAtual][linha].ativo){
        sonsAtivosDaColuna.push(arraysPorColuna[colunaAtual][linha].div);
      }
    }

    sonsAtivosDaColuna.forEach(function(elemento){
      if(elemento){
        var soundkey = elemento.dataset.sound;
        var som = audio[1][soundkey];
        var quadrado = new Audio(som);

        quadrado.currentTime = 0;
        quadrado.play();
      }
    });

    colunaAtual++;

    setTimeout(tocarColuna, 500)
  }
  tocarColuna();
}

var botaoPlay = document.getElementById("play");
botaoPlay.addEventListener('click',reproduzirSons)
