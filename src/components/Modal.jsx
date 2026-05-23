import React, { Component, useState, useEffect } from "react";

export class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: true,
			opacity: 100,
		};
	}
	
	timeoutOfModal = () => {
		setTimeout(() => {
			this.hideModal();
		}, 2500);
	};
	hideModal = () => {
		this.setState({ opacity: 0 });
		setTimeout(() => {
			this.setState({ showModal: false });
		}, 250);
	};
	componentDidMount(){
		this.timeoutOfModal();
	}
	render() {
		return (
			<>
				{this.state.showModal && (
					<div
						role="alert"
						className={`container fixed h-15 z-100 font-inter ${this.state.opacity === 100 ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out duration-250 top-0 left-0 right-0 flex items-center gap-2 sm:gap-3 max-w-11/12 sm:max-w-xl mx-auto my-8 
  bg-red-900 border border-slate-500 rounded-full 
  py-2 px-4 text-white`}
					>
						{/* Icon */}
						<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
							<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z" />
						</svg>
						{/* Message */}
						<div className="flex-1 text-sm sm:text-base leading-snug">{this.props.message}</div>

						{/* Close Button */}
						<button
							className="shrink-0 ml-auto cursor-pointer hover:bg-red-800 rounded-full p-2"
							onClick={() => {
								this.hideModal();
							}}
						>
							<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-2" stroke="currentColor">
								<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" strokeLinecap="round" />
							</svg>
						</button>
					</div>
				)}
			</>
		);
	}
}

export default Modal;
