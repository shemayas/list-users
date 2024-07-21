import { Endpoints } from "@octokit/types";
import { useEffect, useState } from "react";
import { checkVisible } from "./utils/elements";
import { debounce } from "./utils/functions";
import { getUsers } from "./api/users";

let inRequest = false;

function App() {
  const [users, setUsers] = useState<
    Endpoints["GET /users"]["response"]["data"]
  >([]);

  useEffect(() => {
    const onScroll = debounce(() => {
      const lastElement = document.getElementById("last");

      if (lastElement && !inRequest && checkVisible(lastElement)) {
        inRequest = true;
        const lastUserId = users[users.length - 1]?.id;
        !lastUserId && console.error("no last user id", { users });
        lastUserId &&
          getUsers(lastUserId)
            .then((response) => {
              setUsers([...users, ...response.data]);
            })
            .finally(() => {
              inRequest = false;
            });
      }
    });
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [users]);

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  if (!users.length) {
    return <div>no users</div>;
  }
  return (
    <>
      <ul>
        {users.map((user, index) => (
          <li
            id={users.length - 1 === index ? "last" : undefined}
            key={`${user.login}-${index}`}
          >
            {user.login}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
