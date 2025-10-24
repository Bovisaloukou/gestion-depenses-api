 import { InputType, Field } from "@nestjs/graphql";
import { TrackedCryptoWhereUniqueInput } from "../../trackedCrypto/base/TrackedCryptoWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class TrackedCryptoUpdateManyWithoutUsersInput {
  @Field(() => [TrackedCryptoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [TrackedCryptoWhereUniqueInput],
  })
  connect?: Array<TrackedCryptoWhereUniqueInput>;

  @Field(() => [TrackedCryptoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [TrackedCryptoWhereUniqueInput],
  })
  disconnect?: Array<TrackedCryptoWhereUniqueInput>;

  @Field(() => [TrackedCryptoWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [TrackedCryptoWhereUniqueInput],
  })
  set?: Array<TrackedCryptoWhereUniqueInput>;
}

export { TrackedCryptoUpdateManyWithoutUsersInput as TrackedCryptoUpdateManyWithoutUsersInput };
