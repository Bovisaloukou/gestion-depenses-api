 import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TrackedCryptoCreateInput } from "./TrackedCryptoCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateTrackedCryptoArgs {
  @ApiProperty({
    required: true,
    type: () => TrackedCryptoCreateInput,
  })
  @ValidateNested()
  @Type(() => TrackedCryptoCreateInput)
  @Field(() => TrackedCryptoCreateInput, { nullable: false })
  data!: TrackedCryptoCreateInput;
}

export { CreateTrackedCryptoArgs as CreateTrackedCryptoArgs };
