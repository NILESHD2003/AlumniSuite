import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InvitationDto } from './dto/invitation.dto';
import { generate } from 'generate-password';
import mailSender from '../mailSender';
import { inviteMail } from '../utils/mail/invitationMail.mail';
import Host from './schema/host.schema';
import Invite from './schema/invite.schema';

@Injectable()
export class HostService {
  async inviteMember(
    dto: InvitationDto,
  ): Promise<{ success: boolean; message: string }> {
    const host = await Host.findById(dto.hostId);

    if (!host) {
      throw new UnauthorizedException('Host not found');
    }

    const invite = await Invite.findOne({
      email: dto.email,
      hostId: dto.hostId,
    });

    if (invite) {
      throw new ConflictException('Member is already Invited.');
    }

    const inviteToken: string = generate({
      length: 32,
      numbers: true,
      symbols: false,
      uppercase: false,
      lowercase: true,
    });

    // save invite in db with expiry of 7 days
    await Invite.create({
      email: dto.email,
      hostId: dto.hostId,
      role: dto.role,
      token: inviteToken,
    });

    await Invite.create({
      email: dto.email,
      hostId: dto.hostId,
      role: dto.role,
      token: inviteToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    // send mail
    const webUrl = 'http://localhost:5173';
    const mailResponse = await mailSender(
      dto.email,
      'Invitation to join AlumniSuite',
      inviteMail(dto.email, host.name, inviteToken, webUrl, host.email),
    );

    console.log(mailResponse);

    return {
      success: true,
      message: 'Invitation sent successfully.',
    };
  }

  //   TODO: Implement is email invited
}
