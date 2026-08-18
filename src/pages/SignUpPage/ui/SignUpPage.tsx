import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { SignUpWidget } from '../../../widgets/SignUp';

export const SignUpPage = WithProtection(() => {
	return <SignUpWidget />;
});
