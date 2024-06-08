import React, { useState } from 'react';
import './searchStyle.css';
import Input from '../Input/input';
import Button from '../Button/button';

const Search = ({ onSearch }) => {
	const [searchItem, setSearchItem] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchItem);
		console.log(searchItem, '16');
	};

	return (
		<div className="col-8">
			<h2 className="text-center tagline mb-4 mt-2">All Product</h2>
			<div className="input-group">
				<form
					className="d-flex justify-content-center w-100 gap-2"
					onSubmit={handleSubmit}
				>
					<Input
						type="text"
						placeholder="Search something..."
						value={searchItem}
						setSearchItem={setSearchItem}
					/>
					<Button type="submit">Search</Button>
				</form>
			</div>
		</div>
	);
};

export default Search;
