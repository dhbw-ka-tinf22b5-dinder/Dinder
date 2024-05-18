'use client';
import {Input} from "@/components/atoms/Input.component.tsx";
import {ButtonSubmit} from "@/components/atoms/Button.component.tsx";
import {Form} from "@/components/atoms/Form.component.tsx";

export default function NewAdvertisement() {

    const addAdvertisement = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    const styleBox = {
        height: "80%",
        width: "33%",
        verticalAlign: "center",
        margin: "auto"
    };

	return (
            <div style={styleBox}>
                <Form method={"POST"} submit={addAdvertisement}>
                    <h3>Create new advertisement</h3>

                    title
                    <Input type={"text"} name={"title"} />

                    description
                    <Input type={"text"} name={"description"}/>

                    price
                    <Input type={"text"} name={"price"} />

                    location
                    <Input type={"text"} name={"location"}/>

                    postal code
                    <Input type={"text"} name={"postalCode"}/>

                    picture
                    <Input type={"text"} name={"picture"} />

                    <ButtonSubmit span={2}>Create</ButtonSubmit>
                </Form>
            </div>
    );
}
