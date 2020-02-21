const newsList = document.querySelector("#news-list");
// create element & render news
function renderNews(doc) {
	let li = document.createElement("li");
	let anchor = document.createElement("a");
	let by = document.createElement("span");

	li.setAttribute("data-id", doc.id);
	anchor.setAttribute("href", doc.url);
	anchor.setAttribute("target", "_blank");
	anchor.textContent = doc.title;
	by.textContent = doc.by;

	li.appendChild(anchor);
	li.appendChild(by);

	newsList.appendChild(li);
}

fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
	.then(resp => resp.json())
	.then(newsJson => {
		for (let i = 0; i <= newsJson.length; i++) {
			if (i >= 10) break;
			fetch(
				"https://hacker-news.firebaseio.com/v0/item/" + newsJson[i] + ".json"
			)
				.then(resp => resp.json())
				.then(data => {
					renderNews(data);
				})
				.catch(err => console.log(err));
		}
	})
	.catch(err => console.log(err));
