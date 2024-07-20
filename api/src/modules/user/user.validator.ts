import { $Enums } from "@prisma/client";
import { IsEmail, isEnum, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'El correo es requerido' })
    @IsEmail({}, { message: 'El formato de correo no es valido' })
    email: string

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MaxLength(100, { message: 'La contraseña debe tener menos de 100 caracteres' })
    password: string

    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MaxLength(100, { message: 'El nombre debe tener menos de 100 caracteres' })
    firstName: string

    @IsNotEmpty({ message: 'El apellido es requerido' })
    @MaxLength(100, { message: 'El apellido debe tener menos de 100 caracteres' })
    @IsString({ message: 'El apellido debe ser un texto' })
    lastName: string

}

export class UpdateUserDto {

    @IsOptional()
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MaxLength(100, { message: 'La contraseña debe tener menos de 100 caracteres' })
    password: string

    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @MaxLength(100, { message: 'El nombre debe tener menos de 100 caracteres' })
    firstName: string

    @IsNotEmpty({ message: 'El apellido es requerido' })
    @MaxLength(100, { message: 'El apellido debe tener menos de 100 caracteres' })
    @IsString({ message: 'El apellido debe ser un texto' })
    lastName: string

    @IsNotEmpty({ message: 'El correo es requerido' })
    @IsEmail({}, { message: 'El formato de correo no es valido' })
    email: string

    @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
    @IsString({ message: 'El nombre de usuario debe ser un texto' })
    @MaxLength(100, { message: 'El nombre de usuario debe tener menos de 100 caracteres' })
    username: string

    @IsNotEmpty({ message: 'El rol es requerido' })
    @IsString({ message: 'El rol debe ser un texto' })
    role: $Enums.Role
}

export class LoginUserDto {

    @IsNotEmpty({ message: 'El correo es requerido' })
    identifier: string

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string
    
}
