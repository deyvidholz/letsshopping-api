import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ProductOption } from './product-option.entity';

@Entity({ name: 'product_option_values' })
export class ProductOptionValue {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  value: string;

  @Column({ nullable: true, default: 0 })
  price: number;

  @Column({ nullable: true })
  mainImage: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => ProductOption, (option) => option.values, {
    onDelete: 'CASCADE',
  })
  option: ProductOption;
}
