import { autoInjectable, inject } from "tsyringe";
import {  Repository } from "typeorm";
import { Operation } from "./operation.entity";
import { User } from "../user/user.entity";
import { OperationsEnum } from "../util/constants/operations.enum";

@autoInjectable()
export default class OperationRepository {

    constructor(@inject('OperationRepository') private readonly repository: Repository<Operation>) {}

    async save(operation: Operation, user: User) {
       return await this.repository.save({
            
        })
    }

    async patch(contactFile: Operation, user: User) {
        return await this.repository.save({})
     }

    async getById(id: string): Promise<Operation | null> {
        return await this.repository.findOneBy({id});
    }

    async getByType(type: OperationsEnum): Promise<Operation | null> {
        return await this.repository.findOneBy({type});
    }
}