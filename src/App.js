import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import MyBookShelf from './MyBookShelf';
import MyBookSearch from './MyBookSearch';

class BooksApp extends Component {
	state = {
		books: [],
		isLoaded: false
	};

	componentDidMount() {
		BooksAPI.getAll().then(res => {
			this.setState({
				books: res,
				isLoaded: true
			});
		});
	}

	changeShelf = (text, event) => {
		return new Promise(resolve => {
			BooksAPI.update(text, event.target.value).then(res => {
				BooksAPI.getAll().then(res => {
					this.setState(
						{
							books: res
						},
						resolve(res)
					);
				});
			});
		});
	};

	render() {
		const { isLoaded, books } = this.state;
		return (
			<div className="app">
				<Route
					path="/search"
					render={() => <MyBookSearch shelvedBooks={books} onChangeShelf={this.changeShelf} />}
				/>
				<Route
					exact
					path="/"
					render={() => (
						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							<div className="list-books-content">
								<div>
									<MyBookShelf
										key="Currently Reading"
										shelfName="Currently Reading"
										appLoaded={isLoaded}
										fBooks={books.filter(text => text.shelf === 'currentlyReading')}
										onChangeShelf={this.changeShelf}
									/>
									<MyBookShelf
										key="Want to Read"
										shelfName="Want to Read"
										appLoaded={isLoaded}
										fBooks={books.filter(text => text.shelf === 'wantToRead')}
										onChangeShelf={this.changeShelf}
									/>
									<MyBookShelf
										key="Read"
										shelfName="Read"
										appLoaded={isLoaded}
										fBooks={books.filter(text => text.shelf === 'read')}
										onChangeShelf={this.changeShelf}
									/>
								</div>
							</div>
							<div className="open-search">
								<Link to="/search">Add Book</Link>
							</div>
						</div>
					)}
				/>
			</div>
		);
	}
}

export default BooksApp;
