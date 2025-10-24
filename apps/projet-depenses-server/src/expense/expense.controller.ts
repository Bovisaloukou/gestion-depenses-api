import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ExpenseService } from "./expense.service";
import { ExpenseControllerBase } from "./base/expense.controller.base";

@swagger.ApiTags("expenses")
@common.Controller("expenses")
export class ExpenseController extends ExpenseControllerBase {
  constructor(
    protected readonly service: ExpenseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
