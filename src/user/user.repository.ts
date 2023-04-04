import { autoInjectable, container, inject } from "tsyringe";
import {  DataSource, Repository } from "typeorm";
import { RegisterUserDto } from "./user.dto";
import { Record } from "../record/record.entity";
import { User } from "./user.entity";
import { UserStatusEnum } from "../util/constants/userStatus.enum";

@autoInjectable()
export default class UserRepository {

    constructor(@inject('UserRepository') private readonly repository: Repository<User>) {}

    async getOneByEmail(email: string) {
      return await this.repository.findOneBy({email});
    }

    async create(user: RegisterUserDto) {
       return await this.repository.save({
             ...user,
             status: UserStatusEnum.ACTIVE
         })
    }


}