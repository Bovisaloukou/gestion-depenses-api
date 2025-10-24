import { InputType, Field } from "@nestjs/graphql";
import { ExpenseWhereUniqueInput } from "../../expense/base/ExpenseWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ExpenseUpdateManyWithoutCategoriesInput {
  @Field(() => [ExpenseWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ExpenseWhereUniqueInput],
  })
  connect?: Array<ExpenseWhereUniqueInput>;

  @Field(() => [ExpenseWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ExpenseWhereUniqueInput],
  })
  disconnect?: Array<ExpenseWhereUniqueInput>;

  @Field(() => [ExpenseWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ExpenseWhereUniqueInput],
  })
  set?: Array<ExpenseWhereUniqueInput>;
}

export { ExpenseUpdateManyWithoutCategoriesInput as ExpenseUpdateManyWithoutCategoriesInput };
