let scoresList = document.getElementById("highscores");
let clearScoresBtn = document.getElementById("clear");

renderRegistered();

function renderRegistered() {
	const regResultArray = JSON.parse(localStorage.getItem("result"));

	regResultArray.forEach(function (i) {
		if (i === null) {
			return;
		} else {
			let row = document.createElement("li");
			row.textContent = i;
			scoresList.appendChild(row);
		}
	});
}

clearScoresBtn.addEventListener("click", function () {
	localStorage.clear();
	while (scoresList.firstChild) {
		scoresList.removeChild(scoresList.firstChild);
	}
});
