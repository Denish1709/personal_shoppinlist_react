import { useState, useEffect } from "react";
import axios from "axios";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function ShoppinglistEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5050/shoppinglist/" + id)
      .then((response) => {
        setName(response.data.name);
        setQuantity(response.data.quantity);
        setUnit(response.data.unit);
        setPriority(response.data.priority);
      })
      .catch((error) => {
        notifications.show({
          name: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleUpdateshoppinglist = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: "PUT",
        url: "http://localhost:5050/shoppinglist/" + id,
        headers: {
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
        name: "List Edited",
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
      <Space h="50px" />
      <Title order={2} align="center">
        Edit Shopping List
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the shoppinglist here"
          label="Name"
          description="The shopping item name"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={quantity}
          placeholder="Enter the quantityr here"
          label="Quantity"
          description="The quantity of the item"
          withAsterisk
          onChange={setQuantity}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={unit}
          placeholder="Enter the unit here"
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
          placeholder="Enter the priority here"
          label="Priority"
          description="The priority of the movie"
          withAsterisk
          onChange={(event) => setPriority(event.target.value)}
        />
        <Space h="20px" />
        <Button fullWidth onClick={handleUpdateshoppinglist}>
          Update
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}

export default ShoppinglistEdit;
