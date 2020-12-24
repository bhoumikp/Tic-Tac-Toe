var pattern = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], ['0', '4', '8'], ['2', '4', '6']];
var boxes = Array.from(document.querySelectorAll('.box'));
var winner = document.querySelector('.turn p');
var playerBtn = document.querySelector('.players');
var turn = 'O', game, player = '1P', X = 0, O = 0, win = null;


function start() {
	game = ['', '', '', '', '', '', '', '', ''];
	graphics();
	boxes.forEach((box) => listener(box, handleListener, 'click', 'add'))
	listener(document.querySelector('.restart'), restart, 'click', 'add');
	listener(document, controls, 'keydown', 'add');
	listener(playerBtn, selectPlayer, 'click', 'add');
	computer();
}

function handleListener() {
	var boxIndex = boxes.indexOf(event.target);
	game[boxIndex] = turn; 
	graphics();
	winPattern();
	draw();
	computer();
}

function computer() {
	var randomNum = Math.floor(Math.random() * 9);
	var randomSquare = document.querySelectorAll('.box')[randomNum];
	var boxWithO;

	if (player === '1P' && turn === 'O' && win === null) {
		if (game[randomNum] === '') {
			randomSquare.click();
			boxes.forEach((box) => box.querySelector('div').style.transitionDelay = '.2s')
		} else {
			computer();
		}
	} 
}

function graphics() {
	game.forEach(function (shape, index) { 
		var squares = document.querySelectorAll('.box')[index].querySelector('div');
		if (squares.classList  == 0 && shape != '') {
			squares.classList.add(shape);
			turn = turn === 'X' ? 'O' : 'X';
		}
	})			
	winner.textContent = turn + ' Turn';
}

function selectPlayer() {
	player === '2P' ? player = '1P' : player = '2P';
	document.querySelector('.scoreX').textContent = 0;
	document.querySelector('.scoreO').textContent = 0;
	playerBtn.textContent = player;
	restart();
	X = O = 0;
}

function winPattern() {
	pattern.forEach(function(arr) {
		if (game[arr[0]] != '' && win == null) {
			if (game[arr[0]] === game[arr[1]] && game[arr[2]] === game[arr[1]]) {
				changeScore();
				winAnime(arr);				
			}
		}
	})
}

function changeScore() {
	var score;
	(turn === 'X') ? win = 'O' : win = 'X';
	if (win === 'X') {
		X++;
		score = X;
	} else if (win === 'O') {
		O++;
		score = O;
	} 
	document.querySelector('.score' + win).textContent = score;
}

function winAnime(arr) {
	var winBoxes = [boxes[arr[0]], boxes[arr[1]], boxes[arr[2]]];
	winner.textContent = win + ' Win!';

	boxes.forEach(function(box) {
		box.querySelector('div').classList.add('op');
		listener(box, handleListener, 'click', 'remove');
	})

	winBoxes.forEach(function(winBox) {
		winBox.querySelector('div').classList.remove('op');
		animation(winner, 'flash');
		animation(winBox.querySelector('div'), 'flash');
	})
}

function draw() {
var checkClassLen = boxes.every((box) => box.querySelector('div').classList.length == 1);
	if (checkClassLen) {
		winner.textContent = 'Draw!';

		boxes.forEach(function(box) {
			box.querySelector('div').classList.add('op');
			animation(winner, 'flash');
			animation(box, 'border-col');
			listener(box, handleListener, 'click', 'remove');
		})
	}
}

function restart() {
	player === '1P' ? turn = 'O' : turn = 'X';
	win = null;
	winner.textContent = turn + ' Turn';
	boxes.forEach(function(box) { 
		box.innerHTML = '<div></div>';
		listener(box, restart, 'click');
	})
	start();
}

function listener(ele, func, event, addRemove) {
	(addRemove === 'add') ? ele.addEventListener(event, func) : ele.removeEventListener(event, func);
}

function animation(ele, className) {
	ele.classList.add(className);
	setTimeout(() => ele.classList.remove(className), 4000)
}


function controls() {
	boxes.forEach(function(box, index) {
		var numPad = index + 97;
		var boxNum = box.classList[0];

		switch(event.keyCode) {
			case numPad : 
				if (game[boxNum] === '') {
					document.querySelectorAll('.box')[boxNum].click();
				}
				break;
		}
	})

	switch(event.keyCode) {
		case 13 :
			restart();
			break;
		
		case 80 :
			selectPlayer();
			break;
	} 
}

start();





























document.querySelector('style').innerHTML = ':root {--X: #d86c76; --O: #ffba93;}';