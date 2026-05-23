import NewsItem from "./NewsItem";
import React, { Component } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Spinner from "./../assets/spinner_loader.gif";
import Modal from "./Modal";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageSize: 10,
			query: "",
			currentPageNo: 1,
			fetchNews: this.props.fetchNews,
			hasMore: true,
			currentCategory: "general", // 👈 Track this locally
		};
	}
	search = async (query) => {
		const { pageSize, fetchNews } = this.state;

		this.setState({
			query: query,
			currentPageNo: 1,
			hasMore: true,
		});

		await fetchNews(query, pageSize, 1, undefined);
	};

	next = async () => {
		const { pageSize, currentPageNo, query, fetchNews, currentCategory } = this.state;

		// Guard clause: If there are no articles loaded yet, don't try to fetch page 2
		if (!this.props.news || this.props.news.length === 0) {
			return;
		}

		try {
			let articles;
			const nextPage = currentPageNo + 1;

			if (currentCategory) {
				articles = await fetchNews(undefined, pageSize, nextPage, currentCategory);
			} else {
				articles = await fetchNews(query, pageSize, nextPage, undefined);
			}

			// 1. CRITICAL SAFEGUARD: If the API didn't return any new articles,
			// it means we've hit the real structural end, regardless of what totalResults said.
			if (!articles || articles.length === 0) {
				this.setState({
					hasMore: false,
				});
				return;
			}

			// 2. Count what is currently sitting in the app state *after* the fetch finished appending
			const actualCountLoaded = this.props.news.length;

			this.setState({
				currentPageNo: nextPage,
				// 3. Keep scrolling only if our rendered count is less than total results
				hasMore: actualCountLoaded < this.props.totalResults,
			});
		} catch ({ message }) {
			console.log(message);
			// Turn off loader if a network error occurs so it doesn't spin infinitely
			this.setState({ hasMore: false });
		}
	};

	prev = async () => {
		const { pageSize, currentPageNo, query, fetchNews } = this.state;
		// Fallback directly to whatever category is currently in props, or default to general
		const currentCategory = this.props.category;

		try {
			if (currentCategory) {
				await fetchNews(undefined, pageSize, currentPageNo - 1, currentCategory);
			} else {
				await fetchNews(query, pageSize, currentPageNo - 1, undefined);
			}

			this.setState({
				currentPageNo: currentPageNo - 1,
			});
		} catch ({ message }) {
			console.log(message);
		}
	};
	async componentDidMount() {
		this.setState({ hasMore: true });
		await this.state.fetchNews(undefined, this.state.pageSize, 1, "general");
	}
	async componentDidUpdate(prevProps) {
		// 1. Handle Reset Click
		if (this.props.reset && !prevProps.reset) {
			this.setState(
				{
					hasMore: true,
					currentPageNo: 1,
					query: "",
					currentCategory: "general", // Reset local tracking
				},
				async () => {
					await this.state.fetchNews(undefined, this.state.pageSize, 1, "general");
				},
			);
			return;
		}

		// 2. Handle Category Click Safely
		// Compare the parent prop directly with our local state tracking!
		if (this.props.category && this.props.category !== this.state.currentCategory) {
			this.setState({
				currentPageNo: 1,
				query: "",
				hasMore: true,
				currentCategory: this.props.category, // 👈 This breaks the loop on the next render!
			});
		}
	}
	render() {
		const { news, fetchNews, pageSize, currentPageNo } = this.state;
		const { totalResults, reset, noElementsModal } = this.props;
		const { next, search, prev } = this;
		return (
			<section className="text-gray-600 body-font">
				{noElementsModal && <Modal showModal={true} message="No News Found!" />}
				<div className="container mx-auto relative isolate px-6 py-24 lg:px-8">
					<h1 className="sm:text-4xl text-2xl font-medium font-inter text-center mb-8 text-white">Get the latest news update on MonkeyNews.com</h1>
					<SearchBar search={search} />

					{/* Background blur top */}
					<div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
						<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
					</div>

					<InfiniteScroll dataLength={this.props.news.length} next={this.next} hasMore={this.state.hasMore}>
						<div className="flex flex-wrap -m-4">
							{" "}
							{/* opens AND closes inside InfiniteScroll */}
							{this.props.news.map((item) => (
								<NewsItem key={item.url} time={item.publishedAt} newsUrl={item.url} imgUrl={item.urlToImage ?? null} title={item.title ?? ""} desc={item.description ?? ""} />
							))}
						</div>
					</InfiniteScroll>

					{/* Background blur bottom */}
					<div aria-hidden="true" className="absolute h-[stretch] inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
						<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75" />
					</div>
				</div>
				{/* <Pagination nextFunc={next} prevFunc={prev} totalResults={totalResults} pageSize={pageSize} currentPage={currentPageNo} reset={reset} /> */}
			</section>
		);
	}
}

export default News;
