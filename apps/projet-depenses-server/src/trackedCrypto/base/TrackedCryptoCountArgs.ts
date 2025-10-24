 import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TrackedCryptoWhereInput } from "./TrackedCryptoWhereInput";
import { Type } from "class-transformer";

@ArgsType()
class TrackedCryptoCountArgs {
  @ApiProperty({
    required: false,
    type: () => TrackedCryptoWhereInput,
  })
  @Field(() => TrackedCryptoWhereInput, { nullable: true })
  @Type(() => TrackedCryptoWhereInput)
  where?: TrackedCryptoWhereInput;
}

export { TrackedCryptoCountArgs as TrackedCryptoCountArgs };
