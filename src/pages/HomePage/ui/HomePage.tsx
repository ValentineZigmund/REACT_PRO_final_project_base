import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { LoadMore } from '../../../features/loadMore';
import { CardList } from '../../../widgets/CardList';
import { useProducts } from '../../../shared/store/hooks/useProducts';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { isLoading, isError, error } = useProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
