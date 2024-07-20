import { IsOptional, IsString, MaxLength, IsNotEmpty } from "class-validator";

export class CreateProjectDto {

    @IsString()
    @MaxLength(255)
    name: string;
    
    @IsString()
    @MaxLength(255)
    description: string;

};

export class UpdateProjectDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name?: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

};
