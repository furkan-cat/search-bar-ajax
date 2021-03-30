"use strict";
// Variables
const characterList = document.getElementById("characterList");
const searchBar = document.getElementById("searchBar");
let filmCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCharacters = filmCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://hp-api.herokuapp.com/api/characters");
    filmCharacters = await res.json();
    console.log(filmCharacters);
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
