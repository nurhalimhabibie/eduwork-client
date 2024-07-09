import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import CategoryCard from '../../components/Card/CategoryCard';
import Product from '../../components/Product/product';
import Hero from '../../components/Hero/hero';

const Home = () => {
	const [selectedCategory, setSelectedCategory] = useState(''); // State untuk kategori yang dipilih

	const handleCategorySelect = (categoryName) => {
		setSelectedCategory(categoryName);
	};

	const resetCategory = () => {
		setSelectedCategory('');
	};

	return (
		<>
			{/* <Navbar /> */}
			<Hero />
			<CategoryCard
				onCategorySelect={handleCategorySelect}
				resetCategories={resetCategory}
			/>
			<Product selectedCategory={selectedCategory} />
		</>
	);
};

export default Home;
