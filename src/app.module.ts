import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { PostsController } from "./posts.controller";

@Module({
  imports: [],
  controllers: [PostsController, UsersController],
  providers: []
})
export class AppModule {
}
