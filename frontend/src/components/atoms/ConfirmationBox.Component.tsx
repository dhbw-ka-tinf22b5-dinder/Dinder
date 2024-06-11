import {ConfirmationListStyled} from "@/styles/ConfirmationStyled.ts";
import {SwipeConfirmation} from "@/components/atoms/SwipeConfirmation.component.tsx";
import {swipe} from "@/types/general.types.ts";

interface Props{
    names:string[]
    swipes:swipe[]
}
export const ConfirmationBoxComponent = (props:Props) =>{
    const elements = []
    for (let i = 0;i<props.names.length;i++){
        elements.push(<SwipeConfirmation name={props.names[i]} currentSwipe={props.swipes[i]} key={i}/>)
    }
    console.log(typeof SwipeConfirmation)
    return <ConfirmationListStyled>
        {elements}
    </ConfirmationListStyled>
}