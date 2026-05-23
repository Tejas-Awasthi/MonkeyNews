import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { newsUrl, imgUrl, title, desc, time } = this.props;
    return (
      <div className="p-4 md:w-1/3">
        <div className="h-full border-2 bg-white border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={imgUrl || "https://thumbs.dreamstime.com/b/news-9994192.jpg"} alt="blog" />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{new Date(time).toLocaleString('en-GB', { hour12: true })}</h2>
            <a href={newsUrl} target="_blank" className="title-font text-lg font-medium hover:underline cursor-pointer text-gray-900 mb-3">{title}</a>
            <p className="leading-relaxed mb-3">{desc}</p>
            <div className="flex items-center flex-wrap ">
              <a href={newsUrl} target="_blank" className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 hover:underline">Learn More
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
