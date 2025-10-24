 import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TrackedCryptoWhereUniqueInput } from "./TrackedCryptoWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class TrackedCryptoFindUniqueArgs {
  @ApiProperty({
    required: true,
    type: () => TrackedCryptoWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TrackedCryptoWhereUniqueInput)
  @Field(() => TrackedCryptoWhereUniqueInput, { nullable: false })
  where!: TrackedCryptoWhereUniqueInput;
}

export { TrackedCryptoFindUniqueArgs as TrackedCryptoFindUniqueArgs };
