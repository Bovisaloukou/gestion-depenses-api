import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TrackedCryptoModuleBase } from "./base/trackedCrypto.module.base";
import { TrackedCryptoService } from "./trackedCrypto.service";
import { TrackedCryptoController } from "./trackedCrypto.controller";

@Module({
  imports: [TrackedCryptoModuleBase, forwardRef(() => AuthModule)],
  controllers: [TrackedCryptoController],
  providers: [TrackedCryptoService],
  exports: [TrackedCryptoService],
})
export class TrackedCryptoModule {}
