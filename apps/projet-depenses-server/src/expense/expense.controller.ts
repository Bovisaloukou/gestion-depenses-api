import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ExpenseService } from "./expense.service";
import { ExpenseControllerBase } from "./base/expense.controller.base";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ExpenseFindManyArgs } from "./base/ExpenseFindManyArgs";
import { UserInfo } from "../auth/UserInfo";
import { UserData } from "../auth/userData.decorator";
import { Expense } from "./base/Expense";
import { ExpenseWhereUniqueInput } from "./base/ExpenseWhereUniqueInput";
import { ExpenseCreateInput } from "./base/ExpenseCreateInput";
import { ExpenseUpdateInput } from "./base/ExpenseUpdateInput";
import * as errors from "../errors";
import { AclFilterResponseInterceptor } from "../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";
import { isRecordNotFoundError } from "../prisma.util";
import { ApiNestedQuery } from "../decorators/api-nested-query.decorator";

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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Expense })
  @nestAccessControl.UseRoles({
    resource: "Expense",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createExpense(
    @common.Body() data: ExpenseCreateInput,
    @UserData() userInfo: UserInfo
  ): Promise<Expense> {
    return await this.service.createExpense({
      data: {
        ...data,
        category: data.category
          ? {
              connect: data.category,
            }
          : undefined,
        user: {
          connect: {
            id: userInfo.id,
          },
        },
      },
      select: {
        amount: true,
        category: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        date: true,
        description: true,
        id: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Expense] })
  @ApiNestedQuery(ExpenseFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Expense",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async expenses(
    @common.Req() request: Request,
    @UserData() userInfo: UserInfo
  ): Promise<Expense[]> {
    const args = plainToClass(ExpenseFindManyArgs, request.query);
    return this.service.expenses({
      ...args,
      where: {
        ...args.where,
        user: {
          id: userInfo.id,
        },
      },
      select: {
        amount: true,
        category: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        date: true,
        description: true,
        id: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Expense })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Expense",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async expense(
    @common.Param() params: ExpenseWhereUniqueInput,
    @UserData() userInfo: UserInfo
  ): Promise<Expense | null> {
    const result = await this.service.expense({
      where: { id: params.id, user: { id: userInfo.id } },
      select: {
        amount: true,
        category: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        date: true,
        description: true,
        id: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Expense })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Expense",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateExpense(
    @common.Param() params: ExpenseWhereUniqueInput,
    @common.Body() data: ExpenseUpdateInput,
    @UserData() userInfo: UserInfo
  ): Promise<Expense | null> {
    try {
      return await this.service.updateExpense({
        where: { id: params.id, user: { id: userInfo.id } },
        data: {
          ...data,
          user: undefined,
          category: data.category
            ? {
                connect: data.category,
              }
            : undefined,
        },
        select: {
          amount: true,
          category: {
            select: {
              id: true,
            },
          },
          createdAt: true,
          date: true,
          description: true,
          id: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Expense })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Expense",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteExpense(
    @common.Param() params: ExpenseWhereUniqueInput,
    @UserData() userInfo: UserInfo
  ): Promise<Expense | null> {
    try {
      return await this.service.deleteExpense({
        where: { id: params.id, user: { id: userInfo.id } },
        select: {
          amount: true,
          category: {
            select: {
              id: true,
            },
          },
          createdAt: true,
          date: true,
          description: true,
          id: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
