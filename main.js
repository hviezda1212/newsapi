const API_KEY = `ac9a72663e6c47d28d7d39f05961835f`;
let news = []
const getLatestNews = async () => {
  const url = new URL(
    `https://noonanewsapi.netlify.app`
  );
  const response = await fetch(url);
  const data = await response.json()
  news = data.articles
  console.log("news",news)
};

getLatestNews();
