import * as usersDB from "./users.json";
import { User } from "src/model/user.interface";
import { posts } from "./posts";

export const users = {
  user: null,
  find: (query?: { $in: { roles?: User["roles"] } }): Promise<User[]> => {
    if (query?.$in?.roles) {
      return Promise.resolve(
        usersDB.filter((u) =>
          query.$in.roles.every((role) => u.roles.includes(role))
        )
      );
    }
    return Promise.resolve(usersDB);
  },
  findOne<T extends { id?: number }>(query: T) {
    if (!query) {
      return Promise.reject("No query given");
    }
    this.user = usersDB.find((u) => {
      if (!!query.id && u.id === query.id) {
        return true;
      }
      return false;
    });

    return this;
  },

  async populate(query: string) {
    switch (query) {
      case "posts":
        this.user.posts = await Promise.resolve(posts.find({ userId: parseInt(this.user.id) }));
    }
    return this;
  }
};
