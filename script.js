// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
// Select The Start Game Button

// timer

let timer;

// username

let username;

document.querySelector(".control-buttons button").onclick = async function () {
	// Prompt Window To Ask For Name
	username = prompt("Whats Your Name?");

	// If Name Is Empty
	if (username == null || username == "") {
		// Set Name To Unknown
		document.querySelector(".name span").innerHTML = "Unknown";

		// Name Is Not Empty
	} else {
		// Set Name To Your Name
		document.querySelector(".name span").innerHTML = username;
	}
	background.play();
	// Remove Splash Screen
	document.querySelector(".control-buttons").remove();
	let timerElement = document.querySelector(".timer span");
	timer = setInterval(() => {
		timerElement.innerHTML--;
		if (timerElement.innerHTML === "0") {
			blocks.forEach((block) => {
				block.classList.remove("is-flipped");
			});
			clearInterval(timer);
			background.pause();
			blocks.forEach((block) => {
				block.style.pointerEvents = "none";
			});
			end("you are loser!");
		}
	}, 20);
};

// sounds

let fail = new Audio("audio/fail.mp3");
let correct = new Audio("audio/correct.mp3");
let background = new Audio("audio/background.mp3");

// Effect Duration
let duration = 1000;

// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
	// Add CSS Order Property
	block.style.order = orderRange[index];
	block.addEventListener("click", function () {
		flipBlock(block);
	});
});

// check matched blocks

function matchBlocks(first, second) {
	let tries = document.querySelector(".tries span");
	if (first.dataset.technology === second.dataset.technology) {
		first.classList.remove("is-flipped");
		second.classList.remove("is-flipped");
		first.classList.add("has-match");
		second.classList.add("has-match");
		correct.play();
		if (flippedBlocks.length === orderRange.length)
			setTimeout(() => {
				end("you are winner!");
			}, 35);
		else {
		}
	} else {
		setTimeout(() => {
			tries.innerHTML = parseInt(tries.innerHTML) + 1;
			first.classList.remove("is-flipped");
			second.classList.remove("is-flipped");
		}, duration);
		fail.play();
	}
}

// win

let tries = document.querySelector(".tries span");
function end(msg) {
	let flippedBlocks = blocks.filter((block) =>
		block.classList.contains("has-match"),
	);
	// Make Leader board
	clearInterval(timer);
	let user = {
		name: username,
		tries: tries,
	};
	localStorage.setItem(username, JSON.stringify(user));
	alert(msg);
}

// Flip block function

function flipBlock(selectedBlock) {
	selectedBlock.classList.add("is-flipped");
	let allBlocks = blocks.filter((flippedBlock) =>
		flippedBlock.classList.contains("is-flipped"),
	);
	if (allBlocks.length % 2 === 0) {
		stopClicking();
		matchBlocks(allBlocks[0], allBlocks[1]);
	}
}

function stopClicking() {
	// Disable Clicks
	blocksContainer.classList.add("no-clicking");
	setTimeout(() => {
		blocksContainer.classList.remove("no-clicking");
	}, duration);
}

function shuffle(array) {
	// Settings Vars
	let current = array.length,
		temp,
		random;

	while (current > 0) {
		// Get Random Number
		random = Math.floor(Math.random() * current);

		// Decrease Length By One
		current--;

		// [1] Save Current Element in Stash
		temp = array[current];

		// [2] Current Element = Random Element
		array[current] = array[random];

		// [3] Random Element = Get Element From Stash
		array[random] = temp;
	}
	return array;
}
