import type { ReactNode } from "react";
import { FormStyles } from "../../styles/form.styles";
interface FormProps {
	method: "POST" | "GET";
	submit: (e: React.SyntheticEvent) => void;
	children: ReactNode;
}

export const Form = (props: FormProps) => {
	return (
		<>
			<FormStyles method={props.method} onSubmit={props.submit}>
				{props.children}
			</FormStyles>
		</>
	);
};
