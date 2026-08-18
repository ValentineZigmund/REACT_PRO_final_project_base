import { ComponentPropsWithoutRef } from 'react';

type InputBorderType = 'Round' | 'Square';

export type IInputProps = ComponentPropsWithoutRef<'input'> & {
	borderType?: InputBorderType;
};
