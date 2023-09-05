import { useState, useEffect, useMemo } from "react";
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
  LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchShoppinglists = async (priority, purchased) => {
  if (priority !== "") {
    const response = await axios.get(
      "http://localhost:5050/shoppinglist?priority=" + priority
    );
    return response.data;
  } else if (purchased !== "") {
    const response = await axios.get(
      "http://localhost:5050/shoppinglist?purchased=" + purchased
    );
    return response.data;
  } else {
    const response = await axios.get("http://localhost:5050/shoppinglist");
    return response.data;
  }
};

const updateShoppinglist = async (shoppinglist_id = "") => {
  await axios({
    method: "PUT",
    url: "http://localhost:5050/shoppinglist/" + shoppinglist_id + "/purchased",
  });
};

const deleteShoppinglist = async (list_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: "http://localhost:5050/shoppinglist/" + list_id,
  });
  return response.data;
};

function Shoppinglists() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [priority, setPriority] = useState("");
  const [purchased, setPurchased] = useState("");

  const {
    isLoading,
    isError,
    data: shoppinglists,
    error,
  } = useQuery({
    queryKey: ["shoppinglists", priority, purchased],
    queryFn: () => fetchShoppinglists(priority, purchased),
  });

  const memoryShoppinglist = queryClient.getQueryData([
    "shoppinglists",
    "",
    "",
  ]);
  const priorityOptions = useMemo(() => {
    let options = [];
    if (shoppinglists && shoppinglists.length > 0) {
      shoppinglists.forEach((shoppinglist) => {
        if (!options.includes(shoppinglist.priority)) {
          options.push(shoppinglist.priority);
        }
      });
    }
    return options;
  }, [memoryShoppinglist]);

  const updateMutation = useMutation({
    mutationFn: updateShoppinglist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shoppinglist", priority, purchased],
      });
      notifications.show({
        title: "updated Purchase",
        color: "green",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteShoppinglist,
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
        <Title order={3} align="center">
          Shopping List
        </Title>
        <Button component={Link} to="/shoppinglist_add" color="green">
          Add New
        </Button>
      </Group>
      <Space h="20px" />
      <Group>
        <select
          value={priority}
          onChange={(event) => {
            setPriority(event.target.value);
          }}
        >
          <option value="">All Priority</option>
          {priorityOptions.map((priority) => {
            return (
              <option key={priority} value={priority}>
                {priority}
              </option>
            );
          })}
        </select>

        <select
          value={purchased}
          onChange={(event) => {
            setPurchased(event.target.value);
          }}
        >
          <option value="">All purchased</option>
          <option value="yes">Purchased</option>
          <option value="no">Unpurchased</option>
        </select>
        {/* <Button
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
          Low
        </Button>
        <Button
          onClick={() => {
            setPriority("Medium");
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            setPriority("High");
          }}
        >
          High
        </Button> */}
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
                        color="blue"
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          updateMutation.mutate(shoppinglist._id);
                        }}
                      >
                        Purchased
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
