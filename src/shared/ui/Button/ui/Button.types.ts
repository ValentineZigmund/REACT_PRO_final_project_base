type ButtonType = 'Primary' | 'Secondary' | 'Light';
type ButtonSize = 'Normal' | 'Large';

export type IButtonProps = {
	onClick?: () => void;
	disabled?: boolean;
	wide?: boolean;
	maxContext?: boolean;
	children: string;
	type?: ButtonType;
	htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	positionStatic?: boolean;
	size?: ButtonSize;
	width?: number;
};
