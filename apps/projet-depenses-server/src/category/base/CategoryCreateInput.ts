import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ExpenseCreateNestedManyWithoutCategoriesInput } from "./ExpenseCreateNestedManyWithoutCategoriesInput";
import {
  ValidateNested,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";

@InputType()
class CategoryCreateInput {
  @ApiProperty({
    required: false,
    type: () => ExpenseCreateNestedManyWithoutCategoriesInput,
  })
  @ValidateNested()
  @Type(() => ExpenseCreateNestedManyWithoutCategoriesInput)
  @IsOptional()
  @Field(() => ExpenseCreateNestedManyWithoutCategoriesInput, {
    nullable: true,
  })
  expenses?: ExpenseCreateNestedManyWithoutCategoriesInput;

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
    required: true,
    type: String,
  })
  @IsString()
  @MaxLength(1000)
  @Field(() => String)
  name!: string;

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

export { CategoryCreateInput as CategoryCreateInput };
