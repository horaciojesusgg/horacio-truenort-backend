import { autoInjectable, container } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Operation } from "../entity/Operation";
import { User } from "../entity/User";

@autoInjectable()
export default class OperationRepository {
    private repository: Repository<Operation>;

    constructor() {
        this.repository = container.resolve<DataSource>('PgDataSource').getRepository(Operation);

    }

    async save(contactFile: Operation, user: User) {
       return await this.repository.save({
            
        })
    }

    async patch(contactFile: Operation, user: User) {
        return await this.repository.save({})
     }

    async getById(id: string): Promise<Operation | null> {
        return await this.repository.findOneBy({id});
    }
}