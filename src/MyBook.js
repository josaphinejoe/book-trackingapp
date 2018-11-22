import React from 'react';
import PropTypes from 'prop-types';
import MyBookShelfChange from './MyBookShelfChange';

function MyBook(props) {
	const { book, onChangeShelf } = props;

	const thumbnail =
		book.imageLinks === undefined
			? 'https://dummyimage.com/128x193/333/ffffff&text=missing+image'
			: book.imageLinks.thumbnail;

	const authors = book.authors === undefined ? 'Unknown Author' : book.authors.join(', ');

	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}
					/>
					<MyBookShelfChange book={book} onChangeShelf={onChangeShelf} />
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{authors}</div>
			</div>
		</li>
	);
}

MyBook.propTypes = {
	book: PropTypes.object.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};

export default MyBook;
