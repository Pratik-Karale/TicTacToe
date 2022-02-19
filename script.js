const boardDisplayBoxes = Array.from(document.querySelectorAll(".box"))


const gameBoard = (function (players) {
    const boardDisplay = document.querySelector(".board")
        
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    
    let currentPlayer = players[0]

    const getBoxValue = (position) =>
        boardDisplayBoxes[position].classList[1];
    
    const getCurrentPlayer=()=>currentPlayer;

    
    const placeMark = (boxElem) => {
        boxElem.classList.add(currentPlayer.mark);
    }
    

    const getResult = () => {
        return {winner:checkWin()}
    }
    
    
    const switchTurn = () => {
        if (currentPlayer.mark == "x") {
            currentPlayer=players.find((player)=>player!==currentPlayer)
            boardDisplay.classList.replace("cross", "circle")
        } else {
            currentPlayer=players.find((player)=>player!==currentPlayer)
            boardDisplay.classList.replace("circle", "cross")
        }
    }
    

    const checkWin = () => {
        return winningCombos.some((combo) =>
            combo.every((position) => getBoxValue(position)==currentPlayer.mark))
    }
    

    const checkTie=()=> boardDisplayBoxes.every((box)=>{
        return box.classList.contains("x") || box.classList.contains("o")
    })
    
    const restart=()=>{
        [players[0].mark,players[1].mark]=["x","o"]
        boardDisplayBoxes.forEach((box)=>box.classList.remove(box.classList[1]))
        boardDisplay.classList.replace("circle","cross")
        currentPlayer=players[0]
    }

    return {getResult,switchTurn,placeMark,getCurrentPlayer,checkTie,checkWin,restart}
})

function Player(mark,name){
    this.mark=mark
    this.name=name
}
function DialogGen(){
    const overlayScreen=document.querySelector(".overlay-screen")
    const showScreen=()=>overlayScreen.classList.add("active")
    const hideScreen=()=>overlayScreen.classList.remove("active")


    this.askRematch=(msg)=>{
        const overlayMsg=document.querySelector("#overlay-message")
        overlayMsg.textContent=msg
        const restartBtn=getElement(`<button id="restart-btn">Restart</button>`)
        overlayScreen.appendChild(restartBtn)
        restartBtn.addEventListener("click",()=>{
            myGameBoard.restart()
            restartBtn.remove()
            hideScreen()
        },{once:true})
        showScreen()
    }
    
}



const xPlayer=new Player("x")
const oPlayer=new Player("o")
const dialogGen=new DialogGen()

const myGameBoard=gameBoard([xPlayer,oPlayer])
// while(!myGameBoard.getResult.won){

// }
boardDisplayBoxes.forEach((box)=>{box.addEventListener("click",()=>{
    myGameBoard.placeMark(box)
    if(myGameBoard.checkTie()){
        dialogGen.askRematch(`Tie!!`);
    }
    else if(myGameBoard.checkWin())
        dialogGen.askRematch(`${myGameBoard.getCurrentPlayer().mark.toUpperCase()} WINS!!`);

    myGameBoard.switchTurn()
})})
