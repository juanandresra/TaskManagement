import {
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
    NotAcceptableException,
    RequestTimeoutException,
    ConflictException,
    GoneException,
    HttpVersionNotSupportedException,
    PayloadTooLargeException,
    UnsupportedMediaTypeException,
    UnprocessableEntityException,
    InternalServerErrorException,
    NotImplementedException,
    ImATeapotException,
    MethodNotAllowedException,
    BadGatewayException,
    ServiceUnavailableException,
    GatewayTimeoutException,
    PreconditionFailedException
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const sendResponse = (res: Response, data: any, statusCode: number = 200, error: any = null) => {

    if (error) {

        if (
            error instanceof BadRequestException ||
            error instanceof ForbiddenException ||
            error instanceof NotAcceptableException ||
            error instanceof RequestTimeoutException ||
            error instanceof ConflictException ||
            error instanceof GoneException ||
            error instanceof HttpVersionNotSupportedException ||
            error instanceof PayloadTooLargeException ||
            error instanceof UnsupportedMediaTypeException ||
            error instanceof UnprocessableEntityException ||
            error instanceof InternalServerErrorException ||
            error instanceof NotImplementedException ||
            error instanceof ImATeapotException ||
            error instanceof MethodNotAllowedException ||
            error instanceof BadGatewayException ||
            error instanceof ServiceUnavailableException ||
            error instanceof GatewayTimeoutException ||
            error instanceof PreconditionFailedException ||
            error instanceof UnauthorizedException ||
            error instanceof NotFoundException
        ){
            return res.status(error.getStatus()).json({                
                statusCode: error.getStatus(),
                message: error.message,
                error: StatusCodes[error.getStatus()],
            });
        }

        return res.status(500).json({            
            statusCode: 500,
            message: error || 'Internal server error',
            error: StatusCodes[500],
        });

    }

    if (data.meta) {
        return res.status(statusCode).json({
            data: data.data,
            meta: data.meta,
            statusCode: 200,
            message: StatusCodes[statusCode]
        });
    }

    return res.status(statusCode).json({
        data: data,
        statusCode: 200,
        message: StatusCodes[statusCode]
    });
    
};