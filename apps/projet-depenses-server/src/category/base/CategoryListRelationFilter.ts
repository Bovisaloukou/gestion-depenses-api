import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryWhereInput } from "./CategoryWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class CategoryListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => CategoryWhereInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereInput)
  @IsOptional()
  @Field(() => CategoryWhereInput, {
    nullable: true,
  })
  every?: CategoryWhereInput;

  @ApiProperty({
    required: false,
    type: () => CategoryWhereInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereInput)
  @IsOptional()
  @Field(() => CategoryWhereInput, {
    nullable: true,
  })
  some?: CategoryWhereInput;

  @ApiProperty({
    required: false,
    type: () => CategoryWhereInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereInput)
  @IsOptional()
  @Field(() => CategoryWhereInput, {
    nullable: true,
  })
  none?: CategoryWhereInput;
}
export { CategoryListRelationFilter as CategoryListRelationFilter };
