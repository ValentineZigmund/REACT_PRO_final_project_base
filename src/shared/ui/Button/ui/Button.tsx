import classNames from 'classnames';
import s from './Button.module.css';

import { IButtonProps } from './Button.types';

export const Button = ({
	onClick,
	disabled,
	type,
	htmlType,
	wide,
	maxContext,
	positionStatic,
	size,
	width,
	children,
}: IButtonProps) => {
	const buttonSizeClass = (() => {
		switch (size) {
			case 'Large':
				return s['btn_size_large'];
			default:
				return s['btn_size_normal'];
		}
	})();

	const buttonTypeClass = (() => {
		switch (type) {
			case 'Secondary':
				return s['btn_type_secondary'];
			case 'Light':
				return s['btn_type_ligth'];
			default:
				return s['btn_type_primary'];
		}
	})();

	return (
		<button
			type={htmlType}
			onClick={onClick}
			disabled={disabled}
			style={{ width: width || 'unset' }}
			className={classNames(
				s['btn'],
				buttonTypeClass,
				wide ? s['btn_type_wide'] : '',
				maxContext ? s['btn_type_maxContent'] : '',
				positionStatic ? s['btn_type_static'] : '',
				buttonSizeClass
			)}>
			{children}
		</button>
	);
};
