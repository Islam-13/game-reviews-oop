import { Games, UI } from "./ui.js";

const categories = document.querySelectorAll(".nav-link");
const games = new Games();
const ui = new UI();
let category;

games.getGames().then((games) => {
  ui.displayGames(games);
  ui.displayClickedGame();
  ui.closeDetails();
});

categories.forEach((cat) => {
  cat.addEventListener("click", function () {
    categories.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");
    category = this.dataset.category;
    games.getGames(category).then((games) => {
      ui.displayGames(games);
      ui.displayClickedGame();
      ui.closeDetails();
    });
  });
});
