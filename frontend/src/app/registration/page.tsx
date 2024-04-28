'use client'
import { useSelector } from 'react-redux';
import { MessageStyles } from "@/styles/Message.styles.ts";
import { MainBackgroundImg } from "@/styles/mainPage.styles.ts";
import { registerThunk } from "@/lib/thunks/loginAndRegistration.ts";
import type { RootState } from '@/lib/store';
import type {
	Error,
	UserRegisterConfirmation,
} from "@/types/general.types.ts";
import { ButtonSubmit } from "@/components/atoms/Button.component.tsx";
import { Form } from "@/components/atoms/Form.component.tsx";
import { Input } from "@/components/atoms/Input.component.tsx";

// eslint-disable-next-line react-hooks/rules-of-hooks

const Page = () => {
	const valueError: Error = useSelector((state:RootState) => state.error);
	const register = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const form = e.target as typeof e.target & {
			email: { value: string };
			username: { value: string };
			pwd: { value: string };
			CtrlPwd: { value: string };
		};
		const user: UserRegisterConfirmation = {
			email: form.email.value,
			userName: form.username.value,
			password: form.pwd.value,
			confirmPassword: form.CtrlPwd.value,
		};
		registerThunk(user);
	};
	return (
		<>
			<MainBackgroundImg src={"./pictures/startBackground.png"} />
			<MessageStyles $isError={valueError.error} $isHidden={!valueError.error}>
				{valueError.errorMessage}
			</MessageStyles>
			<Form method="POST" submit={register}>
				E-Mail:
				<Input type={"text"} name={"email"} />
				Username:
				<Input type={"text"} name={"username"} />
				Password:
				<Input type={"password"} name={"pwd"} />
				Password:
				<Input type={"password"} name={"CtrlPwd"} />
				<ButtonSubmit span={2}>Registrieren </ButtonSubmit>
			</Form>
		</>
	);
};

export default Page;
