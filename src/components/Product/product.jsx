import React, { useEffect, useState } from 'react';
import './productStyle.css';
import Search from '../Search/search';
import Button from '../Button/button';
import { getProducts } from '../../services/productService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

function Product({ selectedCategory }) {
	const [products, setProducts] = useState([]);
	const [searchItem, setSearchItem] = useState('');
	const [filteredProducts, setFilteredProducts] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const productsData = await getProducts();
				setProducts(productsData);
				setFilteredProducts(productsData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const lowercasedFilter = searchItem.toLowerCase();
		const filteredData = products.filter(
			(product) =>
				(product.name.toLowerCase().includes(lowercasedFilter) ||
					product.category.name.toLowerCase().includes(lowercasedFilter)) &&
				(selectedCategory === '' || product.category.name === selectedCategory),
		);
		setFilteredProducts(filteredData);
	}, [searchItem, products, selectedCategory]);

	const handleAddToCart = (product) => {
		dispatch(addToCart({ product, qty: 1 }));
	};

	return (
		<section className="container" id="product">
			{/* Search */}
			<div className="row justify-content-center mb-2 product">
				<Search onSearch={setSearchItem} />
			</div>
			{/* Product Card */}
			<div className="row">
				{Array.isArray(filteredProducts) &&
					filteredProducts.map((product) => (
						<div className="col-lg-3 col-md-3 col-6 my-4" key={product._id}>
							<div className="product-card">
								<div className="image-wraper">
									<img
										src={`http://localhost:5000/images/products/${product.image_url}`}
										alt={product.name}
										className="w-100"
									/>
								</div>
								<div>
									<span className="title-category mt-1">
										{product.category.name}
									</span>
									<span className="title-brand">{product.name}</span>
									<span className="title-description mt-2 mb-3">
										{product.description}
									</span>
								</div>
								<div className="price-wraper d-flex justify-content-between align-items-center">
									<span className="title-price">Rp.{product.price}</span>
									<Button
										variants="sm-btnprimary"
										click={() => handleAddToCart(product)}
									>
										Buy <i className="bi bi-cart-plus"></i>
									</Button>
								</div>
							</div>
						</div>
					))}
			</div>
		</section>
	);
}

export default Product;
