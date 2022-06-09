const container = document.querySelector("#container");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

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
	generateGrid(16);
};
