import React from 'react';
import './Button.css';

interface ButtonProps {
	name?: React.ReactNode;
	color?: string;
	size?: string;
	type?: string;
	icon?: string;
	iconSize?: number;
	style?: {};
	id?: number;
	onClick?: () => void;
	onChange?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	color = 'primary',
	name = 'Button',
	size = 'medium',
	type = 'normal',
	icon = '',
	iconSize = 30,
	style = {},
	id=0,
	onClick,
	onChange
}) => {
	return (
		<button
			className={`button ${color} ${size} ${type}`}
			style={style}
			type="button"
			onClick={onClick}
			onChange={onChange}
		>
			{icon !== '' ? (
				<i className={`icon ${icon}`} style={{ width: iconSize }} />
			) : (
				name
			)}
		</button>
	);
};

export default Button;
