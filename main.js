const API_KEY = `ac9a72663e6c47d28d7d39f05961835f`;
let newsList = [];
const getLatestNews = async () => {
  const url = new URL(`https://noonanewsapi.netlify.app/top-headlines?`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("news", newsList);
};

const render = () => {
  const newsHTML = newsList.map(
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
  ).join("");

  console.log("html",newsHTML)
  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
