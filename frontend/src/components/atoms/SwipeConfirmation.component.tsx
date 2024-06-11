import {ConfirmationElementStyled} from "@/styles/ConfirmationStyled.ts";
import {Button} from "@/components/atoms/Button.component.tsx";
import {swipe} from "@/types/general.types.ts";
import {confirmSwipe} from "@/clients/http-client.ts";
import {store} from "@/lib/store.ts";
import {OwnSwipeThunk} from "@/lib/thunks/SwipeThunk.ts";

interface Props{
    name:string,
    currentSwipe:swipe
}
export const SwipeConfirmation = (props:Props)=>{
    return <ConfirmationElementStyled>
        {props.name} <Button text={"Accept"} click={()=>handleAccept(props.currentSwipe)} span={1} color={"green"}/>
    </ConfirmationElementStyled>
}
function handleAccept(currentSwipe:swipe){
    store.dispatch(OwnSwipeThunk)
    confirmSwipe(currentSwipe.advertisementID,currentSwipe.swipeID)
}