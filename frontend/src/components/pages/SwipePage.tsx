// SwipePage.js
import { useState } from 'react';
//import './App.css';
import {Button} from "../atoms/Button.component"
import {AdvertismentImage, Card, Info} from "../../styles/swipecard.styles";

const data = [
  {
    id: 1,
    name: 'Rasenmähen',
    date: 'November 29, 2023',
    place: 'Freiburg, Deutschland',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfqFhXDTDDPNU_4T8migaRz1T7Uc-XCFU3mYONa_4hw&s',
  },
  {
    id: 2,
    name: 'Wände streichen',
    date: 'Dezember 04, 2023',
    place: 'Karlsruhe, Deutschland',
    imageUrl: 'https://u-s-e.org/wp-content/uploads/Malerei_01_1024x683-1024x683.jpg',
  },
  {
    id: 3,
    name: 'Umzughilfe',
    date: 'Dezember 14, 2023',
    place: 'Frankfurt, Deutschland',
    imageUrl: 'https://cdn.lagerbox.com/thumb/media/1027/studenten-umzugshilfe_01749679_9fb2a0d8_1_l75-w1366-h650-c--l75-w1920-h914-c--l75-w375-h450-c--l75-w750-h900-c.webp',
  },
  {
    id: 4,
    name: 'Holz tragen',
    date: 'Dezember 20, 2023',
    place: 'Stuttgart, Deutschland',
    imageUrl: 'https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/Aussenbereich/holz-stapeln/1_Holz-stapeln_01256989.jpg?crop=focalpoint&fit=crop&fp-x=0.346&fp-y=0.584&fp-z=1&w=480&auto=format%2Ccompress&h=270',
  },
];

function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  //Next task advertisements
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };
//Next task advertisements
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleAccept = () => {
    // Add logic for accepting the active box
    console.log('Box accepted:', data[currentIndex]);
  };

  const currentItem = data[currentIndex];

  return (

        <Card>
          <AdvertismentImage src={currentItem.imageUrl} alt={currentItem.name} />
          <Info>
            <h2>{currentItem.name}</h2>
            <p>{currentItem.date}</p>
            <p>{currentItem.place}</p>
          </Info>
            <Button span={1} click={handlePrev} text={"Previous"}/>

            <Button span={1} click={handleAccept} text={"Accept"}/>

            <Button span={1} click={handleNext} text={"Next"}/>

          </Card>



  );
}

export default SwipePage;
