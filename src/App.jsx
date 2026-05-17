import "./app.css";
import Navbar from "./components/Navbar";
import News from "./components/News";

import React, { Component } from 'react'

export class App extends Component {
	constructor(){
		super()
		this.state = ({
			news: [],
			totalResults: 0,
			totalNews: 0,
			NewsCategory: undefined,
			loading:false
		})
	}
	getCategory = (category)=>{
		this.setState({NewsCategory:category})
		// return category
	}
	fetchNews = async (query, pageSize, currentPageNo, category) => {
		this.setState({ loading: true });
    let url = "";
		if (!query){
			const activeCategory = category || "general";
			url = `https://newsapi.org/v2/top-headlines?page=${currentPageNo}&category=${activeCategory}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
		}
		else{
			url = `https://newsapi.org/v2/everything?q=${query}&page=${currentPageNo}&pageSize=${pageSize}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
		}
		let data = await fetch(url);
    let jsonData = await data.json();
    this.setState({ loading: false })
    console.log(jsonData);
    
    let totalResults = jsonData.totalResults;
    let totalNews = jsonData.articles.length;
    if (totalNews <= 0) {
        throw new Error("News API Returned no elements!");
    }
    
    // FIX: Save the active category into state alongside the news articles
    this.setState({ 
        news: jsonData.articles, 
        totalResults: totalResults, 
        totalNews: totalNews,
        NewsCategory: category // This keeps the category identical on Next/Prev clicks
    });
    
    return totalNews;
};
	render() {
		const {getCategory} = this
		return (
			<>
				<Navbar fetchNews={this.fetchNews} category={getCategory}/>
				<News category={this.state.NewsCategory} fetchNews={this.fetchNews} news={this.state.news} totalResults={this.state.totalResults} totalNews={this.state.totalNews} loading={this.state.loading}/>
			</>
		)
	}
}

export default App

