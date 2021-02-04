import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from './user';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  apiId: number;

  @Column()
  name: string;

  @Column()
  zipCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.cities)
  users: User[];
}
