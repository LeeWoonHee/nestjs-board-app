import { IsNotEmpty, IsString } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  status: BoardStatus;
}
