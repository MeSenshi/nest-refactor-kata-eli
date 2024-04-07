import { Get, Controller, Param, Body, Put } from "@nestjs/common";
import { db } from "./db";

@Controller("posts")
export class PostsController {
  constructor() {
  }

  @Get(":id")
  async getPost(@Param() params: any) {
    return await db.users.findOne({id: params.id});
  }

  @Get()
  async getPosts() {
    return await db.users.find();
  }

  @Put("editPost")
  async editPost(@Body() body: any) {
    const post = await db.posts.findOne(body.postId);
    if (body.user.roles.includes(1) || post.userId === body.user.id) {
      console.log("edited post with id " + body.postId);
      return true;
    }
    console.log("could not edit post");
    return false;
  }
}
