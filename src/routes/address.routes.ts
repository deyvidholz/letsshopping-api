import express from 'express';

import AddressController from '../controllers/address.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import AddressValidatorMiddleware from '../middlewares/validators/address-validator.middleware';

const router = express.Router();

router.get('/all', AuthMiddleware, AddressController.getAll);

router.delete(
  '/:id',
  AuthMiddleware,
  AddressValidatorMiddleware.delete,
  AddressController.delete,
);

router.get(
  '/:id',
  AuthMiddleware,
  AddressValidatorMiddleware.get,
  AddressController.get,
);

router.post(
  '/',
  AuthMiddleware,
  AddressValidatorMiddleware.create,
  AddressController.create,
);

router.patch(
  '/:id',
  AuthMiddleware,
  AddressValidatorMiddleware.update,
  AddressController.update,
);

export default router;
