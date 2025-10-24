import { PrismaService } from "../../prisma/prisma.service";
import {
  Prisma,
  Category as PrismaCategory,
  Expense as PrismaExpense,
} from "@prisma/client";

export class CategoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(args: Omit<Prisma.CategoryCountArgs, "select">): Promise<number> {
    return this.prisma.category.count(args);
  }

  async categories(
    args: Prisma.CategoryFindManyArgs,
    userId: string
  ): Promise<PrismaCategory[]> {
    return this.prisma.category.findMany({
      ...args,
      where: { ...args.where, userId: userId },
    });
  }
  async category(
    args: Prisma.CategoryFindUniqueArgs,
    userId: string
  ): Promise<PrismaCategory | null> {
    return this.prisma.category.findUnique({
      ...args,
      where: { ...args.where, userId: userId },
    });
  }
  async createCategory(
    args: Prisma.CategoryCreateArgs
  ): Promise<PrismaCategory> {
    return this.prisma.category.create(args);
  }
  async updateCategory(
    args: Prisma.CategoryUpdateArgs,
    userId: string
  ): Promise<PrismaCategory> {
    return this.prisma.category.update({
      ...args,
      where: { ...args.where, userId: userId },
    });
  }
  async deleteCategory(
    args: Prisma.CategoryDeleteArgs,
    userId: string
  ): Promise<PrismaCategory> {
    return this.prisma.category.delete({
      ...args,
      where: { ...args.where, userId: userId },
    });
  }

  async findExpenses(
    parentId: string,
    args: Prisma.ExpenseFindManyArgs,
    userId: string
  ): Promise<PrismaExpense[]> {
    return this.prisma.category
      .findUniqueOrThrow({
        where: { id: parentId, userId: userId },
      })
      .expenses(args);
  }
}
