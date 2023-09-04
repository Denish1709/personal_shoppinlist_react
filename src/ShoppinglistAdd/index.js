import { useState } from "react";
import axios from "react";
import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  NumberInput,
  Divider,
  Button,
  Group,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function ShoppinglistAdd() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("");

  const handleAddNewShoppinglist = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "POST",
        url: "http://localhost:5050/shoppinglist",
        header: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: name,
          quantity: quantity,
          unit: unit,
          priority: priority,
        }),
      });

      notifications.show({
        name: "Item Added",
        color: "green",
      });

      navigate("/");
    } catch (error) {
      notifications.show({
        name: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <Container>
      <Space h="20px" />
      <Title order={2} align="center">
        Add New Item
      </Title>
      <Space h="20px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the item name here"
          label="Name"
          description="The name of the shoppinglist"
          withAsterisk
          onChange={(event) => setname(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={quantity}
          placeholder="Enter the quantity here"
          label="Quantity"
          description="The quantity of the shoppinglist"
          withAsterisk
          onChange={(event) => setQuantity(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={unit}
          placeholder="Enter the unit for the item here"
          label="Unit"
          description="The unit of the item"
          withAsterisk
          onChange={(event) => setUnit(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={priority}
          placeholder="Enter the priority level for the item here"
          label="Priority"
          description="The priority of the item"
          withAsterisk
          onChange={(event) => setPriority(event.target.value)}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleAddNewShoppinglist}>
          Add New Item
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="grey">
          Go back to Home
        </Button>
      </Group>
      <Space h="20px" />
    </Container>
  );
}

export default ShoppinglistAdd;
