import "./app.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { Component } from "react";

export class App extends Component {
	constructor() {
		super();
		this.state = {
			news: [],
			totalResults: 0,
			NewsCategory: undefined,
			loading: false,
			reset: false,
			noElementsModal: false,
		};
	}
	getCategory = (category) => {
		this.setState({ NewsCategory: category });
		// return category
	};
	resetButton = () => {
		this.setState({ reset: true });
		document.title = "Monkey News";
	};
	fetchNews = async (query, pageSize, currentPageNo, category) => {
		this.setState({ loading: true, reset: false, noElementsModal: false });
		let url = "";
		if (!query) {
			const activeCategory = category || "general";
			url = `https://newsapi.org/v2/top-headlines?page=${currentPageNo}&category=${activeCategory}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
			document.title = category.toString()[0].toUpperCase() + category.toString().slice(1) + " - Monkey News";
		} else {
			url = `https://newsapi.org/v2/everything?q=${query}&page=${currentPageNo}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
			document.title = query + " - Monkey News";
		}
		let data = await fetch(url);
		let jsonData = await data.json();
		this.setState({ loading: false });
		console.log(jsonData);

		let totalResults = jsonData.totalResults;

		if (totalResults == 0) {
			this.setState({ noElementsModal: true });
		}
		this.setState({
			news: jsonData.articles,
			totalResults: totalResults,
			NewsCategory: category, // This keeps the category identical on Next/Prev clicks
		});
	};
	render() {
		const { getCategory, fetchNews, resetButton } = this;
		const { reset, NewsCategory, news, totalResults, loading, noElementsModal } = this.state;
		return (
			<>
				<Navbar reset={resetButton} fetchNews={fetchNews} category={getCategory} />
				<News noElementsModal={noElementsModal} reset={reset} category={NewsCategory} fetchNews={fetchNews} news={news} totalResults={totalResults} loading={loading} />
			</>
		);
	}
}

export default App;
