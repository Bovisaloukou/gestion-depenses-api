 import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { ExpenseService } from "../expense.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ExpenseCreateInput } from "./ExpenseCreateInput";
import { Expense } from "./Expense";
import { ExpenseFindManyArgs } from "./ExpenseFindManyArgs";
import { ExpenseWhereUniqueInput } from "./ExpenseWhereUniqueInput";
import { ExpenseUpdateInput } from "./ExpenseUpdateInput";
import { UserInfo } from "../../auth/UserInfo";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ExpenseControllerBase {
  constructor(
    protected readonly service: ExpenseService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
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
    @common.Session() userInfo: UserInfo
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
          connect: { id: userInfo.id },
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
    @common.Session() userInfo: UserInfo
  ): Promise<Expense[]> {
    const args = plainToClass(ExpenseFindManyArgs, request.query);
    return this.service.expenses({
      ...args,
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
    @common.Session() userInfo: UserInfo
  ): Promise<Expense | null> {
    const result = await this.service.expense({
      where: params,
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
    @common.Session() userInfo: UserInfo
  ): Promise<Expense | null> {
    try {
      return await this.service.updateExpense({
        where: params,
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
    @common.Session() userInfo: UserInfo
  ): Promise<Expense | null> {
    try {
      return await this.service.deleteExpense({
        where: params,
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
