'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Component } from '@/lib/types';
import {
	Cpu,
	Monitor,
	MemoryStick,
	HardDrive,
	Zap,
	Box,
	Fan,
	Server,
	Plus,
} from 'lucide-react';
import { useState } from 'react';
import { AddComponentDialog } from './add-component-dialog';

const iconMap: Record<string, React.ElementType> = {
	cpu: Cpu,
	gpu: Monitor,
	motherboard: Server,
	ram: MemoryStick,
	storage: HardDrive,
	psu: Zap,
	case: Box,
	cooling: Fan,
};

type CategoryRow = {
	id: string;
	name: string;
	icon: string;
};
type Props = {
	components: CategoryRow[];
	selectedByCategory: Record<string, Component | null>;
	onSelectedComponent: (
		categotyId: string,
		component: Component | null,
	) => void;
};

export function TableParts({
	components,
	onSelectedComponent,
	selectedByCategory,
}: Props) {
	const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
	const totalPrice = Object.values(selectedByCategory).reduce(
		(sum, c) => sum + (c?.price ?? 0),
		0,
	);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-25'>Компонент</TableHead>
					<TableHead>Тип</TableHead>
					<TableHead>Модель</TableHead>
					<TableHead>Цена</TableHead>
					<TableHead className='text-right'>Действия</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{components.map((category) => {
					const Icon = iconMap[category.id];
					const selected = selectedByCategory[category.id];

					return (
						<TableRow key={category.id} className='my-2'>
							<TableCell>
								<div className='flex items-center'>
									<Icon className='h-5 w-5 mr-1' />
								</div>
							</TableCell>
							<TableCell className='font-bold'>
								{category.name}
							</TableCell>
							<TableCell>{selected?.name ?? '-'}</TableCell>
							<TableCell>{selected?.price ?? '-'}</TableCell>
							<TableCell className='text-right'>
								<Dialog
									open={openCategoryId === category.id}
									onOpenChange={(open) =>
										setOpenCategoryId(
											open ? category.id : null,
										)
									}
								>
									<DialogTrigger>
										<Button variant='outline' size='sm'>
											<Plus className='h-4 w-4 mr-1' />
											{selected ? 'Изменить' : 'Добавить'}
										</Button>
									</DialogTrigger>
									<AddComponentDialog
										categoryId={category.id}
										categoryName={category.name}
										onSelect={(c) => {
											onSelectedComponent(category.id, c);
											setOpenCategoryId(null);
										}}
									/>
								</Dialog>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={5}>
						<p className='font-medium'>Цена сборки:</p>
						<p className='font-large text-gray-500'>
							{new Intl.NumberFormat('ru-RU').format(totalPrice)}
						</p>
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
