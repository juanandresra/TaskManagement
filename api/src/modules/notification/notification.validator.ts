import { IsOptional, IsString, MaxLength, IsNotEmpty } from "class-validator";

export class CreateNotificationDto {

    @IsString()
    @MaxLength(255)
    message: string;
    
    @IsString()
    @MaxLength(255)
    userId: string;

};

export class UpdateNotificationDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    message?: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    userId?: string;

};
