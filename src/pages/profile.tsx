import {FC} from "react";
import Container from "../components/container";
import Greeting from "../components/greeting";
import Header from "../components/header";
import {IUser} from "../utils/types";

const ProfilePage: FC<IUser> = ({login}) => {
  return (
    <>
      <Header />
      <Container>
        <Greeting login={login} />
      </Container>
    </>
  );
};

export default ProfilePage;
