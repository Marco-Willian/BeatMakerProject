import audio from "../objects/sounds.js";

var arraySons = new Array();
var matrizSons = [];

console.log(arraySons);

for (var j = 0; j < 32; j++) {
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

console.log(matrizSons);

var arraysPorColuna = {};

arraySons.forEach(function (elemento) {
  var coluna = elemento.coluna;
  if (!arraysPorColuna[coluna]) {
    arraysPorColuna[coluna] = [];
  }
  arraysPorColuna[coluna].push(elemento);
});

// console.log(arraysPorColuna)

matrizSons.forEach(function (linha) {
  linha.forEach(function (elemento) {
    elemento.addEventListener("click", function () {
      var linha = elemento.id.split("-")[0];
      var coluna = elemento.id.split("-")[1];
      var itemDoArraySelecionado = arraySons.find(
        (item) => item.linha == linha && item.coluna == coluna
      );
      if (itemDoArraySelecionado) {
        itemDoArraySelecionado.ativo = !itemDoArraySelecionado.ativo;
        arraysPorColuna[coluna][linha].ativo = itemDoArraySelecionado.ativo;
        itemDoArraySelecionado.div = itemDoArraySelecionado.ativo
          ? elemento
          : null;
      }
      // console.log(arraySons);
      console.log(arraysPorColuna);
    });
  });
});

var isPlaying = false;

function reproduzirSons() {
  var colunaAtual = 0;
  var linha = 0;

  if(isPlaying){
    isPlaying = false;
    return;
  }

  function tocarColuna() {
    if (colunaAtual >= 32) {
      colunaAtual = 0;
    }

    var sonsAtivosDaColuna = [];
    for (var linha = 0; linha < 6; linha++) {
      if (arraysPorColuna[colunaAtual][linha].ativo) {
        sonsAtivosDaColuna.push(arraysPorColuna[colunaAtual][linha].div);
      }
    }
    sonsAtivosDaColuna.forEach(function (elemento) {
        if (elemento) {
          var soundkey = elemento.dataset.sound;
          var som = audio[1][soundkey];

          var quadrado = new Audio(som); 
          quadrado.currentTime = 0;
          quadrado.play();
          
        }
    });

    colunaAtual++;

    if(isPlaying){
      setTimeout(tocarColuna, 150);
    }
  }

  isPlaying = true;
  tocarColuna();
}

var botaoPlay = document.getElementById("play");
botaoPlay.addEventListener("click", reproduzirSons);
