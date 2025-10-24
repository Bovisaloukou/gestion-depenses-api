import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ExpenseServiceBase } from "./base/expense.service.base";

@Injectable()
export class ExpenseService extends ExpenseServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
