'use client'
import { useSelector} from 'react-redux';
import { MessageStyles } from "@/styles/Message.styles.ts";
import { MainBackgroundImg } from "@/styles/mainPage.styles.ts";
import { loginThunk } from "@/lib/thunks/loginAndRegistration.ts";
import type { Error, UserLogin } from "@/types/general.types.ts";
import { ButtonSubmit } from "@/components/atoms/Button.component.tsx";
import { Form } from "@/components/atoms/Form.component.tsx";
import { Input } from "@/components/atoms/Input.component.tsx";
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
		console.log("before thunk")
		store.dispatch(loginThunk(userLogin));
	}
	console.log("User "+valueUser);
	console.log("Error "+valueError);
		if (valueUser.userName) {
			push("/");
		}

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
