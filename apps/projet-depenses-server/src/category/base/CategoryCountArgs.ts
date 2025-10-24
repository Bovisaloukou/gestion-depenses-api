import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryWhereInput } from "./CategoryWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class CategoryCountArgs {
  @ApiProperty({
    required: false,
    type: () => CategoryWhereInput,
  })
  @Field(() => CategoryWhereInput, { nullable: true })
  @Type(() => CategoryWhereInput)
  where?: CategoryWhereInput;
}

export { CategoryCountArgs as CategoryCountArgs };
