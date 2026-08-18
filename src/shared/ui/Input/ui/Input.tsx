import classNames from 'classnames';
import s from './Input.module.css';
import { IInputProps } from './Input.types';

export const Input = ({ borderType, className, ...rest }: IInputProps) => {
	const borderClass = (() => {
		switch (borderType) {
			case 'Round':
				return s['input-core_round'];
			default:
				return s['input-core_square'];
		}
	})();

	return (
		<input
			className={classNames(className, s['input-core'], borderClass)}
			{...rest}
		/>
	);
};
