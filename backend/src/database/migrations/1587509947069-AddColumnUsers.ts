import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnUsers1587509947069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tbUsers', new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tbUsers', 'avatar');
    }

}
