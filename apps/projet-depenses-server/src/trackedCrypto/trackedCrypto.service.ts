import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TrackedCryptoServiceBase } from "./base/trackedCrypto.service.base";

@Injectable()
export class TrackedCryptoService extends TrackedCryptoServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
