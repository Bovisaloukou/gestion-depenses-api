import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryWhereUniqueInput } from "./CategoryWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CategoryUpdateInput } from "./CategoryUpdateInput";

@ArgsType()
class UpdateCategoryArgs {
  @ApiProperty({
    required: true,
    type: () => CategoryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereUniqueInput)
  @Field(() => CategoryWhereUniqueInput, { nullable: false })
  where!: CategoryWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => CategoryUpdateInput,
  })
  @ValidateNested()
  @Type(() => CategoryUpdateInput)
  @Field(() => CategoryUpdateInput, { nullable: false })
  data!: CategoryUpdateInput;
}

export { UpdateCategoryArgs as UpdateCategoryArgs };
