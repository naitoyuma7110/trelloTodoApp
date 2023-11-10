import styles from "./button.module.css";

type ButtonProp = {
	children: string;
};

const Button = (props: ButtonProp): JSX.Element => {
	return (
		<button type="button" className={styles.red}>
			{props.children}
		</button>
	);
};

export default Button;
