import { Get, Controller, Param, Post, Body } from "@nestjs/common";
import { db } from "./db";
import { User } from "./model/user.interface";

@Controller("users")
export class UsersController {
  constructor() {
  }

  @Get(":id")
  async getUser(@Param() params: any) {
    return await db.users.findOne(params.id);
  }

  @Get()
  async getAllUsers() {
    return await db.users.find();
  }

  @Post("roles")
  async getUsersByRoles(@Body() body: Pick<User, 'roles'>) {
    if ( !(body.roles instanceof Array)) {
      throw "roles must be an array!";
    }
    return  await db.users.find({ $in: { roles: body.roles } });
  }

  @Get(":id/posts")
  async getUserPosts(@Param() params: Pick<User, 'id'>) {

    const { user } = await db.users.findOne({id: parseInt(params.id.toString())}).populate("posts");
    return user.posts;
  }
}
