import { useEffect } from "react";
import { checkVisible } from "./utils/elements";
import { debounce } from "./utils/functions";
import { getUsers } from "./api/users";
import { observer } from "mobx-react";
import store from "./store";

let inRequest = false;

const App = observer(() => {
  const users = store.users;

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
              store.addUsers(response.data);
              // setUsers([...users, ...response.data]);
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
    const abortController = new AbortController();
    getUsers(1, abortController).then((response) => {
      store.addUsers(response.data);
    });

    return () => abortController.abort();
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
});

export default App;
