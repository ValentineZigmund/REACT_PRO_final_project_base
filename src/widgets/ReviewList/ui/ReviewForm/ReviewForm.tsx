import { useState, useActionState } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '../../../../shared/ui/Rating';
import { Button } from '../../../../shared/ui/Button';

const mockApi = async (text: string, rating: number) => {
	await new Promise((resolve) => setTimeout(resolve, 0));
	alert(`new review: ${text} rating: ${rating}`);
	return true;
};

const initial = {
	status: 'idle',
};

export const ReviewForm = () => {
	const [rating, setRating] = useState(0);

	const [, formAction, isPending] = useActionState(
		async (_prev: unknown, data: FormData) => {
			const text = String(data.get('text') ?? '');

			await mockApi(text, rating);

			return initial;
		},
		initial
	);

	return (
		<form action={formAction} className={s['form']}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
			/>
			<div className={classNames(s['form__btn-wrapper'])}>
				<Button disabled={isPending} htmlType='submit' size='Large' width={356}>
					Отправить отзыв
				</Button>
			</div>
		</form>
	);
};
