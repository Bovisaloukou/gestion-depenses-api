 import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TrackedCryptoWhereInput } from "./TrackedCryptoWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class TrackedCryptoListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => TrackedCryptoWhereInput,
  })
  @ValidateNested()
  @Type(() => TrackedCryptoWhereInput)
  @IsOptional()
  @Field(() => TrackedCryptoWhereInput, {
    nullable: true,
  })
  every?: TrackedCryptoWhereInput;

  @ApiProperty({
    required: false,
    type: () => TrackedCryptoWhereInput,
  })
  @ValidateNested()
  @Type(() => TrackedCryptoWhereInput)
  @IsOptional()
  @Field(() => TrackedCryptoWhereInput, {
    nullable: true,
  })
  some?: TrackedCryptoWhereInput;

  @ApiProperty({
    required: false,
    type: () => TrackedCryptoWhereInput,
  })
  @ValidateNested()
  @Type(() => TrackedCryptoWhereInput)
  @IsOptional()
  @Field(() => TrackedCryptoWhereInput, {
    nullable: true,
  })
  none?: TrackedCryptoWhereInput;
}
export { TrackedCryptoListRelationFilter as TrackedCryptoListRelationFilter };
