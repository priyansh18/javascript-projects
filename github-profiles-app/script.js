const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();
  createUserCard(respData);
  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();
  addReposToCard(respData);
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 100).forEach((repo) => {
    const repoEl = document.createElement("a");

    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

function createUserCard(username) {
  const cardHTML = `
  <div class="card">
      <div>
          <img class="avatar" src="${username.avatar_url}" alt="${username.name}" />
      </div>
      <div class="user-info">
          <h2>${username.name}</h2>
          <p>${username.bio}</p>
          <ul class="info">
              <li>${username.followers}<strong>Followers</strong></li>
              <li>${username.following}<strong>Following</strong></li>
              <li>${username.public_repos}<strong>Repos</strong></li>
          </ul>
          <h4>Repos : </h4>
          <div id="repos"></div>
      </div>
  </div>
`;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  console.log(user);

  if (user) {
    getUser(user);

    search.value = "";
  }
});
