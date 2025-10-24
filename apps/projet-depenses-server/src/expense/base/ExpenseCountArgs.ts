 import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ExpenseWhereInput } from "./ExpenseWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class ExpenseCountArgs {
  @ApiProperty({
    required: false,
    type: () => ExpenseWhereInput,
  })
  @Field(() => ExpenseWhereInput, { nullable: true })
  @Type(() => ExpenseWhereInput)
  where?: ExpenseWhereInput;
}

export { ExpenseCountArgs as ExpenseCountArgs };
