import "./app.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
	constructor() {
		super();
		this.state = {
			news: [],
			totalResults: 0,
			NewsCategory: undefined,
			reset: false,
			noElementsModal: false,
			progress: 0,
		};
	}
	getCategory = (category) => {
		this.setState({ news: [], NewsCategory: category, noElementsModal: false });
		this.fetchNews(undefined, 10, 1, category);
		// return category
	};
	resetButton = () => {
		this.setState({ news: [], NewsCategory: "general", reset: true, noElementsModal: false });
		document.title = "Monkey News";
	};
	fetchNews = async (query, pageSize, currentPageNo, category) => {
		this.setState({ reset: false, noElementsModal: false });
		let url = "";
		if (!query) {
			const activeCategory = category || "general";
			url = `https://newsapi.org/v2/top-headlines?page=${currentPageNo}&category=${activeCategory}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
			document.title = activeCategory.toString()[0].toUpperCase() + activeCategory.toString().slice(1) + " - Monkey News";
		} else {
			url = `https://newsapi.org/v2/everything?q=${query}&page=${currentPageNo}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
			document.title = query + " - Monkey News";
		}
		this.setProgress(30)
		let data = await fetch(url);
		this.setProgress(60)
		let jsonData = await data.json();
		this.setProgress(80)
		console.log(jsonData);
		console.log(this.state.progress)

		let totalResults = jsonData.totalResults;

		if (totalResults == 0) {
			this.setState({ noElementsModal: true });
		}
		this.setState((prevState) => ({
			news: currentPageNo === 1 ? jsonData.articles : [...prevState.news, ...jsonData.articles],
			totalResults: totalResults,
			NewsCategory: category, // This keeps the category identical on Next/Prev clicks
			reset: false,
		}));
		this.setProgress(100)
		return jsonData.articles;
	};
	setProgress = (progress)=>{
		this.setState({progress: progress})
	}
	render() {
		const { getCategory, fetchNews, resetButton } = this;
		const { reset, NewsCategory, news, totalResults, noElementsModal } = this.state;
		return (
			<>
				<LoadingBar color="#bd94ff" progress={this.state.progress} height={3} onLoaderFinished={() => this.setProgress(0)} />
				<Navbar reset={resetButton} fetchNews={fetchNews} category={getCategory} />
				<News noElementsModal={noElementsModal} reset={reset} category={NewsCategory} fetchNews={fetchNews} news={news} totalResults={totalResults} />
			</>
		);
	}
}

export default App;
