import { ValidationRegex } from '../validator';

const productReviewValidationRegex: ValidationRegex[] = [
  {
    field: 'title',
    validations: [
      {
        regex: '^.{4,255}$',
        message: 'The field title must have 4 to 255 characters.',
      },
    ],
  },
  {
    field: 'rating',
    validations: [{ regex: '^[0-9]{1,2}$' }],
  },
  {
    field: 'description',
    required: false,
    validations: [
      {
        regex: '^.{4,255}$',
        message: 'The field description must have 4 to 255 characters.',
      },
    ],
  },
];

export default productReviewValidationRegex;
