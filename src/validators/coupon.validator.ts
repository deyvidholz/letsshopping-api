import validator from 'validator';
import { CreateCouponDto, UpdateCouponDto } from '../dto/coupon.dto';
import couponValidationRegex from './validationRegex/coupon.validationRegex';

import {
  Validation,
  ValidationMessages,
  Validator,
  ValidationRegex,
} from './validator';

export default class CouponValidator extends Validator {
  public data: CreateCouponDto | UpdateCouponDto;
  public validationErrors: ValidationMessages[] | null = null;

  protected validationRegex: ValidationRegex[] = couponValidationRegex;

  constructor(
    coupon: CreateCouponDto | UpdateCouponDto,
    updating: boolean = false,
  ) {
    super();
    this.updating = updating;
    this.data = coupon;
  }

  public validate(): Validation {
    super.validate();

    if (!validator.isBoolean(String(this.data.isActive)))
      this.addError('isActive');

    return {
      hasErrors: !!this.validationErrors.length,
      errors: this.validationErrors,
    };
  }
}
