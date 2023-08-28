var matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  
  var numColunas = matriz[0].length; 
  
  for (var col = 0; col < numColunas; col++) {
    for (var row = 0; row < matriz.length; row++) {
      var elemento = matriz[row][col];
      console.log("Elemento na coluna " + col + ", linha " + row + ": " + elemento);
    }
  }