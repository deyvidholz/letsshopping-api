import { NextFunction, Request, Response } from 'express';

import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import UserValidator from '../../validators/user.validator';
import ValidatorMiddleware from './validator.middleware';

class UserValidatorMiddleware extends ValidatorMiddleware {
  public static create(req: Request, res: Response, next: NextFunction) {
    const dto: CreateUserDto = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.interceptor.firstName,
      lastName: req.interceptor.lastName,
      email: req.body.email,
      birthDate: req.body.birthDate,
    };

    const validation = new UserValidator(dto);
    UserValidatorMiddleware.validate({ dto, validation, req, res, next });
  }

  public static update(req: Request, res: Response, next: NextFunction) {
    const dto: UpdateUserDto = {
      id: req.user.id,
      password: req.body.password,
      currentPassword: req.body.currentPassword,
      firstName: req.interceptor.firstName,
      lastName: req.interceptor.lastName,
      email: req.body.email,
      birthDate: req.body.birthDate,
    };

    const validation = new UserValidator(dto, true);
    UserValidatorMiddleware.validate({ dto, validation, req, res, next });
  }
}

export default UserValidatorMiddleware;
