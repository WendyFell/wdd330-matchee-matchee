const gridbutton = document.querySelector("#dirGrid");
const listbutton = document.querySelector("#dirList");
const display = document.querySelector("article");

// gridbutton.addEventListener("click", () => {
// 	display.classList.add("dirGrid");
// 	display.classList.remove("dirList");
// });

// listbutton.addEventListener("click", () => {
// 	display.classList.add("dirList");
// 	display.classList.remove("dirGrid");
// });

const requestURL = "https://wendyfell.github.io/wdd330-matcheematchee/data/mom-ancestors.json";
const cards = document.querySelector(".cards");

async function getData() {
	try {
		const request = new Request(requestURL);
		const response = await fetch(request);
		console.log(response.ok);
		const jsonObject = await response.json();
		const allAncestors = jsonObject["ancestors"];
		allAncestors.forEach((ancestor) => {
			displayBusinesses(ancestor);
		});
		return jsonObject;
	} catch(err){
		console.log(err)
	}
};
getData().then((jsonObject) => console.log(jsonObject));

function displayBusinesses(ancestor) {
	let icon = document.createElement("img");
	let card = document.createElement("section");
	let h3 = document.createElement("h3");
	let p1 = document.createElement("p");
	
				
	h3.textContent = ancestor.name;
	p1.textContent = ancestor.lastname;
		
	
	icon.setAttribute("src", ancestor.imageurl)
	icon.setAttribute("alt", `${ancestor.name}'s icon`)
			
	card.appendChild(icon);
	card.appendChild(h3);
	
		
	document.querySelector("article.cards").appendChild(card);
};
