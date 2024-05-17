export default function NewAdvertisement(){
    return (
            <div>
                <h1>Create new advertisement</h1>
                <form>
                    <label>
                        title:
                        <input type="text" name="title"/>
                    </label>
                    <label>
                        description:
                        <input type="text" name="description"/>
                    </label>
                    <label>
                        price:
                        <input type="text" name="price"/>
                    </label>
                    <label>
                        location:
                        <input type="text" name="location"/>
                        postal code:
                        <input type="number" name="postalCode"/>
                    </label>
                    <label>
                        picture:
                        <input type="file" name="image"/>
                    </label>
                    <button type="submit">create advertisement</button>
                </form>
            </div>
    );
}