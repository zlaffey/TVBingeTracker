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
		document.querySelector("h1").innerText = data.name;
		document.querySelector("#showPoster").src = data.image.medium;
		document.querySelector("#summarySection").innerHTML = data.summary;
		data._embedded.cast.forEach((character) => {
			const li = document.createElement("li");
			const span = document.createElement("span");
			span.textContent = character.person.name;
			const castImg = document.createElement("img");
			castImg.className = "image fit";
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
			const li = document.createElement("article");
			li.className = "style2";
			li.id = `ep#${episode.id - 40645}`;
			li.addEventListener("click", watchShow);
			const span = document.createElement("span");
			span.className = "image";
			span.innerHTML = `<img src=${episode.image.medium}>`;
			const a = document.createElement("a");
			const title = document.createElement("h2");
			title.textContent = episode.name;
			const content = document.createElement("div");
			// content.className = "content";
			// content.innerHTML = episode.summary;
			// const span2 = document.createElement("span");
			// span2.className = "epTitle";
			// span2.textContent = episode.name;
			// const epImg = document.createElement("img");
			// epImg.className = "epImg";
			// epImg.src = episode.image.medium;

			a.appendChild(title);
			// a.appendChild(content);
			li.appendChild(span);
			li.appendChild(a);
			// li.appendChild(span2);
			// li.appendChild(epImg);

			document.querySelector("#episodeList").appendChild(li);

			function watchShow() {
				li.classList.toggle("style2");
				li.classList.toggle("style3");
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
