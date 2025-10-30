import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsDateString, IsArray, IsString } from "class-validator";

export class ExpenseStatsDTO {
  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDateString()
  startDate!: string;

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDateString()
  endDate!: string;

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];
}
