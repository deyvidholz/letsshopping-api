import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Cart } from './Cart.entity';
import { CartProduct } from './CartProduct.entity';
import { Category } from './Category.entity';
import { Order } from './Order.entity';
import { ProductImage } from './ProductImage.entity';
import { ProductOption } from './ProductOption.entity';
import { ProductReview } from './ProductReview.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, length: 6 })
  code: string;

  @Column()
  name: string;

  @Column()
  shortDescription: string;

  @Column('text')
  description: string;

  @Column()
  mainImage: string;

  @Column()
  isActive: boolean;

  @Column({ default: 0 })
  stock: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => Category, (category) => category.products, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => ProductImage, (image) => image.product, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  images: ProductImage[];

  @OneToMany(() => ProductOption, (option) => option.product, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  options: ProductOption[];

  @OneToMany(() => ProductReview, (review) => review.product, {
    cascade: true,
    persistence: false,
  })
  @JoinTable()
  reviews: ProductReview[];

  @ManyToMany(() => Order, (order) => order.items)
  @JoinTable()
  orders: Order[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];
}