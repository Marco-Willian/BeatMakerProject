var areasClique = document.querySelectorAll(".tocadores_colunas");
var cores = ["#1ccb38", "#c1093c", "#a60dc3", "#d09c58", "#B9CF77", "#CFBF80","#ffd500"];
var corPadrao = "#5A5A5A";

var coresAtuais = Array.from(areasClique).map(() => corPadrao);

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


