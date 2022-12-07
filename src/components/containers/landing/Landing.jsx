import React from 'react';

import MostVisit from './components/MostVisit';
import Contact from './components/Contact';
import Categories from './components/Categories';
import Hero from './components/Hero';

const Landing = () => {
	return (
		<div className="pb-5">
			<Hero />
			<Categories />
			<Contact />
			<MostVisit />
		</div>
	);
};

export default Landing;
