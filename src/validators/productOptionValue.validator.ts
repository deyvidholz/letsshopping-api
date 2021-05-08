import { CreateProductOptionValueDto } from '../dto/productOptionValue.dto';
import productOptionValueValidationRegex from './validationRegex/productOptionValue.validationRegex';

import {
  Validation,
  ValidationMessages,
  Validator,
  ValidationRegex,
} from './validator';

export default class ProductOptionValueValidator extends Validator {
  public data: CreateProductOptionValueDto;
  public validationErrors: ValidationMessages[] | null = null;

  protected validationRegex: ValidationRegex[] = productOptionValueValidationRegex;

  constructor(
    productOptionValue: CreateProductOptionValueDto,
    updating: boolean = false,
  ) {
    super();
    this.updating = updating;
    this.data = productOptionValue;
  }

  public validate(): Validation {
    super.validate();

    return {
      hasErrors: !!this.validationErrors.length,
      errors: this.validationErrors,
    };
  }
}
