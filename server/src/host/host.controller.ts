import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { HostService } from './host.service';
import { InvitationDto } from './dto/invitation.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Roles('host')
  @UseGuards(JwtAuthGuard)
  @Post('/invite')
  async inviteMember(
    @Body() dto: InvitationDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.hostService.inviteMember(dto);
  }

  //TODO: Get all members
}
