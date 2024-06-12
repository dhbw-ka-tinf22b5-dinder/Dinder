import { confirmSwipe } from "@/clients/http-client.ts";
import { Button } from "@/components/atoms/Button.component.tsx";
import { store } from "@/lib/store.ts";
import { OwnSwipeThunk } from "@/lib/thunks/SwipeThunk.ts";
import { ConfirmationElementStyled } from "@/styles/ConfirmationStyled.ts";
import type { swipe } from "@/types/general.types.ts";

interface Props {
	currentSwipe: swipe;
}
export const SwipeConfirmation = (props: Props) => {
	return (
		<ConfirmationElementStyled>
			<p style={{ margin: "auto" }}>{props.currentSwipe.userName}</p>
			<Button
				text={"Accept"}
				click={() => handleAccept(props.currentSwipe)}
				span={1}
				color={"lightgreen"}
			/>
		</ConfirmationElementStyled>
	);
};
function handleAccept(currentSwipe: swipe) {
	store.dispatch(OwnSwipeThunk);
	confirmSwipe(currentSwipe.advertisementID, currentSwipe.swipeID);
}
