import { autoInjectable } from 'tsyringe';
import { User } from '../../user/user.entity';
import RecordRepository from '../record.repository';

@autoInjectable()
export default class GetAllRecordsQuery {
  constructor(private readonly recordRepository: RecordRepository) {}

  public async execute(user: User) {
    return await this.recordRepository.getAll(user);
  }
}
