'use client'
import { useAppDispatch, useAppSelector } from "../../lib/hooks.ts";
import { MessageStyles } from "@/styles/Message.styles.ts";
import { MainBackgroundImg } from "@/styles/mainPage.styles.ts";
import { loginThunk } from "@/lib/thunks/loginAndRegistration.ts";
import type { Error, UserLogin } from "@/types/general.types.ts";
import { ButtonSubmit } from "@/components/atoms/Button.component.tsx";
import { Form } from "@/components/atoms/Form.component.tsx";
import { Input } from "@/components/atoms/Input.component.tsx";
import {useRouter} from "next/navigation";
const Page = () => {
	const router = useRouter();
	const valueError: Error = useAppSelector((state) => state.error);
	const valueUser = useAppSelector((state) => state.login);
	const dispatch = useAppDispatch();
	function handleClick(e) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const userLogin: UserLogin = {
			loginName: target.email.value,
			password: target.password.value,
		};
		dispatch(loginThunk(userLogin));
	}

		if (valueUser.userName) {
			router.push("swipepage");
		}


	const nav = (s: string) => {
		router.push(s);
	};
	return (
		<>
			<MainBackgroundImg src={"./pictures/startBackground.png"} />
			<MessageStyles $isError={valueError.error} $isHidden={!valueError.error}>
				{valueError.errorMessage}
			</MessageStyles>
			<Form method={"POST"} submit={handleClick}>
				E-Mail:
				<Input name={"email"} type={"text"} />
				Password:
				<Input name={"password"} type={"password"} />
				<ButtonSubmit span={2}>Login</ButtonSubmit>
			</Form>
		</>
	);
};

export default Page;
