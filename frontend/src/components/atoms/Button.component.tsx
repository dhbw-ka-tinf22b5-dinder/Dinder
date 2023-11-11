import { ButtonStyled} from "../../styles/buttons.styles";

export const Button=({click,text,span})=>{
    return <>
        <ButtonStyled $span={span} onClick={click}>{text}</ButtonStyled>
    </>
}