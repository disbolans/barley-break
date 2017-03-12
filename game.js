/**
 * Created by dmitry on 19.02.17.
 */

var fild = [];
var x, y;
var size  = 2;
var n = 1024;

function newGame() {

    for(i = 0; i < size; i++){
        fild[i] = [];
        for(j = 0; j < size; j++){
            if(i + j != 2*(size - 1)){
                fild[i][j] = i*size + j + 1;
            }
            else {
                fild[i][j] = "";
            }
        }
    }


    var gameFild = document.createElement("table");
    for(i = 0; i < size; i++){
        var row = document.createElement("tr");

        for(j = 0; j < size; j++) {
            var cell = document.createElement("td");
            cell.id = "id" +i + j;
            if( i + j != 2*(size - 1))
                cell.innerHTML = i*size + j + 1;
            row.appendChild(cell);
        }
        gameFild.appendChild(row);
    }
    var box = document.getElementById("box");
    box.appendChild(gameFild);
    startSwap();
}

function draw() {
    for(i = 0; i < size; i++){
        for(j = 0; j < size; j++) {
            $("#id" + i + j)[0].innerHTML = fild[i][j];
        }
    }
}

function checkWin() {
    var currentValue = 0;
    var result = true;
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            if(i + j != 2*(size - 1))
                if(fild[i][j] == null || fild[i][j] != currentValue + 1)
                    result = false;

            currentValue = fild[i][j];
        }
    }
    return result;
}

function move(direction) {
    var nx = x, ny = y;
    switch (direction){
        case 3: if(x != 0) nx--; break;
        case 2: if(y != 0) ny--; break;
        case 1: if(x != size - 1) nx++; break;
        case 0: if(y != size - 1) ny++; break;
    }

    var s = fild[x][y];
    fild[x][y] = fild[nx][ny];
    fild[nx][ny] = s;
    x = nx;
    y = ny;
    draw();

}

function startSwap() {
    x = size - 1;
    y = size - 1;
    for(var i = 0; i < n; i++){
        var direction = Math.round(3*Math.random());
        move( direction);
    }
}

window.onload = function () {
    newGame();
}

$( document ).keydown(function(event) {
   move(event.which - 37);
   if(checkWin()){
       alert('u won');
   }
});
