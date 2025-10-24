import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryCreateInput } from "./CategoryCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateCategoryArgs {
  @ApiProperty({
    required: true,
    type: () => CategoryCreateInput,
  })
  @ValidateNested()
  @Type(() => CategoryCreateInput)
  @Field(() => CategoryCreateInput, { nullable: false })
  data!: CategoryCreateInput;
}

export { CreateCategoryArgs as CreateCategoryArgs };
