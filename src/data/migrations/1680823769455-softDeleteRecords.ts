import { MigrationInterface, QueryRunner } from 'typeorm';

export class softDeleteRecords1680823769455 implements MigrationInterface {
  name = 'softDeleteRecords1680823769455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "record" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "record" DROP COLUMN "deletedAt"`);
  }
}
