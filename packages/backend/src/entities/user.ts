import { IsEmail, MinLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  BaseEntity,
} from 'typeorm';
import { City } from './city';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MinLength(3)
  username: string;

  @Column({ select: false })
  @MinLength(5)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => City, (city) => city.users)
  cities: City[];
}
