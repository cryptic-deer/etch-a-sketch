// Defining default values
let size = 16;
let color = "black";
let option = "custom";

let mouseDown = false;

// Looking for color mode switch via the buttons
function selectOption(selected) {
	setOption(selected);
	option = selected;
}

const container = document.querySelector("#container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#sliderValue");
const colorPicker = document.querySelector("#colorPicker");
// Buttons
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
// Buttons event listeners
customBtn.addEventListener("click", () => selectOption("custom"));
psychedelicBtn.addEventListener("click", () => selectOption("psychedelic"));
eraserBtn.addEventListener("click", () => selectOption("eraser"));
clearBtn.addEventListener("click", () => reloadGrid());

// Checking for mouse events and setting the mouseDown
document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

// Changing the grid size based on the slider's value
function changeGridSize(value) {
	size = value;
	sliderValue.innerHTML = `${value} x ${value}`;
	reloadGrid();
}

// Clearing and reloading the grid
function reloadGrid() {
	container.innerHTML = "";
	generateGrid(size);
}

// Creating the grid based on the size input
function generateGrid(size) {
	container.style.gridTemplateColumns = `repeat(${size},1fr)`;
	container.style.gridTemplateRows = `repeat(${size},1fr)`;

	// Creating the "pixels" and adding event listeners to each of them
	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");

		square.classList.add("square");
		square.addEventListener("mouseover", draw);
		square.addEventListener("mousedown", draw);
		container.appendChild(square);
	}
}

// Coloring the "pixels"
function draw(e) {
	e.preventDefault();
	if (e.type === "mouseover" && !mouseDown) return;
	colorChange(e);
}

// Setting the color based on which button was clicked
function colorChange(e) {
	if (option === "custom") {
		e.target.style.backgroundColor = color;
	} else if (option === "psychedelic") {
		e.target.style.backgroundColor = randomRGB();
	} else if (option === "eraser") {
		e.target.style.backgroundColor = "aliceblue";
	}
}

// Generating random rgb color for the psychedelic color scheme
function randomRGB() {
	const randomR = Math.floor(Math.random() * 256);
	const randomG = Math.floor(Math.random() * 256);
	const randomB = Math.floor(Math.random() * 256);
	return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

//
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

// save work on click
function capture() {
	const captureElement = document.querySelector("#container");
	html2canvas(captureElement)
		.then(canvas => {
			canvas.style.display = "none";
			document.body.appendChild(canvas);
			return canvas;
		})
		.then(canvas => {
			const image = canvas
				.toDataURL("image/png")
				.replace("image/png", "image/octet-stream");
			const a = document.createElement("a");
			a.setAttribute("download", "my-image.png");
			a.setAttribute("href", image);
			a.click();
			canvas.remove();
		});
}

const saveButton = document.querySelector(".download");
saveButton.addEventListener("click", capture);

window.addEventListener("load", () => {
	generateGrid(size);
	setOption(option);
});
