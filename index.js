

const gameDiv = document.querySelector('div#gameDiv');
const formTag = document.querySelector('form');

let winner = false;
let actualUser = null;

let gameObject = {
  x:{
    name:null,
    victories:0
  },
  o:{
    name:null,
    victories:0
  },
  gameArrays:{
    a:["", "", ""],
    b:["", "", ""],
    c:["", "", ""]
  },
  draws:0
};


const checkForWinnerArray = (array, currentValue) => {
  return array.every(element => element == currentValue);
};

const displaySideDivs = () => {
  document.getElementById('actualPlayer').hidden = false;
  document.getElementById('playersScore').hidden = false;
};

const displayActualPlayer = (userOnTurn) => {
  document.querySelectorAll('div#actualPlayer img').forEach((img) => {
    if (img.id != userOnTurn) {
      img.hidden = true;
    } else {
      img.hidden = false;
    }
  });
};

const displayGameBoard = () => {
    gameDiv.querySelectorAll('.row').forEach(div => div.style.display = "-webkit-flex");
    const firstPlayer = Math.floor(Math.random() * Math.floor(2));
    firstPlayer == 0 ? actualUser = "x" : actualUser = "o";

    displayActualPlayer(actualUser);
    displaySideDivs();
}

const savePlayerInput = (userInput,divIdArray) => {

  gameObject.gameArrays[divIdArray[0]][divIdArray[1]] = userInput;

  const lastMoveArrayHor = gameObject.gameArrays[divIdArray[0]].join('');
  if(lastMoveArrayHor.length == 3){
    winner = checkForWinnerArray(lastMoveArrayHor.split(''),userInput);
  };

  const lastMoveArrayVert = Array.from("abc", x => gameObject.gameArrays[x][divIdArray[1]]);
  debugger
  // "abc".forEach(letter => {
  //
  // });

  // 
  //     gameObject.gameArrays[divIdArray[0]];
  //
  // if(lastMoveArrayVert.length == 3){
  //   winner = checkForWinnerArray(lastMoveArrayVert.split(''),userInput);
  // };



  debugger


};

const makeGameMove = (divId,moveUser) => {
  document.querySelectorAll(`div#${divId} img`).forEach((img) => {
    if (img.className != moveUser) {
      img.remove();
    } else {
      img.className = "choosen";
    }
  });

  if(winner === false) {
      moveUser == "x" ? actualUser = "o" : actualUser = "x";
  }

};

document.querySelector("#myForm").addEventListener("submit", function(e){
  e.preventDefault();
  gameObject.x.name = e.target.xName.value;
  gameObject.o.name = e.target.oName.value;
  e.target.parentElement.remove();
  swal ( "Begin!" ,  `${gameObject.x.name} Vs ${gameObject.o.name}`,  "success" );
  displayGameBoard();

});

document.addEventListener('click',(event => {

      if(actualUser != null){
        let targetDiv;
        if (event.target.parentElement.className == "col-sm" ){
          targetDiv = event.target.parentElement;
        } else if (event.target.className == "col-sm" ){
          targetDiv = event.target;
        }
        if (targetDiv != undefined) {
          targetDiv.style.pointerEvents = "none";
          savePlayerInput(actualUser,targetDiv.id.split(''));
          makeGameMove(targetDiv.id, actualUser);
          displayActualPlayer(actualUser);
        }
      }
    }));
