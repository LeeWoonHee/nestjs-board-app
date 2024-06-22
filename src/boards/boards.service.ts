import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './\bdto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardByUser(user: User) {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.boardRepository.findOne({ where: { id } });
    if (!foundBoard) {
      throw new NotFoundException(`Can't find board width id : ${id}`);
    }
    return foundBoard;
  }
  async createBoard(createBoard: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.saveBoard(createBoard, user);
  }

  async deleteBoard(id: number, user: User): Promise<Board[]> {
    const deleteBoard = await this.boardRepository.delete({ id, user });
    if (deleteBoard.affected === 0) {
      throw new NotFoundException(`Can't find board width id : ${id}`);
    }
    const allBoard = await this.getBoardByUser(user);
    return allBoard;
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
