'use client';

import { Component } from '@/lib/types';
import { saveBuildAction, SaveBuildFromState } from '../actions';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useMemo, useRef } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedByCategory: Record<string, Component | null>;
	defaultName?: string;
	redirectPath?: string;
};

const initialState: SaveBuildFromState = { status: 'idle' };

export function SaveBuildDialog({
	onOpenChange,
	open,
	selectedByCategory,
	defaultName,
	redirectPath,
}: Props) {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const { pending } = useFormStatus();
	const [state, formAction] = useActionState(saveBuildAction, initialState);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			formRef.current?.reset();
		}

		onOpenChange(nextOpen);
	};

	const componentIds = useMemo(
		() =>
			Object.values(selectedByCategory)
				.filter(
					(component): component is Component => component !== null,
				)
				.map((component) => component.id),
		[selectedByCategory],
	);

	useEffect(() => {
		if (state.status === 'success') {
			toast.success('Сборка сохранена');
			formRef.current?.reset();

			onOpenChange(false);

			if (redirectPath) {
				router.push(redirectPath);
			} else {
				router.refresh();
			}
		}
	}, [onOpenChange, redirectPath, router, state.status]);

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Сохранить сборку</DialogTitle>
					<DialogDescription>
						Введите название сборки
					</DialogDescription>
				</DialogHeader>

				<form className='space-y-4' ref={formRef} action={formAction}>
					<Input
						name='name'
						placeholder='Игровой ПК'
						defaultValue={defaultName}
						required
					/>
					<input
						type='hidden'
						name='componentIds'
						value={componentIds.join(',')}
					/>
					<DialogFooter>
						<Button
							type='submit'
							disabled={pending || componentIds.length === 0}
						>
							{pending ? 'Сохранение...' : 'Сохранить'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
