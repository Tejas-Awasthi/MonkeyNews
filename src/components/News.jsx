import NewsItem from "./NewsItem";
import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import InfiniteScroll from "react-infinite-scroll-component";

const usePrevious = (value) => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
};

const News = (props) => {
	const fetchNews = props.fetchNews;

	const [hasMore, setHasMore] = useState(true);
	const [currentPageNo, setCurrentPageNo] = useState(1);
	const [query, setQuery] = useState("");
	const [pageSize] = useState(10);
	const [currentCategory, setCurrentCategory] = useState(undefined);

	const isFirstRun = useRef(true);

	const prevReset = usePrevious(props.reset);
	const prevCategory = usePrevious(props.category);

	const search = async (query) => {
		setQuery(query);
		setCurrentPageNo(1);
		setHasMore(true);
		await fetchNews(query, pageSize, 1, undefined);
	};

	const next = async () => {
		if (!props.news || props.news.length === 0) return;

		try {
			const nextPage = currentPageNo + 1;
			let articles;
			if (query) {
				articles = await fetchNews(query, pageSize, nextPage, undefined);
			} else {
				articles = await fetchNews(undefined, pageSize, nextPage, currentCategory);
			}

			if (!articles || articles.length === 0) {
				setHasMore(false);
				return;
			}

			setCurrentPageNo(nextPage);
			setHasMore(props.news.length < props.totalResults);
		} catch ({ message }) {
			console.log(message);
			setHasMore(false);
		}
	};

	useEffect(() => {
		setHasMore(true);
		fetchNews(undefined, pageSize, 1, "general");
	}, []);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		if (props.reset && !prevReset) {
			setHasMore(true);
			setCurrentPageNo(1);
			setQuery("");
			setCurrentCategory("general");
			fetchNews(undefined, pageSize, 1, "general");
			return;
		}

		if (props.category && props.category !== prevCategory) {
			setHasMore(true);
			setCurrentPageNo(1);
			setQuery("");
			setCurrentCategory(props.category);
			fetchNews(undefined, pageSize, 1, props.category);
		}
	}, [props.reset, props.category]);

	const { noElementsModal } = props;

	return (
		<section className="text-gray-600 body-font">
			{noElementsModal && <Modal showModal={true} message="No News Found!" />}
			<div className="container mx-auto relative isolate px-6 py-24 lg:px-8">
				<h1 className="sm:text-4xl text-2xl font-medium font-inter text-center mb-8 text-white">Get the latest news update on MonkeyNews.com</h1>
				<SearchBar search={search} />

				<div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
					<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
				</div>

				<InfiniteScroll dataLength={props.news.length} next={next} hasMore={hasMore}>
					<div className="flex flex-wrap -m-4">
						{props.news.map((item) => (
							<NewsItem key={item.url} time={item.publishedAt} newsUrl={item.url} imgUrl={item.urlToImage ?? null} title={item.title ?? ""} desc={item.description ?? ""} />
						))}
					</div>
				</InfiniteScroll>

				{!hasMore && (
					<div className="flex items-center text-center my-4">
						<div className="grow border-t border-gray-300"></div>
						<span className="shrink mx-4 text-gray-200 text-base">You've reached the end</span>
						<div className="grow border-t border-gray-300"></div>
					</div>
				)}

				<div aria-hidden="true" className="absolute h-[stretch] inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
					<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75" />
				</div>
			</div>
		</section>
	);
};

export default News;
