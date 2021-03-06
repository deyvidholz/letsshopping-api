import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';
import { ShippingEvent } from './shipping-event.entity';

@Entity({ name: 'shippings' })
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
    comment:
      '0: Created, 1: Preparing, 2: In Route, 3: Delivered, 4: Cancelled',
  })
  status: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToOne(() => Order, (order) => order.shipping)
  @JoinColumn()
  order: Order;

  @OneToMany(() => ShippingEvent, (shippingEvent) => shippingEvent.shipping, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  events: ShippingEvent[];
}
