import { autoInjectable, container } from "tsyringe";
import {  DataSource, Repository } from "typeorm";
import { RegisterUserDto } from "../entity/DTO/user.dto";
import { Record } from "../entity/Record";
import { User } from "../entity/User";

@autoInjectable()
export default class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = container.resolve<DataSource>('PgDataSource').getRepository(User);

    }

    async getOneByEmail(email: string) {
      return await this.repository.findOneBy({email});
    }

    async create(user: RegisterUserDto) {
       return await this.repository.save({
             ...user
         })
    }


}