import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export function TypographyH3({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn(
				'scroll-m-20 text-2xl font-semibold tracking-tight',
				className,
			)}
			{...props}
		/>
	);
}
