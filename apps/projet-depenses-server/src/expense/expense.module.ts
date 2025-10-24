import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ExpenseModuleBase } from "./base/expense.module.base";
import { ExpenseService } from "./expense.service";
import { ExpenseController } from "./expense.controller";

@Module({
  imports: [ExpenseModuleBase, forwardRef(() => AuthModule)],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
