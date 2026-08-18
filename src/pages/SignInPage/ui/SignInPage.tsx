import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { SignInWidget } from '../../../widgets/SignIn';

export const SignInPage = WithProtection(() => {
	return <SignInWidget />;
});
