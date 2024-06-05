"use client";
import { publishAdvertisement } from "@/clients/http-client.ts";
import { ButtonSubmit } from "@/components/atoms/Button.component.tsx";
import { Form } from "@/components/atoms/Form.component.tsx";
import { Input } from "@/components/atoms/Input.component.tsx";
import { AdvertisementCreationStyled } from "@/styles/AdvertisementCreation.styles.ts";
import type { CreateAdvertisementPayload } from "@/types/general.types.ts";
import type { SyntheticEvent } from "react";

export default function NewAdvertisement() {
	function addAdvertisement(e: SyntheticEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			title: { value: string };
			price: { value: number };
			location: { value: string };
			postalCode: { value: number };
			description: { value: string };
			picture: { value: File };
		};
		const AdvertisementPayload: CreateAdvertisementPayload = {
			json: {
				title: target.title.value,
				price: target.price.value,
				location: target.location.value,
				postalCode: target.postalCode.value,
				description: target.description.value,
			},
			file: target.picture.value,
		};
		publishAdvertisement(AdvertisementPayload)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}

	return (
		<AdvertisementCreationStyled>
			<h3>Create new advertisement</h3>
			<Form method="POST" submit={addAdvertisement}>
				title
				<Input type="text" name="title" />
				description
				<Input type="text" name="description" />
				price
				<Input type="text" name="price" />
				location
				<Input type="text" name="location" />
				postal code
				<Input type="text" name="postalCode" />
				picture
				<Input type="file" name="picture" />
				<ButtonSubmit span={2}>Create</ButtonSubmit>
			</Form>
		</AdvertisementCreationStyled>
	);
}
