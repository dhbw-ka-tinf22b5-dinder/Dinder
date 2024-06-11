"use client";
import { ButtonSubmit } from "@/components/atoms/Button.component.tsx";
import { Form } from "@/components/atoms/Form.component.tsx";
import { Input } from "@/components/atoms/Input.component.tsx";
import type { RootState } from "@/lib/store.ts";
import { store } from "@/lib/store.ts";
import { registerThunk } from "@/lib/thunks/loginAndRegistration.ts";
import { MainBackgroundImg } from "@/styles/mainPage.styles.ts";
import type {
	FrontendError,
	UserRegisterConfirmation,
} from "@/types/general.types.ts";
import { useSelector } from "react-redux";
import Link from "next/link";

// eslint-disable-next-line react-hooks/rules-of-hooks

const Page = () => {
	const valueError: FrontendError = useSelector(
		(state: RootState) => state.error,
	);
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
		store.dispatch(registerThunk(user));
		console.log(valueError);
	};
	const isPassword: boolean = valueError.errorMessage.includes("Password");
	const isEmail: boolean = valueError.errorMessage.includes("email");
	return (
		<>
			<MainBackgroundImg src={"./pictures/startBackground.png"} />

			<Form method="POST" submit={register}>
				E-Mail:
				<Input
					type={"text"}
					name={"email"}
					error={isEmail ? valueError.errorMessage : ""}
				/>
				Username:
				<Input type={"text"} name={"username"} />
				Password:
				<Input
					type={"password"}
					name={"pwd"}
					error={isPassword ? valueError.errorMessage : ""}
				/>
				Password:
				<Input
					type={"password"}
					name={"CtrlPwd"}
					error={isPassword ? valueError.errorMessage : ""}
				/>
                <div className="loginRegistrDiv">
                    <ButtonSubmit span={1}>Registration </ButtonSubmit>
                    <Link href={"/login"}>Login</Link>
                </div>
			</Form>
		</>
	);
};

export default Page;
