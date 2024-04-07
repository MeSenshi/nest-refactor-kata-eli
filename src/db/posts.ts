import { Post } from 'src/model/post.interface';
import * as postsDB from './posts.json';

export const posts = {
  find: (query?: {userId: number}): Promise<Post[]> => {
    if (query.userId){
      return Promise.resolve(
        postsDB.filter(post => post.userId == query.userId)
      )
    }

    return Promise.resolve(postsDB);
  },
  findOne: <T extends { id?: number }>(query: T): Promise<Post> => {
    if (!query) {
      return Promise.reject('No query given');
    }
    return Promise.resolve(postsDB.find((p) => {
      if (!!query.id && query.id === p.id) {
        return true;
      }
      return false
    }));
  },
};
