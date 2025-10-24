import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TrackedCryptoService } from "./trackedCrypto.service";
import { TrackedCryptoControllerBase } from "./base/trackedCrypto.controller.base";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { TrackedCryptoFindManyArgs } from "./base/TrackedCryptoFindManyArgs";
import { UserInfo } from "../auth/UserInfo";
import { UserData } from "../auth/userData.decorator";
import { TrackedCrypto } from "./base/TrackedCrypto";
import { TrackedCryptoWhereUniqueInput } from "./base/TrackedCryptoWhereUniqueInput";
import { TrackedCryptoCreateInput } from "./base/TrackedCryptoCreateInput";
import { TrackedCryptoUpdateInput } from "./base/TrackedCryptoUpdateInput";
import * as errors from "../errors";
import { AclFilterResponseInterceptor } from "../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";
import { isRecordNotFoundError } from "../prisma.util";
import { ApiNestedQuery } from "../decorators/api-nested-query.decorator";

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

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: TrackedCrypto })
  @nestAccessControl.UseRoles({
    resource: "TrackedCrypto",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createTrackedCrypto(
    @common.Body() data: TrackedCryptoCreateInput,
    @UserData() userInfo: UserInfo
  ): Promise<TrackedCrypto> {
    return await this.service.createTrackedCrypto({
      data: {
        ...data,
        user: {
          connect: {
            id: userInfo.id,
          },
        },
      },
      select: {
        createdAt: true,
        id: true,
        tokenId: true,
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
  @swagger.ApiOkResponse({ type: [TrackedCrypto] })
  @ApiNestedQuery(TrackedCryptoFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "TrackedCrypto",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async trackedCryptos(
    @common.Req() request: Request,
    @UserData() userInfo: UserInfo
  ): Promise<TrackedCrypto[]> {
    const args = plainToClass(TrackedCryptoFindManyArgs, request.query);
    return this.service.trackedCryptos({
      ...args,
      where: {
        ...args.where,
        user: {
          id: userInfo.id,
        },
      },
      select: {
        createdAt: true,
        id: true,
        tokenId: true,
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
  @swagger.ApiOkResponse({ type: TrackedCrypto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "TrackedCrypto",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async trackedCrypto(
    @common.Param() params: TrackedCryptoWhereUniqueInput,
    @UserData() userInfo: UserInfo
  ): Promise<TrackedCrypto | null> {
    const result = await this.service.trackedCrypto({
      where: { id: params.id, user: { id: userInfo.id } },
      select: {
        createdAt: true,
        id: true,
        tokenId: true,
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
  @swagger.ApiOkResponse({ type: TrackedCrypto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "TrackedCrypto",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateTrackedCrypto(
    @common.Param() params: TrackedCryptoWhereUniqueInput,
    @common.Body() data: TrackedCryptoUpdateInput,
    @UserData() userInfo: UserInfo
  ): Promise<TrackedCrypto | null> {
    try {
      return await this.service.updateTrackedCrypto({
        where: { id: params.id, user: { id: userInfo.id } },
        data: {
          ...data,
          user: undefined,
        },
        select: {
          createdAt: true,
          id: true,
          tokenId: true,
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
  @swagger.ApiOkResponse({ type: TrackedCrypto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "TrackedCrypto",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteTrackedCrypto(
    @common.Param() params: TrackedCryptoWhereUniqueInput,
    @UserData() userInfo: UserInfo
  ): Promise<TrackedCrypto | null> {
    try {
      return await this.service.deleteTrackedCrypto({
        where: { id: params.id, user: { id: userInfo.id } },
        select: {
          createdAt: true,
          id: true,
          tokenId: true,
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
