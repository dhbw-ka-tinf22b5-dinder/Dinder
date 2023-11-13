import { ButtonStyled} from "../../styles/buttons.styles";

//span ist ein sogenanntes Property also ein extra Attribut
export const Button=({click,text,span})=>{
    return <>
        <ButtonStyled $span={span} onClick={click}>{text}</ButtonStyled>
    </>
}
export const ButtonSubmit=({span,children})=>{
    return <>
        <ButtonStyled type="submit" $span={span} >{children}</ButtonStyled>
    </>
}
