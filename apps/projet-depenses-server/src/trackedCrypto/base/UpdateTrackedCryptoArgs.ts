 import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TrackedCryptoWhereUniqueInput } from "./TrackedCryptoWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TrackedCryptoUpdateInput } from "./TrackedCryptoUpdateInput";

@ArgsType()
class UpdateTrackedCryptoArgs {
  @ApiProperty({
    required: true,
    type: () => TrackedCryptoWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TrackedCryptoWhereUniqueInput)
  @Field(() => TrackedCryptoWhereUniqueInput, { nullable: false })
  where!: TrackedCryptoWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => TrackedCryptoUpdateInput,
  })
  @ValidateNested()
  @Type(() => TrackedCryptoUpdateInput)
  @Field(() => TrackedCryptoUpdateInput, { nullable: false })
  data!: TrackedCryptoUpdateInput;
}

export { UpdateTrackedCryptoArgs as UpdateTrackedCryptoArgs };
