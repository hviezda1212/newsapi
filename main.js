const API_KEY =`ac9a72663e6c47d28d7d39f05961835f`
const getLatestNews = ()=> {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = fetch(url)
}

getLatestNews();