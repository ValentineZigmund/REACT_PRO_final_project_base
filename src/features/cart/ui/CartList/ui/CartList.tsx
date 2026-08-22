import { CartItem } from '../../CartItem';
import s from '../../Cart.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../../shared/store/slices/cart';
import classNames from 'classnames';
import { useCallback } from 'react';

type CartListProps = {
	products: CartProduct[];
};
export const CartList = ({ products }: CartListProps) => {
	const dispatch = useDispatch();

	const handleDelete = useCallback((id: string) => {
		dispatch(cartActions.deleteCartProduct(id));
	}, []);

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem product={p} key={p.id} handleDelete={handleDelete} />
			))}
		</div>
	);
};
