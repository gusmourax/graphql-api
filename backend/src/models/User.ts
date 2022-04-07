import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
export class User {
    @Field(() => ID)
    readonly id: string;

    @Field()
    name: string;

    constructor(name: string) {
        if (!this.id) this.id = uuidv4();
        this.name = name;
    }
}