// document.querySelector('button').addEventListener('click', getFetch)
let watchedEpisodes = [];
let updatedEpisodes;

// function getFetch(){
// const choice = document.querySelector('input').value
// console.log(choice)
const url = `https://api.tvmaze.com/singlesearch/shows?q=friends&embed=cast`;

fetch(url)
	.then((res) => res.json()) // parse response as JSON
	.then((data) => {
		console.log(data);
		document.querySelector("h2").innerHTML = data.name;
		document.querySelector("img").src = data.image.medium;
		document.querySelector("#summarySection").innerHTML = data.summary;
		data._embedded.cast.forEach((character) => {
			const li = document.createElement("li");
			const span = document.createElement("span");
			span.textContent = character.person.name;
			const castImg = document.createElement("img");
			castImg.className = "headshot";
			castImg.src = character.person.image.medium;
			li.appendChild(castImg);
			li.appendChild(span);

			document.querySelector("#castList").appendChild(li);
		});
	})
	.catch((err) => {
		console.log(`error ${err}`);
	});
// }

const url2 = `https://api.tvmaze.com/singlesearch/shows?q=friends&embed=episodes`;

fetch(url2)
	.then((res) => res.json()) // parse response as JSON
	.then((data) => {
		console.log(data);
		data._embedded.episodes.forEach((episode) => {
			const li = document.createElement("li");
			li.className = "episodeItem";
			li.id = `ep#${episode.id - 40645}`;
			li.addEventListener("click", watchShow);
			const span = document.createElement("span");
			span.className = "releaseDate";
			span.textContent = episode.airdate;
			const span2 = document.createElement("span");
			span2.className = "epTitle";
			span2.textContent = episode.name;
			const epImg = document.createElement("img");
			epImg.className = "epImg";
			epImg.src = episode.image.medium;

			li.appendChild(span);
			li.appendChild(span2);
			li.appendChild(epImg);

			document.querySelector("#episodeList").appendChild(li);

			function watchShow() {
				li.classList.toggle("watched");
				console.log(li.id);
				watchedEpisodes.push(li.id);
				console.log(watchedEpisodes);
				localStorage.setItem(
					"watchedEpisodes",
					JSON.stringify(watchedEpisodes)
				);
			}
		});
	})
	.catch((err) => {
		console.log(`error ${err}`);
	});

// if (localStorage.getItem("watchedEpisodes")) {
// 	watchedEpisodes = JSON.parse(localStorage.watchedEpisodes);
// 	console.log(watchedEpisodes);
// 	watchedEpisodes.forEach((id) => {
// 		let ep = document.getElementById(id);
// 		ep.classList.add("watched");
// 	});
// } else {
// 	watchedEpisodes = [];
// }
