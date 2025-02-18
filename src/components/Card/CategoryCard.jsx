import React, { useEffect, useState } from 'react';
import ProductDummy from '../../assets/images/all_product.jpg';
import './categoryStyle.css';
import { getCategories } from '../../services/categoryService';

const CategoryCard = ({ onCategorySelect, resetCategories }) => {
	const [categories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState('All Categories');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const categoriesData = await getCategories();
				setCategories(categoriesData);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchData();
	}, []);

	const handleCategoryClick = (categoryName) => {
		setActiveCategory(categoryName);
		onCategorySelect(categoryName);
	};

	return (
		<section className="container" id="category">
			<div className="category">
				<h6>Product Category</h6>
				<div className="row g-2 my-4">
					<div
						className={`col-lg-2 col-md-3 col-6 position-relative ${
							activeCategory === 'All Categories' ? 'active-category' : ''
						}`}
						onClick={() => {
							resetCategories();
							setActiveCategory('All Categories');
						}}
					>
						<div className="text-center card-category w-100 h-100">
							<img src={ProductDummy} className="w-100 align-center" />
							<div className="category-label fw-semibold position-absolute bottom-0 w-100">
								All Categories
							</div>
						</div>
					</div>
					{Array.isArray(categories) &&
						categories.map((category) => (
							<div
								key={category._id}
								className={`col-lg-2 col-md-3 col-6 position-relative ${
									activeCategory === category.name ? 'active-category' : ''
								}`}
								onClick={() => handleCategoryClick(category.name)}
							>
								<div className="text-center card-category w-100">
									<img
										src={`http://localhost:3000/images/categories/${category.image_url}`}
										alt={category.name}
										className="w-100"
									/>
									<div className="category-label fw-semibold position-absolute bottom-0 w-100">
										{category.name}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</section>
	);
};

export default CategoryCard;
