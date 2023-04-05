import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSymbol1680726139732 implements MigrationInterface {
  name = 'addSymbol1680726139732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "operation" ADD "symbol" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "symbol"`);
  }
}
