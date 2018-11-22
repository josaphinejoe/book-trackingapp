import React from 'react';
import PropTypes from 'prop-types';
import MyBook from './MyBook';

function MyBookShelf(props) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.shelfName}</h2>
			<div className="bookshelf-books">
				{!props.appLoaded ? (
					<div className="loader" />
				) : props.fBooks.length <= 0 ? (
					<h3 className="bookshelf-status">Empty Shelf</h3>
				) : (
					<ol className="books-grid">
						{props.fBooks.map(book => (
							<MyBook key={book.id} book={book} onChangeShelf={props.onChangeShelf} />
						))}
					</ol>
				)}
			</div>
		</div>
	);
}

MyBookShelf.propTypes = {
	shelfName: PropTypes.string.isRequired,
	appLoaded: PropTypes.bool.isRequired,
	fBooks: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};

export default MyBookShelf;
