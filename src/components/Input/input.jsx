import './inputStyle.css';

const Input = (props) => {
	const { setSearchItem, type, placeholder, variants = 'searchInput' } = props;

	const handleChange = (e) => {
		setSearchItem(e.target.value);
	};

	return (
		<input
			type={type}
			className={variants}
			placeholder={placeholder}
			onChange={handleChange}
		/>
	);
};

export default Input;
