import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MessageStyles } from "../../styles/Message.styles";
import { MainBackgroundImg } from "../../styles/mainPage.styles";
import { loginThunk } from "../../thunks/loginAndRegistration";
import type { Error, UserLogin } from "../../types/general.types";
import { ButtonSubmit } from "../atoms/Button.component";
import { Form } from "../atoms/Form.component";
import { Input } from "../atoms/Input.component";
const LoginComponent = () => {
	const navigate = useNavigate();
	const valueError: Error = useAppSelector((state) => state.error);
	const valueUser = useAppSelector((state) => state.login);
	const dispatch = useAppDispatch();
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
		dispatch(loginThunk(userLogin));
	}
	useEffect(() => {
		if (valueUser.userName) {
			nav("swipepage");
		}
	});

	const nav = (s: string) => {
		navigate("/" + s);
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

export default LoginComponent;
