import { InputStyles } from "@/styles/input.styles.ts";
import { ErrorMessageStyles } from "@/styles/errorMessage.style.ts";

export const Input = ({ type = "text", name = "input", error = "" }) => {
	return (
		<div>
			<InputStyles type={type} name={name} $isError={error !== ""} />
			<ErrorMessageStyles>{error}</ErrorMessageStyles>
		</div>
	);
};
