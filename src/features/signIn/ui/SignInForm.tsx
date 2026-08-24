import { FC, useEffect, useRef, useState } from 'react';
import {
	Avatar,
	Box,
	Container,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { SignInFormValues } from '../utils/types';
import { signInFormSchema } from '../utils/validator';
import { useSignInMutation } from '../../../shared/store/api/authApi';
import { userActions } from '../../../shared/store/slices/user';
import { getMessageFromError } from '../../../shared/utils';
import { Modal } from '../../../shared/ui/Modal';

export const SignInForm: FC = () => {
	const loginInputRef = useRef<HTMLInputElement>(null);
	const clickRef = useRef<number>(0);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const dispatch = useDispatch();
	const location = useLocation();
	// navigate поможет сделать редирект в нужный момент
	const navigate = useNavigate();
	// Из хука useSignUpMutation (был получен путем автогенерации)
	// достаем функцию, которая будет (регистрировать пользователя) делать POST-запрос к нашем серверу)
	const [signInRequestFn] = useSignInMutation();
	useEffect(() => {
		loginInputRef.current?.focus();
	}, []);
	// инициализируем react-hook-form
	const {
		// control понадобиться, чтобы подружить react-hook-form и компоненты из MUI
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
		// с помощью generic подсказываем react-hook-form, какие поля содержит наша форма
	} = useForm<SignInFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		// react-hook-form умеет работать со многими библиотеками
		// валидации, мы используем yup
		resolver: yupResolver(signInFormSchema),
	});

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		try {
			// метод "unwrap" помогает убрать вспомогательные обертки
			// RTK, которые обрабатывают ошибки. Теперь ошибки обрабатываем мы
			// с помощью конструкции try...catch. В этом случае нам так удобней
			const response = await signInRequestFn(values).unwrap();

			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);

			// Выводим уведомление, что пользователь успешно зарегался
			// Есть куча библиотек для отображения "Тостеров". Мы используем
			// react-toastify — https://github.com/fkhadra/react-toastify#readme
			toast.success('Вы успешно авторизованы!');

			if (location.state?.from) {
				return navigate(location.state.from);
			}

			navigate('/');
		} catch (error) {
			// Если произошла ошибка, то выводим уведомление
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при авторизации пользователя'
				)
			);
		}
	};

	return (
		<>
			<button
				style={{ position: 'absolute', top: 130, right: 100 }}
				onClick={() => setIsModalOpen((prev) => !prev)}>
				handle modal
			</button>
			<Modal
				isOpen={isModalOpen}
				title={'Title'}
				body={
					<div>
						Добро пожаловать!
						<button
							onClick={() => {
								clickRef.current += 1;
								console.log('ref is', clickRef.current);
							}}>
							Click!
						</button>
					</div>
				}
				closeHandler={() => setIsModalOpen((prev) => !prev)}
			/>
			<Container component='main' maxWidth='xs'>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign In
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit(submitHandler)}
						noValidate
						sx={{ my: 1 }}>
						{/* Чтобы подружить react-hook-form с MUI используем компонент Controller
              смотри доку https://react-hook-form.com/get-started#IntegratingwithUIlibraries
           */}
						<Controller
							name='email'
							control={control}
							render={({ field }) => (
								<TextField
									inputRef={loginInputRef}
									margin='normal'
									label='Email Address'
									type='email'
									fullWidth
									required
									autoComplete='email'
									error={!!errors.email?.message}
									helperText={errors.email?.message}
									{...field}
								/>
							)}
						/>
						<Controller
							name='password'
							control={control}
							render={({ field }) => (
								<TextField
									label='Password'
									type='password'
									error={!!errors.password?.message}
									helperText={errors.password?.message}
									margin='normal'
									fullWidth
									required
									{...field}
								/>
							)}
						/>

						<LoadingButton
							type='submit'
							// кнопка становится недоступной после первой валидации (если есть ошибки)
							// или когда выполняется отправка (чтобы не дать пользователю отправить форму несколько раз)
							disabled={isSubmitted && (!isValid || isSubmitting)}
							loading={isSubmitting}
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign IN
						</LoadingButton>
						<Box display='flex' justifyContent='center' flexGrow={1}>
							<Link component={RouterLink} to='/signup'>
								SIGN UP
							</Link>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
};
