import { autoInjectable, container, inject } from 'tsyringe';
import {  Repository } from 'typeorm';
import { Record } from './record.entity';
import { User } from '../user/user.entity';
import RecordDTO from './record.dto';

@autoInjectable()
export default class RecordRepository {
  constructor(@inject('RecordRepository') private readonly repository: Repository<Record>) {}

  async getAll(user: User): Promise<Record[]> {
    return await this.repository.findBy({ userId: user.id });
  }

  async create(record: RecordDTO): Promise<Record> {
    return await this.repository.save({
      ...record,
    });
  }

  async findLatest(): Promise<Record | null> {
    return await this.repository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
