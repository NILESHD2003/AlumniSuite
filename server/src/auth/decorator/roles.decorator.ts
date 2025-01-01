import { SetMetadata } from '@nestjs/common';

// This will be used to store metadata for roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
