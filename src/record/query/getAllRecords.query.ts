import { autoInjectable } from 'tsyringe';
import { User } from '../../user/user.entity';
import PaginationParams from '../../util/pagination.interface';
import RecordRepository from '../record.repository';

@autoInjectable()
export default class GetAllRecordsQuery {
  constructor(private readonly recordRepository: RecordRepository) {}

  public async execute(user: User, pagination: PaginationParams) {
    return await this.recordRepository.getAll(user, pagination);
  }
}
