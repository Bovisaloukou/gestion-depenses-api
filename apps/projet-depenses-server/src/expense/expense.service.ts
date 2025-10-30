import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ExpenseServiceBase } from "./base/expense.service.base";
import { ExpenseStatsDTO } from "./base/ExpenseStatsDTO";

@Injectable()
export class ExpenseService extends ExpenseServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async getExpenseStatistics(data: ExpenseStatsDTO) {
    const { startDate, endDate, categoryIds } = data;

    const where: any = {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    };

    if (categoryIds && categoryIds.length > 0) {
      where.categoryId = {
        in: categoryIds,
      };
    }

    const expenses = await this.prisma.expense.findMany({ where });

    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount.toNumber(), 0);
    const totalCount = expenses.length;

    const categoryGroups = await this.prisma.expense.groupBy({
      by: ['categoryId'],
      where,
      _sum: {
        amount: true,
      },
      _count: {
        _all: true,
      },
    });

    const categoryStats = await Promise.all(
      categoryGroups.map(async (group) => {
        let category = null;
        if (group.categoryId) {
          category = await this.prisma.category.findUnique({
            where: { id: group.categoryId },
          });
        }
        return {
          category: category || { name: "Uncategorized" },
          totalAmount: group._sum.amount?.toNumber() || 0,
          count: group._count._all,
        };
      })
    );

    return {
      totalAmount,
      totalCount,
      categoryStats,
    };
  }
}
