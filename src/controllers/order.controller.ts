import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import decode from 'jwt-decode';

import unprocessableEntity from '../errors/http/unprocessableEntity.error';
import internalServerError from '../errors/http/internalServer.error';
import notFound from '../errors/http/notFound.error';
import unauthorized from '../errors/http/unauthorized';
import { Coupon } from '../entity/Coupon';
import { Order } from '../entity/Order';
import { getUserData } from '../helpers/auth.helper';
import { Cart } from '../entity/Cart';
import { User } from '../entity/User';
import { OrderAddress } from '../entity/OrderAddress';
import { Address } from '../entity/Address';
import { CartProduct } from '../entity/CartProduct';

class OrderController {
  private static getRespository() {
    return getConnection().getRepository(Order);
  }

  public static async create(req: Request, res: Response) {
    const orderRepository = OrderController.getRespository();
    const cartRepository = getConnection().getRepository(Cart);
    const cartProductRepository = getConnection().getRepository(CartProduct);
    const userRepository = getConnection().getRepository(User);
    const addressRepository = getConnection().getRepository(Address);
    const orderAddressRepository = getConnection().getRepository(OrderAddress);

    const userData = getUserData(req.headers.authorization);

    if (!req.body.shippingAddressId)
      return unprocessableEntity({
        message: 'Shipping address ID is required.',
      }).send(res);

    const user = await userRepository.findOne(userData.id, {
      relations: ['addresses'],
    });

    const userSentAddress = await addressRepository.findOne({
      where: { id: req.body.shippingAddressId, user: { id: userData.id } },
    });

    if (!userSentAddress)
      return unprocessableEntity({
        message: 'Shipping address is required.',
      }).send(res);

    const shippingAddress = orderAddressRepository.create(userSentAddress);

    const cart = await cartRepository.findOne({
      where: { user: { id: userData.id } },
    });

    if (!cart.cartProducts.length) {
      return unprocessableEntity({
        message: 'You cannot create an order without items in your cart.',
      }).send(res);
    }

    const order = orderRepository.create(req.body as Order);
    order.totalValue = cart.total;
    order.subtotal = cart.subtotal;
    order.paymentMethod = 0;
    order.items = [...cart.cartProducts.map((cp) => cp.product)];
    order.user = user;
    order.address = user.addresses.find((a) => a.isMain);
    order.shippingAddress = shippingAddress;

    // @TODO: calculate freight fee
    order.freightValue = 15;

    // @TODO: try to charge then set status
    order.status = 0;

    // @TODO: // @TODO: try to charge then set order events
    // order.events = OrderEvent[]

    if (!order.address)
      return unprocessableEntity({
        message: 'Shipping address is required.',
      }).send(res);

    await orderRepository.save(order, { reload: true });
    await cartProductRepository.remove(cart.cartProducts);

    cart.total = 0;
    cart.cartProducts = [];
    cart.subtotal = 0;
    await cartRepository.save(cart);

    return res
      .status(201)
      .json({ message: 'Order created successfully.', order });
  }

  public static async get(req: Request, res: Response) {
    const orderRepository = OrderController.getRespository();
    const userData = getUserData(req.headers.authorization);

    const order = await orderRepository.findOne({
      where: { id: req.params.id, user: { id: userData.id } },
    });

    if (!order) {
      return notFound({
        message: 'Order not found.',
      }).send(res);
    }

    return res.status(200).json(order);
  }

  public static async getAll(req: Request, res: Response) {
    const orderRepository = OrderController.getRespository();
    const userData = getUserData(req.headers.authorization);

    const orders = await orderRepository.find({
      where: { user: { id: userData.id } },
      order: { id: 'DESC' },
    });

    return res.status(200).json(orders);
  }
}

export default OrderController;