import NewsItem from "./NewsItem";

const news = [
	{
		title: "Shaquille O'Neal says he's glad Rockets beat Lakers in Game 5: \"I hate watching the Lakers play sometimes\" - Yahoo Sports",
		description: "O'Neal wasn't happy with the Lakers' performance in a close-out game at home.",
		url: "https://www.basketballnetwork.net/latest-news/shaquille-oneal-says-hes-glad-houston-rockets-beat-los-angeles-lakers-in-game-5",
		urlToImage: "https://www.basketballnetwork.net/.image/NDc6MDAwMDAwMDAwMTM0Nzk0/lebron-james-shaquille-oneal.jpg?io=1&profile=share16-9"
	},
	{
		title: "Samsung reportedly prepares Galaxy Book laptops running Android with One UI 9 skin - 9to5Google",
		description: "As Google’s “Aluminium” OS slowly makes it way to launch, a new report reveals that Samsung is preparing new Galaxy...",
		url: "http://9to5google.com/2026/04/30/samsung-galaxy-book-android-laptops-report/",
		urlToImage: "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/08/Samsung-Galaxy-Book-4-Edge-15-inch-copy.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1"
	},
	{
		title: "Olivia Rodrigo Announces Massive ‘Unraveled’ Tour Dates - Variety",
		description: "Olivia Rodrigo has announced dates for a 60-date tour in support of her forthcoming album, 'youseemprettysadforagirlsoinlove.'",
		url: "https://variety.com/2026/music/news/olivia-rodrigo-announces-unraveled-tour-dates-1236734157/",
		urlToImage: "https://variety.com/wp-content/uploads/2026/04/Static_TM-ArtistImage_2426x1365_OliviaRodrigo_2026_Photo.jpg?w=1000&h=563&crop=1"
	},
	{
		title: "Oil prices hit wartime peak, pushing U.S. gas costs to highest since level July 2022 - CBS News",
		description: "Brent crude surged past $126 a barrel early Thursday, while U.S. gasoline prices jumped to $4.30 a gallon.",
		url: "https://www.cbsnews.com/news/brent-crude-oil-price-wartime-high-gasoline-highest-since-july-2022/",
		urlToImage: "https://assets2.cbsnewsstatic.com/hub/i/r/2026/03/30/b35aa7de-d339-4f13-94cd-5276f13c7c9c/thumbnail/1200x630/bf1e1662d3cc351a038948fcd68fe234/gettyimages-1508200555.jpg"
	},
	{
		title: "European Central Bank keeps rates on hold in the face of inflation threat - CNBC",
		description: "The ECB's governing council opted to hold its benchmark deposit facility rate at 2% on Thursday.",
		url: "https://www.cnbc.com/2026/04/30/european-central-bank-april-2026-rate-decision-inflation-stagflation-risk-iran-war.html",
		urlToImage: "https://image.cnbcfm.com/api/v1/image/108051578-17296887102024-09-12t143647z_694158656_rc21z9a42rd9_rtrmadp_0_ecb-policy.jpeg?v=1729688732&w=1920&h=1080",
	},
];
import React, { Component } from 'react'

export class News extends Component {
  render() {
	return (
	  <section className="text-gray-600 body-font">
			<div className="container mx-auto relative isolate px-6 pt-24 lg:px-8">
				<h1 className="sm:text-4xl text-2xl font-medium font-inter text-center mb-8 text-white">Get the latest news update on MonkeyNews.com</h1>
				<div className="flex flex-wrap -m-4">
					<div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
						<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
					</div>
					{news.map((item)=>{
						return <NewsItem newsUrl={item.url} imgUrl={item.urlToImage} title={item.title} desc={item.description}/>
					})}
					
					
					<div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
						<div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"></div>
					</div>
				</div>
			</div>
		</section>
	)
  }
}

export default News

