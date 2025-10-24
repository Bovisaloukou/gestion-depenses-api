 import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ExpenseWhereInput } from "./ExpenseWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ExpenseListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => ExpenseWhereInput,
  })
  @ValidateNested()
  @Type(() => ExpenseWhereInput)
  @IsOptional()
  @Field(() => ExpenseWhereInput, {
    nullable: true,
  })
  every?: ExpenseWhereInput;

  @ApiProperty({
    required: false,
    type: () => ExpenseWhereInput,
  })
  @ValidateNested()
  @Type(() => ExpenseWhereInput)
  @IsOptional()
  @Field(() => ExpenseWhereInput, {
    nullable: true,
  })
  some?: ExpenseWhereInput;

  @ApiProperty({
    required: false,
    type: () => ExpenseWhereInput,
  })
  @ValidateNested()
  @Type(() => ExpenseWhereInput)
  @IsOptional()
  @Field(() => ExpenseWhereInput, {
    nullable: true,
  })
  none?: ExpenseWhereInput;
}
export { ExpenseListRelationFilter as ExpenseListRelationFilter };
