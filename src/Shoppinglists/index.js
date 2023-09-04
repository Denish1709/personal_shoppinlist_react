import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Button,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchShoppinglists = async (priority = "") => {
  const response = await axios.get(
    "http://localhost:5050/shoppinglist" +
      (priority !== "" ? "?priority=" + priority : "")
  );
  return response.data;
};

const deleteShoppinglist = async (shoppinglist_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: "http://localhost:5050/shoppinglist/" + shoppinglist_id,
  });
  return response.date;
};

function Shoppinglists() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [priority, setPriority] = useState("");
  const {
    isLoading,
    isError,
    data: shoppinglists,
    error,
  } = useQuery({
    queryKey: ["shoppinglists", priority],
    queryFn: () => fetchShoppinglists(priority),
  });

  const deleteMutation = useMutation({
    mutationFN: deleteShoppinglist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shoppinglists", priority],
      });
      notifications.show({
        title: "Shoppinglist Deleted",
        color: "green",
      });
    },
  });

  if (isLoading) return <Loader />;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5050/shoppinglist")
  //     .then((response) => {
  //       setShoppinglist(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const filterShoppinglist = async (genre = "") => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5050/shoppinglist?priority=  " + priority
  //     );
  //     setShoppinglist(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Group position="apart">
        <Title align="center">Shopping List</Title>
        <Button component={Link} to="/shoppinglist_add" color="green">
          Add New
        </Button>
      </Group>
      <Space h="20px" />
      <Group>
        <Button
          onClick={() => {
            setPriority("");
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            setPriority("Low");
          }}
        >
          Drama
        </Button>
        <Button
          onClick={() => {
            setPriority("Medium");
          }}
        >
          Fantasy
        </Button>
        <Button
          onClick={() => {
            setPriority("High");
          }}
        >
          Action
        </Button>
      </Group>
      <Space h="20px" />
      <LoadingOverlay visible={isLoading} />
      <Grid>
        {shoppinglists
          ? shoppinglists.map((shoppinglist) => {
              return (
                <Grid.Col key={shoppinglist._id} span={4}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{shoppinglist.name}</Title>
                    <Space h="20px" />
                    <Group position="center" spacing="5px">
                      <Badge color="green">{shoppinglist.quantity}</Badge>
                      <Badge color="yellow">{shoppinglist.unit}</Badge>
                      <Badge color="grape">{shoppinglist.priority}</Badge>
                    </Group>
                    <Space h="20px" />
                    <Group position="right">
                      <Button
                        component={Link}
                        to={"/shoppinglists/" + shoppinglist._id}
                        color="blue"
                        size="xs"
                        radius="50px"
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          deleteMutation.mutate(shoppinglist._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}

export default Shoppinglists;
