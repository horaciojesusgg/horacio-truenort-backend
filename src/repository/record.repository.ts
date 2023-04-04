import { autoInjectable, container } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Record } from "../entity/Record";
import ContactDto from "../entity/DTO/operation.dto";
import { User } from "../entity/User";
import RecordDTO from "../entity/DTO/record.dto";

@autoInjectable()
export default class RecordRepository {
    private repository: Repository<Record>;

    constructor() {
        this.repository = container.resolve<DataSource>('PgDataSource').getRepository(Record);
    }

    async getAll(user: User) {
        return await this.repository.findBy({userId: user.id});
    }

    async create(record: RecordDTO) {
       await this.repository.save({
            ...record,
        })
    }


}