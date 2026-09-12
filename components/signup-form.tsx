import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Создать аккаунт</CardTitle>
			</CardHeader>
			<CardContent>
				<form>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='name'>Имя</FieldLabel>
							<Input
								id='name'
								type='text'
								placeholder='Иван Иванов'
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input
								id='email'
								type='email'
								placeholder='example@example.com'
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor='password'>Пароль</FieldLabel>
							<Input id='password' type='password' required />
							<FieldDescription>
								Пароль должен быть больше 8 символов
							</FieldDescription>
						</Field>
						<FieldGroup>
							<Field>
								<Button type='submit'>Создать аккаунт</Button>
								<FieldDescription className='px-6 text-center'>
									У вас уже есть аккаунт?{' '}
									<a href='/login'>Войти</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
