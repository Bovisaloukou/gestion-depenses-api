import { InputType, Field } from "@nestjs/graphql";
import { ExpenseWhereUniqueInput } from "../../expense/base/ExpenseWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class ExpenseCreateNestedManyWithoutCategoriesInput {
  @Field(() => [ExpenseWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [ExpenseWhereUniqueInput],
  })
  connect?: Array<ExpenseWhereUniqueInput>;
}

export { ExpenseCreateNestedManyWithoutCategoriesInput as ExpenseCreateNestedManyWithoutCategoriesInput };
