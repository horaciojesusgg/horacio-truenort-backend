import { autoInjectable, container, inject } from 'tsyringe';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { User } from '../user/user.entity';
import RecordDTO from './record.dto';
import PaginationParams from '../util/pagination.interface';

@autoInjectable()
export default class RecordRepository {
  constructor(@inject('RecordRepository') private readonly repository: Repository<Record>) {}

  async getAll(user: User, pagination: PaginationParams): Promise<[Record[], number]> {
    return await this.repository
      .createQueryBuilder('record')
      .where('record.userId = :userId', { userId: user.id })
      .orderBy('record.createdAt', 'DESC')
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .getManyAndCount();
  }

  async create(record: RecordDTO): Promise<Record> {
    return await this.repository.save({
      ...record,
    });
  }

  async findLatest(userId: string): Promise<Record | null> {
    return await this.repository
      .createQueryBuilder('record')
      .where('record.userId = :userId', { userId })
      .orderBy('record.createdAt', 'DESC')
      .getOne();
  }

  async delete(recordId: string, userId: string) {
    await this.repository
      .createQueryBuilder('record')
      .softDelete()
      .where('record.id = :id', { id: recordId })
      .execute();
  }
}
