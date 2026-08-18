import s from './ProductCartCounter.module.css';
import classNames from 'classnames';
import { useCount } from '../hooks/useProductCartCount';
import { useAddToCart } from '../../../shared/hooks/useAddToCart';
import { Button } from '../../../shared/ui/Button';

type ProductCartCounterProps = {
	product: Product;
};
export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } = useCount();
	const { addProductToCart } = useAddToCart();

	return (
		<div className={classNames('product__btn-wrap')}>
			<div className={s['button-count']}>
				<button className={s['button-count__minus']} onClick={handleCountMinus}>
					-
				</button>
				<input
					type='number'
					className={s['button-count__num']}
					value={count}
					onChange={handleCount}
				/>
				<button className={s['button-count__plus']} onClick={handleCountPlus}>
					+
				</button>
			</div>
			<div className={s['form__btn-wrapper']}>
				<Button
					width={356}
					onClick={() => addProductToCart({ ...product, count })}
					size='Large'>
					В корзину
				</Button>
			</div>
		</div>
	);
};
