import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ExpenseUpdateManyWithoutCategoriesInput } from "./ExpenseUpdateManyWithoutCategoriesInput";
import {
  ValidateNested,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";

@InputType()
class CategoryUpdateInput {
  @ApiProperty({
    required: false,
    type: () => ExpenseUpdateManyWithoutCategoriesInput,
  })
  @ValidateNested()
  @Type(() => ExpenseUpdateManyWithoutCategoriesInput)
  @IsOptional()
  @Field(() => ExpenseUpdateManyWithoutCategoriesInput, {
    nullable: true,
  })
  expenses?: ExpenseUpdateManyWithoutCategoriesInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  icon?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  user?: UserWhereUniqueInput | null;
}

export { CategoryUpdateInput as CategoryUpdateInput };
