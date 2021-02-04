import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from './user';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  apiId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  zipCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.cities, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  users: User[];
}
