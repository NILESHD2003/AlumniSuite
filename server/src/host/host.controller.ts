import { Body, Controller, Post } from '@nestjs/common';
import { HostService } from './host.service';
import { InvitationDto } from './dto/invitation.dto';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('/invite')
  async inviteMember(
    @Body() dto: InvitationDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.hostService.inviteMember(dto);
  }
}
