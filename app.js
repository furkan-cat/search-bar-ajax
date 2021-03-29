"use strict";
// Variables
const characterList = document.getElementById("characterList");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

console.log(searchBar);

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.includes(searchString) ||
      character.house.includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});
// // XMLHttpRequest
// const http = new XMLHttpRequest();
// const url = "http://hp-api.herokuapp.com/api/characters";
// http.open("GET", url);
// http.send();
// http.onreadystatechange = (e) => {
//   //console.log(http.responseText);
// };

const loadCharacters = async () => {
  try {
    const res = await fetch("http://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    console.log(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters.map((character) => {
    return `
      <li class="character">
          <h2>${character.name}</h2>
          <p>House: ${character.house}</p>
          <img src="${character.image}"></img>
      </li>
      `;
  });
  characterList.innerHTML = htmlString;
};
loadCharacters();
