// Define the `boggleApp` module
var boggleApp = angular.module('boggleApp', []);

// Define the `BoggleController` controller on the `boggleApp` module
boggleApp.controller('BoggleController', function BoggleController($scope) {

  $scope.totalScore = 0;
  $scope.selectedWords = []; // This should persist after submiting word so outside InitState() .
  boggleBoardData = [
      "aaafrs",
      "aaeeee",
      "aafirs",
      "adennn",
      "aeeeem",
      "aeegmu",
      "aegmnn",
      "afirsy",
      "bjkqxz",
      "ccenst",
      "ceiilt",
      "ceilpt",
      "ceipst",
      "ddhnot",
      "dhhlor",
      "dhlnor",
      "dhlnor",
      "eiiitt",
      "emottt",
      "ensssu",
      "fiprsy",
      "gorrvw",
      "iprrry",
      "nootuw",
      "ooottu"
  ];

  boggleBoardData = shuffle(boggleBoardData);
  $scope.dies = [];
  rollDie();


  // Shuffles the array, so that we get different order every time we start the app or refresh the page.
  function shuffle(array) {
    var copy = [], n = array.length, i;

    // While there remain elements to shuffle…
    while (n) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);

      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }

    return copy;
  }

  // Used to simulate roll die functionality in order to have random characters from each string
  function rollDie(){
    for(var i=0;i<5;i++){
      for(var j=0;j<5;j++){
        var diePos = Math.floor((Math.random() * 6));
        var currentChar = boggleBoardData[i*5+j].charAt(diePos);
        currentChar = currentChar.toUpperCase();
        if(currentChar == "Q"){
          currentChar = "Qu";
        }
        $scope.dies.push({
            char : currentChar,
            selected : false,
            position :{
              row : i+1,
              col : j+1
            }
        });
      }
    }
    console.log($scope.dies);
  }

  initState();

  // Selects or unselects a die
  $scope.selectDie = function(die){
    if(!die.selected){
      if($scope.selectedPositions.length !== 0){
        if(checkValidPosition(die.position)){
          addToWord(die);
        }
      }
      else{
        addToWord(die);
      }
    }
    else{
      if(die.position === $scope.selectedPositions[$scope.selectedPositions.length-1]){
        removeFromWord(die);  
      }
    }
  }

  // Function for submitting a new word.
  $scope.submitWord = function(){
    if($scope.currentWord.length  && !checkDuplicateWords()){
      calculateScore();
      initState();
    }
  }

  // Function to add the selected character to current word and selecting the respective die
  function addToWord(die){
    $scope.currentWord += die.char;
    die.selected = true;
    $scope.selectedPositions.push(die.position);
  }

  // Function for removing the last character from current word and unselecting the respective die
  function removeFromWord(die){
    $scope.currentWord = $scope.currentWord.substring(0, $scope.currentWord.length-1);
    die.selected = false;
    $scope.selectedPositions.pop();
  } 

  // Function for checking if the new position is adjacent to previous position
  function checkValidPosition(position){
      var row = position.row;
      var col = position.col;
      var lastPos = $scope.selectedPositions[$scope.selectedPositions.length-1];
      var lastRow = lastPos.row;
      var lastCol = lastPos.col;
      
      if(checkCol() && checkRow()){
        return true;
      }
      else{
        return false;
      }

      function checkCol(){
        var colDiff = col - lastCol;
        if(colDiff == 0 || colDiff == 1 || colDiff == -1){
          return true;
        }
        else{
          return false
        }
      }

      function checkRow(){
        var rowDiff = row - lastRow;
        if(rowDiff == 0 || rowDiff == 1 || rowDiff == -1){
          return true;
        }
        else{
          return false
        }
      }
  }

  // Function for calculating the score
  function calculateScore (){
    if($scope.currentWord.length<=2){
      $scope.selectedWords.push({
        word : $scope.currentWord,
        score : 0
      });
    }
    else if($scope.currentWord.length >=3 && $scope.currentWord.length <= 4){
      $scope.selectedWords.push({
        word : $scope.currentWord,
        score : 1
      });
      $scope.totalScore += 1;
    }
    else if($scope.currentWord.length === 5){
      $scope.selectedWords.push({
        word : $scope.currentWord,
        score : 2
      });
      $scope.totalScore += 2;
    }
    else if($scope.currentWord.length === 6){
      $scope.selectedWords.push({
        word : $scope.currentWord,
        score : 3
      });
      $scope.totalScore += 3;
    }
    else if($scope.currentWord.length === 7){
      $scope.selectedWords.push({
        word : $scope.currentWord,
        score : 5
      });
      $scope.totalScore += 5;
    }
    else if($scope.currentWord.length >= 8){
      $scope.selectedWords.push({
        word : $scope.currentWord,
        score : 11
      });
      $scope.totalScore += 11;
    }
  }

  // Function for checking duplicate words
  function checkDuplicateWords(){
    var isDuplicate = false;
    $scope.selectedWords.forEach(function(word){
      if(word.word === $scope.currentWord){
        isDuplicate = true;
      }
    });
    return isDuplicate;
  }

  // Function for changing the board to initial state after a word has been submitted
  function initState(){
    $scope.currentWord = "";
    //$scope.selectedDies = [];
    $scope.selectedPositions = [];
    $scope.dies.forEach(function(die){
      die.selected = false;
    });

    
    //console.log("dies ",$scope.dies);
  }

});