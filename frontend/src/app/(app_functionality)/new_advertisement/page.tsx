"use client";
import {publishAdvertisement} from "@/clients/http-client.ts";
import {ButtonSubmit} from "@/components/atoms/Button.component.tsx";
import {Form} from "@/components/atoms/Form.component.tsx";
import {Input} from "@/components/atoms/Input.component.tsx";
import {AdvertisementCreationStyled} from "@/styles/AdvertisementCreation.styles.ts";
import type {CreateAdvertisementPayload} from "@/types/general.types.ts";
import {type ChangeEvent, type SyntheticEvent, useState} from "react";

export default function NewAdvertisement() {
    const [file, setFile] = useState<string>()

    function addAdvertisement(e: SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            title: { value: string };
            price: { value: number };
            location: { value: string };
            postalCode: { value: number };
            description: { value: string };
        };
        const AdvertisementPayload: CreateAdvertisementPayload = {
            json: {
                title: target.title.value,
                price: target.price.value,
                location: target.location.value,
                postalCode: target.postalCode.value,
                description: target.description.value,
            },
            file: file
        };
        publishAdvertisement(AdvertisementPayload)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
    }

    function change(e: ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader()
        reader.onload = async (f) => {
            if (!f.target) return;
            const image: ArrayBuffer | string | null = f.target.result
            if (typeof image === 'string') setFile(image)


        };
        if (!e.target.files) return
        reader.readAsDataURL(e.target.files[0])
    }

    return (
            <AdvertisementCreationStyled>
                <h3>Create new advertisement</h3>
                <Form method="POST" submit={addAdvertisement}>
                    title
                    <Input type="text" name="title"/>
                    description
                    <Input type="text" name="description"/>
                    price
                    <Input type="text" name="price"/>
                    location
                    <Input type="text" name="location"/>
                    postal code
                    <Input type="text" name="postalCode"/>
                    picture
                    <input type="file" onChange={(e) => change(e)} name="picture"/>
                    <ButtonSubmit span={2}>Create</ButtonSubmit>
                </Form>
            </AdvertisementCreationStyled>
    );
}
