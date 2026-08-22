import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type FC,
	type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import s from './Modal.module.css';

export const ID = 'modal-root';

export const getModalContainer = () => document.getElementById(ID);

interface Props {
	isOpen: boolean;
	title: string;
	body: ReactNode;
	closeHandler: () => void;
}

export const Modal: FC<Props> = ({ isOpen, ...restProps }) => {
	const [innerIsOpen, setInnerIsOpen] = useState(false);
	const [additionalClasses, setAdditionalClasses] = useState('');

	const modalContainer = getModalContainer();

	useEffect(() => {
		if (isOpen) {
			setAdditionalClasses(s['myModal__overlay--open']);
		} else {
			setTimeout(() => {
				setAdditionalClasses('');
			}, 350);
		}

		setTimeout(
			() => {
				setInnerIsOpen(isOpen);
			},
			isOpen ? 250 : 500
		);
	}, [isOpen]);

	if (!modalContainer || (!isOpen && !innerIsOpen)) return null;

	return createPortal(
		<div className={classNames(s['myModal__overlay'], additionalClasses)}>
			{innerIsOpen && <ModalInner {...restProps} isOpen={isOpen} />}
		</div>,
		modalContainer
	);
};

const ModalInner: FC<Props> = ({ title, body, closeHandler, isOpen }) => {
	const ref = useRef<HTMLDivElement>(null);

	const [additionalClasses, setAdditionalClasses] = useState('');

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				closeHandler();
			}
		},
		[isOpen, closeHandler]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, handleKeyDown]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				closeHandler();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [closeHandler]);

	useEffect(() => {
		setAdditionalClasses(isOpen ? s['myModal__container--open'] : '');
	}, [isOpen]);

	return (
		<div
			ref={ref}
			className={classNames(s['myModal__container'], additionalClasses)}>
			<div className={classNames(s['myModal__header'])}>
				<span className={classNames(s['myModal__title'])}>{title}</span>
				<button
					onClick={closeHandler}
					className={classNames(s['myModal__closeIcon'])}>
					x
				</button>
			</div>
			<div>{body}</div>
		</div>
	);
};
