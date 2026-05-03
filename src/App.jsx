import "./app.css";
import Navbar from "./components/Navbar";
import News from "./components/News";

import React, { Component } from 'react'

export class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<News />
			</>
		)
	}
}

export default App

