import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ExpenseCreateInput } from "./ExpenseCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateExpenseArgs {
  @ApiProperty({
    required: true,
    type: () => ExpenseCreateInput,
  })
  @ValidateNested()
  @Type(() => ExpenseCreateInput)
  @Field(() => ExpenseCreateInput, { nullable: false })
  data!: ExpenseCreateInput;
}

export { CreateExpenseArgs as CreateExpenseArgs };
