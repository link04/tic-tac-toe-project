

const gameDiv = document.querySelector('div#gameDiv');
const formTag = document.querySelector('form');

let winner = false;
let draw = false;
let actualUser = null;

const defaultGameObject = {
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
  draws:0,
  reset: () => {
       this.prop1 = false;
       this.prop2 = true;
       this.prop3 = null;
   }
};

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
  draws:0,
  reset: () => {
       this.prop1 = false;
       this.prop2 = true;
       this.prop3 = null;
   }
};

const checkForWinnerArray = (array) => {
  if(array.length == 3 && winner === false){
    winner = array.split('').every(element => element == actualUser);
  }
};

const displaySideDivs = () => {
  document.getElementById('actualPlayer').hidden = false;
  document.getElementById('playersScore').hidden = false;
};

const displayActualPlayer = (userOnTurn) => {
  document.getElementById('actualPlayerHeader').innerText = `It is ${gameObject[actualUser].name}'s Turn`
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

// Need to remane this functuons to correct way
const findXarrayValues = (i) => {
  let valuesString;

  if(i == 0){
    valuesString = Array.from("abc", x => {
         let value = gameObject.gameArrays[x][i];
         i++;
    return value;
    }).join('');
  } else {
    valuesString = Array.from("abc", x => {
         let value = gameObject.gameArrays[x][i];
         i--;
    return value;
    }).join('');
  }

  return valuesString;
}

const findAmountOfMoves = () => {
  let moves = 0;

  ["a","b","c"].forEach(letter => moves += gameObject.gameArrays[letter].join('').length);

  return moves;
}

const savePlayerInput = (divIdArray) => {

  gameObject.gameArrays[divIdArray[0]][divIdArray[1]] = actualUser;

  const lastMoveArrayHor = gameObject.gameArrays[divIdArray[0]].join('');
  const lastMoveArrayVert = Array.from("abc", key => gameObject.gameArrays[key][divIdArray[1]]).join('');
  const arrayAdecending = findXarrayValues(0);
  const arrayAacending = findXarrayValues(2);

  if(lastMoveArrayHor.length == 3 || lastMoveArrayVert.length == 3 || arrayAdecending.length == 3 ||arrayAacending.length == 3){
    checkForWinnerArray(lastMoveArrayHor);
    checkForWinnerArray(lastMoveArrayVert);
    checkForWinnerArray(arrayAdecending);
    checkForWinnerArray(arrayAacending);

    const amountOfMoves = findAmountOfMoves();
    console.log(amountOfMoves);


    if (amountOfMoves >= 8 && winner === false){
      draw = true;
      swal(`Oh snap!` ,  `Is a draw :c`,  "warning" );
    }
  }

    if(winner === false) {
        actualUser == "x" ? actualUser = "o" : actualUser = "x";
    }
};

const makeGameMove = (divId,moveUser) => {
  document.querySelectorAll(`div#${divId} img`).forEach((img) => {
    if (img.className != moveUser) {
      img.remove();
    } else {
      img.className = "choosen";
    }
  });
};

// const makeGameMove = (divId,moveUser) => {
//   document.querySelectorAll(`div#${divId} img`).forEach((img) => {
//     if (img.className != moveUser) {
//       img.remove();
//     } else {
//       img.className = "choosen";
//     }
//   });
// };

document.querySelector("#myForm").addEventListener("submit", function(e){
  e.preventDefault();
  gameObject.x.name = e.target.xName.value;
  gameObject.o.name = e.target.oName.value;
  e.target.parentElement.remove();
  swal( "Begin!" ,  `${gameObject.x.name} Vs ${gameObject.o.name}`,  "success" );
  displayGameBoard();

});

document.addEventListener('click',(event => {

      if(actualUser != null){
        let targetDiv;
        if (event.target.parentElement.className == "col tic-tac-toe" ){
          targetDiv = event.target.parentElement;
        } else if (event.target.className == "col tic-tac-toe" ){
          targetDiv = event.target;
        }
        if (targetDiv != undefined) {
          targetDiv.style.pointerEvents = "none";
          makeGameMove(targetDiv.id, actualUser);
          savePlayerInput(targetDiv.id.split(''));
          if(winner === false){
            displayActualPlayer(actualUser);
          } else {
            gameObject[actualUser].victories += 1;
            swal( `${gameObject[actualUser].name} Won!` ,  `Victory #${gameObject[actualUser].victories}`,  "success" );
          }

        }
      }
    }));
