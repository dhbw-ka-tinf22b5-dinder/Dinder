import { ButtonStyled } from "../../styles/buttons.styles";
interface ButtonProps {
	click: () => void;
	text: string;
	span: number;
}
interface ButtonSubmitProps {
	span: number;
	children: string;
}

//span ist ein sogenanntes Property also ein extra Attribut
export const Button = (props: ButtonProps) => {
	return (
		<>
			<ButtonStyled $span={props.span} onClick={props.click}>
				{props.text}
			</ButtonStyled>
		</>
	);
};
export const ButtonSubmit = (props: ButtonSubmitProps) => {
	return (
		<>
			<ButtonStyled type="submit" $span={props.span}>
				{props.children}
			</ButtonStyled>
		</>
	);
};
