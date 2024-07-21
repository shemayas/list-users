import { UsersResponse } from "../store";
import { observer } from "mobx-react";

const User = observer(
  ({ user, isLast = false }: { user: UsersResponse[0]; isLast: boolean }) => {
    return (
      <li id={isLast ? "last" : undefined}>
        <a href={user.html_url}>
          <figure>
            <img src={user.avatar_url} alt="" />
            <figcaption>{user.login}</figcaption>
          </figure>
        </a>
      </li>
    );
  }
);

export default User;
