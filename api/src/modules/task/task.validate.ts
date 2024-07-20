import { $Enums } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
    
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    dueDate: Date;

    @IsNotEmpty()
    status: $Enums.Status;

    @IsOptional()
    @IsNotEmpty()
    projectId: string;
    
    @IsNotEmpty()
    assignedToId: string;

};

export class UpdateTaskDto {
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    dueDate?: Date;

    @IsOptional()
    @IsNotEmpty()
    status?: $Enums.Status;

    @IsOptional()
    @IsNotEmpty()
    projectId?: string;
    
    @IsOptional()
    @IsNotEmpty()
    assignedToId?: string;
};
