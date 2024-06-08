import './buttonStyle.css';

const Button = (props) => {
	const { click, children, type, variants = 'primaryBtn' } = props;
	return (
		<button className={variants} type={type} onClick={click}>
			{children}
		</button>
	);
};

export default Button;
