import NewsItem from "./NewsItem";
import React, { Component } from 'react'
import Pagination from "./Pagination";


export class News extends Component {
	constructor() {
		super();
		this.state = {
			news: []
		}
	}
	async componentDidMount() {
		let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=11&page=1&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
		let data = await fetch(url)
		let jsonData = await data.json()
		console.log(jsonData.articles)
		this.setState({ news: jsonData.articles })
	}
	render() {
		const { news } = this.state
		return (
			<section className="text-gray-600 body-font">
				<div className="container mx-auto relative isolate px-6 py-24 lg:px-8">
					<h1 className="sm:text-4xl text-2xl font-medium font-inter text-center mb-8 text-white">Get the latest news update on MonkeyNews.com</h1>
					<div className="flex flex-wrap -m-4">
						<div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
							<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
						</div>
						{news.map((item) => {
							return <NewsItem key={item.url} newsUrl={item.url} imgUrl={item.urlToImage ? item.urlToImage : null} title={item.title ? item.title : ""} desc={item.description ? item.description : ""} />
						})}


						<div aria-hidden="true" className="absolute h-[stretch] inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
							<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"></div>
						</div>
					</div>
				</div>
				<Pagination />
			</section>
		)
	}
}

export default News

