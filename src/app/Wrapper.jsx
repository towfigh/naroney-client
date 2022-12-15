import Footer from '../components/layouts/footer/Footer';
import Navigation from '../components/layouts/navigation/Navigation';

const Wrapper = ({ children }) => {
	return (
		<>
			<Navigation />
			<main>
				<div>{children}</div>
			</main>
			<Footer />
		</>
	);
};

export default Wrapper;
