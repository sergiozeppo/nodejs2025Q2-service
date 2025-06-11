import {
  ValueTransformer,
  PrimaryGeneratedColumn,
  Entity,
  Column,
} from 'typeorm';

const bigintTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
};

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'bigint', transformer: bigintTransformer })
  createdAt: number;

  @Column({ type: 'bigint', transformer: bigintTransformer })
  updatedAt: number;
}
