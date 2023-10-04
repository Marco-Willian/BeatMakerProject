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
      audioNode: null,
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

var botaoTrilha = document.getElementById("trilha");
botaoTrilha.addEventListener("click", function () {

  var ativo = botaoTrilha.getAttribute("data-ativo") == "true";
  botaoTrilha.setAttribute("data-ativo", !ativo);
});

var trilhaSourceNode; // Declarar a variável para o nó de origem da trilha

function reproduzirTrilha() {
  var trilhaAtiva = botaoTrilha.getAttribute("data-ativo") == "true";
  if (trilhaAtiva) {
    var soundKey = botaoTrilha.dataset.sound;
    var somTrilha = audio[1][soundKey];

    if(trilhaSourceNode && trilhaSourceNode.state === 'started'){
      trilhaSourceNode.stop();
      trilhaSourceNode.disconnect();
    }

    // Criar o nó de origem para a trilha, se ainda não existir
    
      trilhaSourceNode = audioContext.createBufferSource();
      fetch(somTrilha)
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (arrayBuffer) {
          audioContext.decodeAudioData(arrayBuffer, function (buffer) {
            trilhaSourceNode.buffer = buffer;
            trilhaSourceNode.connect(audioContext.destination);
            trilhaSourceNode.loop = true; // Configurar o loop infinito
            trilhaSourceNode.start(0);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    //  else {
    //   // Se o nó de origem já existir, basta reiniciar a trilha
    //   trilhaSourceNode.start(0);
    // }
  }
}

var isPlaying = false;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

function reproduzirSons() {
  var colunaAtual = 0;
  var linha = 0;

  if (isPlaying) {
    isPlaying = false;
    arraySons.forEach(function (elemento) {
      if (elemento.audioNode) {
        elemento.audioNode.stop();
        elemento.audioNode.disconnect();
      }
    });
    if(trilhaSourceNode){
      trilhaSourceNode.stop();
      trilhaSourceNode.disconnect();
    }
    return;
  }

  function tocarColuna() {
    if (colunaAtual >= 32) {
      colunaAtual = 0;
    }

    var sonsAtivosDaColuna = [];
    for (var linha = 0; linha < 6; linha++) {
      if (arraysPorColuna[colunaAtual][linha].ativo) {
        sonsAtivosDaColuna.push(arraysPorColuna[colunaAtual][linha]);
      }
    }

    var promises = sonsAtivosDaColuna.map(function (elemento) {
      return new Promise(function (resolve, reject) {
        if (elemento) {
          var soundKey = elemento.div.dataset.sound;
          var som = audio[1][soundKey];

          fetch(som)
            .then(function (response) {
              return response.arrayBuffer();
            })
            .then(function (arrayBuffer) {
              audioContext.decodeAudioData(arrayBuffer, function (buffer) {
                var source = audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start(0);
                elemento.audioNode = source;
                resolve();
              });
            })
            .catch(function (err) {
              reject(err);
            });
        } else {
          resolve();
        }
      });
    });

    Promise.all(promises)
      .then(function () {
        colunaAtual++;

        if (isPlaying) {
          setTimeout(tocarColuna, 150);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  isPlaying = true;
  reproduzirTrilha();
  tocarColuna();
}

var botaoPlay = document.getElementById("play");
botaoPlay.addEventListener("click", reproduzirSons);
