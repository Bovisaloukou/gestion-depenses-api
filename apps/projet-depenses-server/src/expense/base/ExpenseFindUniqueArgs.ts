 import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ExpenseWhereUniqueInput } from "./ExpenseWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class ExpenseFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => ExpenseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ExpenseWhereUniqueInput)
  @Field(() => ExpenseWhereUniqueInput, { nullable: false })
  where!: ExpenseWhereUniqueInput;
}

export { ExpenseFindUniqueArgs as ExpenseFindUniqueArgs };
