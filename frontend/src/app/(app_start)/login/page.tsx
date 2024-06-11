"use client";
import { ButtonSubmit } from "@/components/atoms/Button.component.tsx";
import { Form } from "@/components/atoms/Form.component.tsx";
import { Input } from "@/components/atoms/Input.component.tsx";
import type { RootState } from "@/lib/store.ts";
import { store } from "@/lib/store.ts";
import { loginThunk } from "@/lib/thunks/loginAndRegistration.ts";
import { MainBackgroundImg } from "@/styles/mainPage.styles.ts";
import type { FrontendError, UserLogin } from "@/types/general.types.ts";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";

const Page = () => {
	const valueError: FrontendError = useSelector(
		(state: RootState) => state.error,
	);
	const valueUser = useSelector((state: RootState) => state.login);
	const router = useRouter();
	function handleClick(e: React.SyntheticEvent) {
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
		router.push("/");
	}
	const isPassword: boolean = valueError.errorMessage.includes("password");
	return (
		<>
			<MainBackgroundImg src={"./pictures/startBackground.png"} />

			<Form method={"POST"} submit={handleClick}>
				E-Mail:
				<Input name={"email"} type={"text"} error={valueError.errorMessage} />
				Password:
				<Input
					name={"password"}
					type={"password"}
					error={isPassword ? valueError.errorMessage : ""}
				/>
				<div className="loginRegistrDiv">
					<ButtonSubmit span={1}>Login</ButtonSubmit>
					<Link href={"/registration"}>Registration</Link>
				</div>
			</Form>
		</>
	);
};

export default Page;
