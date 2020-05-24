import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterFieldAppointments1587477363915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tbAppointments', 'provider');
        await queryRunner.addColumn('tbAppointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('tbAppointments', new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbUsers',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbAppointments', 'AppointmentProvider');
        await queryRunner.dropColumn('tbAppointments', 'provider_id');
        await queryRunner.addColumn('tbAppointments', new TableColumn({
            name: 'provider',
            type: 'varchar',
        }));
    }

}
