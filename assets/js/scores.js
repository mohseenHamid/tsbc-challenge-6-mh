let scoresList = document.getElementById("highscores");

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
