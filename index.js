let size = 16;
let mouseDown = false;

const container = document.querySelector("#container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#sliderValue");

slider.addEventListener("input", e => changeGridSize(e.target.value));
slider.addEventListener(
	"mousemove",
	e => (sliderValue.innerHTML = `${e.target.value} x ${e.target.value}`)
);

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

	e.target.style.backgroundColor = "black";
}

window.onload = () => {
	generateGrid(size);
};
