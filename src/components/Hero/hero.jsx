import React from 'react';
import './heroStyle.css';

const Hero = () => {
	return (
		<section className="hero" id="home">
			<main className="container content">
				<h1>
					Enjoy ur <span>Style</span>
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non voluptatum
					accusantium, deleniti odio!
				</p>
				<a href="/#product" className="cta">
					Buy Now
				</a>
			</main>
		</section>
	);
};

export default Hero;
