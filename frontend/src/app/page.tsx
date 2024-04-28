'use client'
import { useRouter } from 'next/navigation'
import { MainBackgroundImg, MainContainer } from "../styles/mainPage.styles";
import { Button } from "../components/atoms/Button.component";

const MainPageComponent = () => {

  const {push} = useRouter();

  return (
      <>
        <MainBackgroundImg src={"./pictures/startBackground.png"} />
        <MainContainer $isMain>
          <Button span={1} click={() => push('/login')} text={"Login"} />
          <Button
              span={1}
              click={() => push("/registration")}
              text={"Registrierung"}
          />
        </MainContainer>
      </>
  );
};

export default MainPageComponent;