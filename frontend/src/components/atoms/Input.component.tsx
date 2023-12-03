import {InputStyles} from "../../styles/input.styles";
interface InputProps {
    type: string;
    name: string;
}

export const Input=(props:InputProps)=> {
    return (
        <InputStyles
            type={props.type}
            name={props.name}
        >
        </InputStyles>
    );
}