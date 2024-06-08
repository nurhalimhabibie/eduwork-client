import React, { useEffect, useState } from 'react';
import ProductDummy from '../../assets/images/dummyprod.jpg';
import './categoryStyle.css';
import { getCategories } from '../../services/categoryService';

const CategoryCard = ({ onCategorySelect, resetCategories }) => {
	const [categories, setCategories] = useState([]);

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

	return (
		<section className="container" id="category">
			<div className="category">
				<h6>Product Category</h6>
				<div className="row g-2 my-4">
					<div
						className="col-lg-2 col-md-3 col-6 position-relative"
						onClick={() => resetCategories()}
					>
						<div className="text-center card-category w-100">
							<img src={ProductDummy} className="w-100" />
							<div className="category-label fw-semibold position-absolute bottom-0 w-100">
								All Categories
							</div>
						</div>
					</div>
					{Array.isArray(categories) &&
						categories.map((category) => (
							<div
								key={category._id}
								className="col-lg-2 col-md-3 col-6 position-relative"
								onClick={() => onCategorySelect(category.name)}
							>
								<div className="text-center card-category w-100">
									<img src={ProductDummy} className="w-100" />
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
