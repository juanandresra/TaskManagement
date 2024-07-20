import { SetMetadata } from '@nestjs/common';
import { $Enums } from '@prisma/client';
export const Roles = (...args: $Enums.Role[]) => SetMetadata('roles', args);