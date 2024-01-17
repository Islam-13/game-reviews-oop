const gamesSection = document.querySelector(".games");
const detailsSection = document.querySelector(".details");
const gameDetalis = document.querySelector(".game-detalis");
const gamesDOM = document.querySelector(".games-center");
const loader = document.querySelector(".loader");

//getting games data
export class Games {
  async getGames(category = "mmorpg") {
    try {
      loader.classList.remove("d-none");
      const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "179940949dmshc046c927457c7a0p1fdc11jsn29297a630992",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      let res = await fetch(url, options);
      res = await res.json();
      loader.classList.add("d-none");
      return res;
    } catch (error) {
      console.error(error);
    }
  }
  async getClickedGame(id) {
    try {
      loader.classList.remove("d-none");
      const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "179940949dmshc046c927457c7a0p1fdc11jsn29297a630992",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      let res = await fetch(url, options);
      res = await res.json();
      loader.classList.add("d-none");
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}

//display games
export class UI extends Games {
  displayGames(games) {
    let content = "";

    games.forEach((game) => {
      const gameDescription =
        [...game.short_description].slice(0, 42).join("") + "...";
      content += `
      <div class="col-sm-6 col-md-4 col-lg-3 gy-4">
        <div class="game-card rounded-2" data-id=${game.id} >
          <div class="game-poster p-3">
            <img
              src=${game.thumbnail}
              alt="game"
              class="w-100 object-fit-cover rounded-top-2"
            />
          </div>
          <div class="game-body">
            <div class="head d-flex justify-content-between px-3">
              <h3>${game.title}</h3>
              <span>free</span>
            </div>
            <p class="text-center opacity-50 small px-3 mb-5">${gameDescription}</p>
            <div class="info d-flex justify-content-between">
              <span>${game.genre}</span>
              <span>${game.platform}</span>
            </div>
          </div>
        </div>
      </div>
        `;
    });
    gamesDOM.innerHTML = content;
  }

  displayClickedGame() {
    const cards = document.querySelectorAll(".game-card");

    cards.forEach((card) => {
      card.addEventListener("click", function () {
        let id = card.dataset.id;
        Games.prototype.getClickedGame(id).then((game) => {
          gamesSection.classList.add("d-none");
          detailsSection.classList.remove("d-none");
          gameDetalis.innerHTML = `
            <div class="col-md-4">
                <img src=${game.thumbnail} alt="game photo" class="w-100" />
              </div>
              <div class="col-md-8">
                <h3>Title: ${game.title}</h3>
                <p>Category: <span class="text-bg-info badge">${game.genre}</span></p>
                <p>Platform: <span class="text-bg-info badge">${game.platform}</span></p>
                <p>Status: <span class="text-bg-info badge">${game.status}</span></p>
                <p class="game-description">${game.description}</p>
                <a href=${game.game_url} target="_blank" class="btn btn-outline-warning text-white mb-3">Show Game</a>
              </div>
            `;
        });
      });
    });
  }

  closeDetails() {
    const closeBtn = document.getElementById("btnClose");
    closeBtn.addEventListener("click", () => {
      gamesSection.classList.remove("d-none");
      detailsSection.classList.add("d-none");
    });
  }
}
