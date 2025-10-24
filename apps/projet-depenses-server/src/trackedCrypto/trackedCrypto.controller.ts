import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TrackedCryptoService } from "./trackedCrypto.service";
import { TrackedCryptoControllerBase } from "./base/trackedCrypto.controller.base";

@swagger.ApiTags("trackedCryptos")
@common.Controller("trackedCryptos")
export class TrackedCryptoController extends TrackedCryptoControllerBase {
  constructor(
    protected readonly service: TrackedCryptoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
