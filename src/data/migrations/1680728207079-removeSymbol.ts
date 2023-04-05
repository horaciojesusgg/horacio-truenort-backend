import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeSymbol1680728207079 implements MigrationInterface {
  name = 'removeSymbol1680728207079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "symbol"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "operation" ADD "symbol" character varying NOT NULL`);
  }
}
