'use client'
import { useSelector} from 'react-redux';
import { MainBackgroundImg } from "@/styles/mainPage.styles.ts";
import { loginThunk } from "@/lib/thunks/loginAndRegistration.ts";
import type { Error, UserLogin } from "@/types/general.types.ts";
import { ButtonSubmit } from "@/components/atoms/Button.component.tsx";
import { Form } from "@/components/atoms/Form.component.tsx";
import {Input} from "@/components/atoms/Input.component.tsx";
import {store} from "@/lib/store.ts";

import {RootState} from "@/lib/store.ts";
import {useRouter} from "next/navigation";
const Page = () => {
	const valueError: Error = useSelector((state:RootState) => state.error);

	const valueUser = useSelector((state:RootState) => state.login);
	const {push} = useRouter();
	function handleClick(e:React.SyntheticEvent){
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const userLogin: UserLogin = {
			loginName: target.email.value,
			password: target.password.value,
		};

		store.dispatch(loginThunk(userLogin));
	}
		if (valueUser.userName) {
			push("/");
		}
		const isPassword:boolean = valueError.errorMessage.includes("password");
		return (
		<>
			<MainBackgroundImg src={"./pictures/startBackground.png"} />

			<Form method={"POST"} submit={handleClick}>
				E-Mail:
				<Input name={"email"} type={"text"} error={ valueError.errorMessage} />
				Password:
				<Input name={"password"} type={"password"} error={(isPassword) ? valueError.errorMessage:""} />
				<ButtonSubmit span={2}>Login</ButtonSubmit>
			</Form>
		</>
	);
};

export default Page;
