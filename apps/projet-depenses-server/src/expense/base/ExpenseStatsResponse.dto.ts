import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../category/base/Category";

class CategoryStat {
  @ApiProperty({ type: () => Category })
  category!: Category | { name: string };

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  count!: number;
}

export class ExpenseStatsResponseDto {
  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  totalCount!: number;

  @ApiProperty({ type: () => [CategoryStat] })
  categoryStats!: CategoryStat[];
}
