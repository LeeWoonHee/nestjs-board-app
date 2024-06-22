import { PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = new Set([BoardStatus.PRIVATE, BoardStatus.PUBLIC]);

  transform(value: any): string {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new Error(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any): boolean {
    return this.StatusOptions.has(status);
  }
}
