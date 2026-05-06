import NewsItem from "./NewsItem";
import React, { Component } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Spinner from "./../assets/spinner_loader.gif"

export class News extends Component {
	constructor() {
		super();
		this.state = {
			news: [],
			totalResults: 0,
			currentPageNo: 1,
			pageSize: 10,
			totalNews: 0,
			totalLoaded: 0,
			query: "",
			loading: false
		};
	}
	fetchNews = async (query, pageSize, currentPageNo) => {
		this.setState({ loading: true });
		let url = `https://newsapi.org/v2/everything?q=${query}&page=${currentPageNo}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
		let data = await fetch(url);
		let jsonData = await data.json();
		this.setState({loading:false})
		console.log(jsonData);
		let totalResults = jsonData.totalResults;
		let totalNews = jsonData.articles.length;
		if (totalNews <= 0) {
			throw new Error("News API Returned no elements!");
		}
		this.setState({ news: jsonData.articles, totalResults: totalResults, totalNews: totalNews });
		return totalNews;
	};
	search = async (query) => {
		const { pageSize, currentPageNo } = this.state;
		this.setState({ query: query });
		const totalLoaded = await this.fetchNews(query, pageSize, currentPageNo);
		this.setState({ totalLoaded: totalLoaded });
	};

	next = async () => {
		const { pageSize, currentPageNo, totalResults, totalLoaded, query } = this.state;
		try {
			const totalNews = await this.fetchNews(query, pageSize, currentPageNo + 1);
			this.setState({ currentPageNo: currentPageNo + 1 });
			console.log(currentPageNo);
			console.log("Total News (Next btn): " + totalNews);
			this.setState((prev) => ({ totalLoaded: prev.totalLoaded + totalNews }));
		} catch ({ message }) {
			console.log(message);
		}
	};
	prev = async () =>{
		const { pageSize, currentPageNo, totalResults, totalLoaded, query, loading } = this.state;
		try {
			const totalNews = await this.fetchNews(query, pageSize, currentPageNo - 1);
			this.setState({ currentPageNo: currentPageNo - 1 });
			console.log(currentPageNo);
			console.log("Total News (Next btn): " + totalNews);
			this.setState((prev) => ({ totalLoaded: prev.totalLoaded - totalNews }));
		} catch ({ message }) {
			console.log(message);
		}
	}
	render() {
		const { news, totalResults, currentPageNo, pageSize, totalNews, totalLoaded, loading } = this.state;
		const {next, fetchNews, search, prev} = this;
		return (
			<section className="text-gray-600 body-font">
				<div className="container mx-auto relative isolate px-6 py-24 lg:px-8">
					<h1 className="sm:text-4xl text-2xl font-medium font-inter text-center mb-8 text-white">Get the latest news update on MonkeyNews.com</h1>
					<SearchBar search={search} />
				{loading && <img src={Spinner} height={50} width={50} alt="" className="flex justify-self-center" />}
					{!loading && <div className="flex flex-wrap -m-4">
						<div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
							<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
						</div>
						{news.map((item) => {
							return <NewsItem key={item.url} newsUrl={item.url} imgUrl={item.urlToImage ? item.urlToImage : null} title={item.title ? item.title : ""} desc={item.description ? item.description : ""} />;
						})}

						<div aria-hidden="true" className="absolute h-[stretch] inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
							<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"></div>
						</div>
					</div>}
				</div>
				<Pagination nextFunc={next} prevFunc={prev} totalNews={totalNews} totalResults={totalResults} pageSize={pageSize} currentPage={currentPageNo} totalLoaded={totalLoaded} />
			</section>
		);
	}
}

export default News;
