let size = 16;
let color = "black";
let option = "custom";

let mouseDown = false;

function selectOption(selected) {
	setOption(selected);
	option = selected;
}

const container = document.querySelector("#container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#sliderValue");
const colorPicker = document.querySelector("#colorPicker");

const customBtn = document.querySelector("#customBtn");
const psychedelicBtn = document.querySelector("#psychedelicBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");

slider.addEventListener("input", e => changeGridSize(e.target.value));
slider.addEventListener(
	"mousemove",
	e => (sliderValue.innerHTML = `${e.target.value} x ${e.target.value}`)
);
colorPicker.addEventListener("change", e => (color = e.target.value));

customBtn.addEventListener("click", () => selectOption("custom"));
psychedelicBtn.addEventListener("click", () => selectOption("psychedelic"));
eraserBtn.addEventListener("click", () => selectOption("eraser"));
clearBtn.addEventListener("click", () => reloadGrid());

document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

function changeGridSize(value) {
	size = value;
	sliderValue.innerHTML = `${value} x ${value}`;
	reloadGrid();
}

function reloadGrid() {
	container.innerHTML = "";
	generateGrid(size);
}

function generateGrid(size) {
	container.style.gridTemplateColumns = `repeat(${size},1fr)`;
	container.style.gridTemplateRows = `repeat(${size},1fr)`;

	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");

		square.classList.add("square");
		square.addEventListener("mouseover", draw);
		square.addEventListener("mousedown", draw);
		container.appendChild(square);
	}
}

function draw(e) {
	if (e.type === "mouseover" && !mouseDown) return;
	colorChange(e);
}

function colorChange(e) {
	if (option === "custom") {
		e.target.style.backgroundColor = color;
	} else if (option === "psychedelic") {
		e.target.style.backgroundColor = randomRGB();
	} else if (option === "eraser") {
		e.target.style.backgroundColor = "aliceblue";
	}
}

function randomRGB() {
	const randomR = Math.floor(Math.random() * 256);
	const randomG = Math.floor(Math.random() * 256);
	const randomB = Math.floor(Math.random() * 256);
	return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function setOption(selected) {
	if (option === "custom") {
		customBtn.classList.remove("active");
	} else if (option === "psychedelic") {
		psychedelicBtn.classList.remove("active");
	} else if (option === "eraser") {
		eraserBtn.classList.remove("active");
	}

	if (selected === "custom") {
		customBtn.classList.add("active");
	} else if (selected === "psychedelic") {
		psychedelicBtn.classList.add("active");
	} else if (selected === "eraser") {
		eraserBtn.classList.add("active");
	}
}

window.onload = () => {
	generateGrid(size);
	setOption(option);
};
