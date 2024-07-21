import { Endpoints } from "@octokit/types";
import { makeAutoObservable } from "mobx";


export type UsersResponse = Endpoints["GET /users"]["response"]["data"];

// MobX implementation
class Users {
  users: UsersResponse = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUsers(users: UsersResponse) {
    this.users = [...this.users, ...users];
  }
}

const store = new Users();

export default store;
