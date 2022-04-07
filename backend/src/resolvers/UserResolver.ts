import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { User } from "../models/User";

@Resolver()
export class UserResolver {
    private data: User[] = [];

    @Query(() => [User])
    async users() {
        return this.data;
    }

    @Mutation(() => User)
    async createUser(
        @Arg('name', { nullable: false, validate: true })
        name: string
    ) {
        const user = new User(name);
        this.data.push(user);
        return user;
    }

}