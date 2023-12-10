import { SetMetadata } from '@nestjs/common';

export const Permission = (userType: string) =>
  SetMetadata('allowedUserType', userType);
