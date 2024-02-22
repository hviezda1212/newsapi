const API_KEY = `ac9a72663e6c47d28d7d39f05961835f`;
let url = new URL(`https://noonanewsapi.netlify.app/top-headlines?`);
let newsList = [];
let articles = [];
let page = 1;
let totalPage = 1;

const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let logo = document.querySelector(".pageHeader-logo");
logo.addEventListener("click", () => getLatestNews());

let userInput = document.getElementById("search-input");
userInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    getNewsByKeyword();
  }
});

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length == 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("error", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(`https://noonanewsapi.netlify.app/top-headlines?`);
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  if (category == "news") {
    return getLatestNews();
  }
  url = new URL(
    `https://noonanewsapi.netlify.app/top-headlines?category=${category}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  if (keyword == "") {
    return getLatestNews();
  }
  url = new URL(`https://noonanewsapi.netlify.app/top-headlines?q=${keyword}`);
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `        <div class="row news">
  <div class="col-lg-4">
    <img class="news-img" src=${news.urlToImage} />
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>${news.source.name} * ${news.publishedAt}</div>
  </div>
</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role = "alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const openNav = () => {
  document.getElementById("sideNav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("sideNav").style.width = "0";
};

getLatestNews();
