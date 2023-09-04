import { Container, Title, Space, Divider } from "@mantine/core";

import Shoppinglists from "../Shoppinglists";

function Home() {
  return (
    <div className="App">
      <Container>
        <Space h="50px" />
        <Title align="center" color="red">
          Personal ShoppingList
        </Title>
        <Space h="50px" />
        <Divider />
        <Shoppinglists />
      </Container>
    </div>
  );
}

export default Home;
