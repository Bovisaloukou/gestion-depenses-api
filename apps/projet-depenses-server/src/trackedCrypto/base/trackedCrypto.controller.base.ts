 import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { TrackedCryptoService } from "../trackedCrypto.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { TrackedCryptoCreateInput } from "./TrackedCryptoCreateInput";
import { TrackedCrypto } from "./TrackedCrypto";
import { TrackedCryptoFindManyArgs } from "./TrackedCryptoFindManyArgs";
import { TrackedCryptoWhereUniqueInput } from "./TrackedCryptoWhereUniqueInput";
import { TrackedCryptoUpdateInput } from "./TrackedCryptoUpdateInput";
import { UserInfo } from "../../auth/UserInfo";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class TrackedCryptoControllerBase {
  constructor(
    protected readonly service: TrackedCryptoService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
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
    @common.Session() userInfo: UserInfo
  ): Promise<TrackedCrypto> {
    return await this.service.createTrackedCrypto({
      data: {
        ...data,

        user: {
          connect: { id: userInfo.id },
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
    @common.Session() userInfo: UserInfo
  ): Promise<TrackedCrypto[]> {
    const args = plainToClass(TrackedCryptoFindManyArgs, request.query);
    return this.service.trackedCryptos({
      ...args,
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
    @common.Session() userInfo: UserInfo
  ): Promise<TrackedCrypto | null> {
    const result = await this.service.trackedCrypto({
      where: params,
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
    @common.Session() userInfo: UserInfo
  ): Promise<TrackedCrypto | null> {
    try {
      return await this.service.updateTrackedCrypto({
        where: params,
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
    @common.Session() userInfo: UserInfo
  ): Promise<TrackedCrypto | null> {
    try {
      return await this.service.deleteTrackedCrypto({
        where: params,
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
