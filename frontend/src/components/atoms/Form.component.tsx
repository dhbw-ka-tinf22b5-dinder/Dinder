import {FormStyles} from "../../styles/form.styles";

export const Form =({method,submit,children})=>{
    return <>
        <FormStyles method={method} onSubmit={submit}>{children}</FormStyles>
    </>
}