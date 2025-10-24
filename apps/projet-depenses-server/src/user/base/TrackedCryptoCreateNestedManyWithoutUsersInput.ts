 import { InputType, Field } from "@nestjs/graphql";
import { TrackedCryptoWhereUniqueInput } from "../../trackedCrypto/base/TrackedCryptoWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class TrackedCryptoCreateNestedManyWithoutUsersInput {
  @Field(() => [TrackedCryptoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [TrackedCryptoWhereUniqueInput],
  })
  connect?: Array<TrackedCryptoWhereUniqueInput>;
}

export { TrackedCryptoCreateNestedManyWithoutUsersInput as TrackedCryptoCreateNestedManyWithoutUsersInput };
