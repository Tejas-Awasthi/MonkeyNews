import "./app.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { Component, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const App = () => {
	const [news, setNews] = useState([])
	const [totalResults, setTotalResults] = useState(0)
	const [NewsCategory, setNewsCategory] = useState("general")
	const [reset, setReset] = useState(false)
	const [noElementsModal, setNoElementsModal] = useState(false)
	const [progress, setProgress] = useState(0)
	const getCategory = (category) => {
		setNews([])
		setNewsCategory(category)
		setNoElementsModal(false)
		fetchNews(undefined, 10, 1, category);
	};
	const resetButton = () => {
		setNews([])
		setNewsCategory("general")
		setReset(true)
		setNoElementsModal(false)

		document.title = "Monkey News";
	};
	const fetchNews = async (query, pageSize, currentPageNo, category) => {
		setReset(false)
		setNoElementsModal(false)
		let url = "";
		if (!query) {
			const activeCategory = category || "general";
			url = `https://newsapi.org/v2/top-headlines?page=${currentPageNo}&category=${activeCategory}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
			document.title = activeCategory.toString()[0].toUpperCase() + activeCategory.toString().slice(1) + " - Monkey News";
		} else {
			url = `https://newsapi.org/v2/everything?q=${query}&page=${currentPageNo}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
			document.title = query + " - Monkey News";
		}
		setProgress(30)
		let data = await fetch(url);
		setProgress(60)
		let jsonData = await data.json();
		setProgress(80)
		console.log(jsonData);

		let totalResults = jsonData.totalResults;

		if (totalResults == 0) {
			setNoElementsModal(true)
		}
		setNews(prevNews =>
			currentPageNo === 1
				? jsonData.articles
				: [...prevNews, ...jsonData.articles]
		);

		setTotalResults(totalResults);
		setNewsCategory(category);
		setReset(false);
		setProgress(100)
		return jsonData.articles;
	};


	return (
		<>
			<LoadingBar color="#bd94ff" progress={progress} height={3} onLoaderFinished={() => setProgress(0)} />
			<Navbar reset={resetButton} fetchNews={fetchNews} category={getCategory} />
			<News noElementsModal={noElementsModal} reset={reset} category={NewsCategory} fetchNews={fetchNews} news={news} totalResults={totalResults} />
		</>
	);
}

export default App;
