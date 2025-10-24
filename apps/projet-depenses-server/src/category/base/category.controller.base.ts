import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { UserData } from "../../auth/userData.decorator";
import { UserInfo } from "../../auth/UserInfo";
import { CategoryService } from "../category.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { CategoryCreateInput } from "./CategoryCreateInput";
import { Category } from "./Category";
import { CategoryFindManyArgs } from "./CategoryFindManyArgs";
import { CategoryWhereUniqueInput } from "./CategoryWhereUniqueInput";
import { CategoryUpdateInput } from "./CategoryUpdateInput";
import { ExpenseFindManyArgs } from "../../expense/base/ExpenseFindManyArgs";
import { Expense } from "../../expense/base/Expense";
import { ExpenseWhereUniqueInput } from "../../expense/base/ExpenseWhereUniqueInput";
 

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class CategoryControllerBase {
  constructor(
    protected readonly service: CategoryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Category })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createCategory(
    @common.Body() data: CategoryCreateInput,
    @UserData() userInfo: UserInfo
  ): Promise<Category> {
    return await this.service.createCategory({
      data: {
        ...data,
        user: { connect: { id: userInfo.id } },
      },
      select: {
        createdAt: true,
        icon: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Category] })
  @ApiNestedQuery(CategoryFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async categories(
    @common.Req() request: Request,
    @UserData() userInfo: UserInfo
  ): Promise<Category[]> {
    const args = plainToClass(CategoryFindManyArgs, request.query);
    return this.service.categories(
      {
        ...args,
        where: {
          ...args.where,
        },
      },
      userInfo.id,
    );
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Category })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async category(
    @common.Param() params: CategoryWhereUniqueInput,
    @UserData() userInfo: UserInfo
  ): Promise<Category | null> {
    const result = await this.service.category(
      {
        where: { id: params.id },
        select: {
          createdAt: true,
          icon: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      },
      userInfo.id,
    );
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Category })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateCategory(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() data: CategoryUpdateInput,
    @UserData() userInfo: UserInfo
  ): Promise<Category | null> {
    try {
      const { user, ...rest } = data;

      return await this.service.updateCategory(
        {
          where: { id: params.id },
          data: {
            ...rest,
            ...(user && { user: { connect: { id: user.id } } }),
            ...(user === null && { user: { disconnect: true } }),
          },
          select: {
            createdAt: true,
            icon: true,
            id: true,
            name: true,
            updatedAt: true,
          },
        },
        userInfo.id,
      );
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
  @swagger.ApiOkResponse({ type: Category })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteCategory(
    @common.Param() params: CategoryWhereUniqueInput,
    @UserData() userInfo: UserInfo
  ): Promise<Category | null> {
    try {
      return await this.service.deleteCategory(
        {
          where: { id: params.id },
          select: {
            createdAt: true,
            icon: true,
            id: true,
            name: true,
            updatedAt: true,
          },
        },
        userInfo.id,
      );
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/expenses")
  @ApiNestedQuery(ExpenseFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Expense",
    action: "read",
    possession: "any",
  })
  async findExpenses(
    @common.Req() request: Request,
    @common.Param() params: CategoryWhereUniqueInput,
    @UserData() userInfo: UserInfo
  ): Promise<Expense[]> {
    const query = plainToClass(ExpenseFindManyArgs, request.query);
    const results = await this.service.findExpenses(
      params.id,
      {
        ...query,
        where: {
          ...query.where,
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
      },
      userInfo.id,
    );
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/expenses")
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  async connectExpenses(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() body: ExpenseWhereUniqueInput[],
    @UserData() userInfo: UserInfo
  ): Promise<void> {
    await this.service.updateCategory(
      {
        where: { id: params.id },
        data: {
          expenses: {
            connect: body.map((item: any) => ({ id: item.id })),
          },
        },
        select: { id: true },
      },
      userInfo.id,
    );
  }

  @common.Patch("/:id/expenses")
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  async updateExpenses(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() body: ExpenseWhereUniqueInput[],
    @UserData() userInfo: UserInfo
  ): Promise<void> {
    await this.service.updateCategory(
      {
        where: { id: params.id },
        data: {
          expenses: {
            set: body.map((item: any) => ({ id: item.id })),
          },
        },
        select: { id: true },
      },
      userInfo.id,
    );
  }

  @common.Delete("/:id/expenses")
  @nestAccessControl.UseRoles({
    resource: "Category",
    action: "update",
    possession: "any",
  })
  async disconnectExpenses(
    @common.Param() params: CategoryWhereUniqueInput,
    @common.Body() body: ExpenseWhereUniqueInput[],
    @UserData() userInfo: UserInfo
  ): Promise<void> {
    const data = {
      expenses: {
        disconnect: body,
      },
    };
    await this.service.updateCategory(
      {
        where: { id: params.id },
        data,
        select: { id: true },
      },
      userInfo.id,
    );
  }
}