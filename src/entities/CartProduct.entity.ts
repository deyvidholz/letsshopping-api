import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  AfterInsert,
  BeforeUpdate,
  getConnection,
  AfterUpdate,
} from 'typeorm';
import { calculateTotal } from '../helpers/cart.helper';
import { Cart } from './Cart.entity';
import { Product } from './Product.entity';

@Entity({ name: 'cart_product' })
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  cartId?: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cartProducts, { eager: true })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  @JoinColumn()
  cart: Cart;

  @AfterInsert()
  public setCartId() {
    if (this.cartId) this.cartId = this.cart.id;
  }
}