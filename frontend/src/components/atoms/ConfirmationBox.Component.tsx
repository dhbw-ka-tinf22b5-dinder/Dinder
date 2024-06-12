import { SwipeConfirmation } from "@/components/atoms/SwipeConfirmation.component.tsx";
import { ConfirmationListStyled } from "@/styles/ConfirmationStyled.ts";
import type { swipe } from "@/types/general.types.ts";

interface Props {
	swipes: swipe[];
}
export const ConfirmationBoxComponent = (props: Props) => {
	const elements = [];
	for (let i = 0; i < props.swipes.length; i++) {
		elements.push(<SwipeConfirmation currentSwipe={props.swipes[i]} key={i} />);
	}
	console.log(typeof SwipeConfirmation);
	return <ConfirmationListStyled>{elements}</ConfirmationListStyled>;
};
