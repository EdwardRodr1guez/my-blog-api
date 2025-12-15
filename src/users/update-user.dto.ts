import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * UpdateUserDto extiende PartialType(CreateUserDto),
 * lo que convierte todos los campos de CreateUserDto en opcionales
 * y hereda sus decoradores de validación.
 * Así, puedes actualizar solo los campos que desees,
 * y la validación se aplicará solo a los campos enviados.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
