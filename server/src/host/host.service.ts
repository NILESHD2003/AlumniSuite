import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InvitationDto } from './dto/invitation.dto';
import { generate } from 'generate-password';
import { PrismaService } from '../prisma/prisma.service';
import { mailSender } from '../mailSender.js';
import { invitationMail } from '../utils/mails/invitationMail.js';

@Injectable()
export class HostService {
  constructor(private prisma: PrismaService) {}
  async inviteMember(
    dto: InvitationDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log(dto);
      // check if the host exists
      const host = await this.prisma.host.findUnique({
        where: { id: dto.hostId },
      });

      if (!host) {
        throw new UnauthorizedException('Host not found');
      }
      // check if the email is already invited
      const invite = await this.prisma.invite.findUnique({
        where: { email: dto.email },
      });

      if (invite) {
        throw new ConflictException('Member is already Invited.');
      }
      // generate an invitation code
      const inviteToken: string = generate({
        length: 32,
        numbers: true,
        symbols: false,
        uppercase: false,
        lowercase: true,
      });
      // save invite in db with expiry of 7 days
      await this.prisma.invite.create({
        data: {
          email: dto.email,
          hostId: dto.hostId,
          role: dto.role,
          token: inviteToken,
        },
      });

      // send mail
      const webUrl = 'http://localhost:5173';
      const mailResponse = await mailSender(
        dto.email,
        'Invitation to join AlumniSuite',
        invitationMail.inviteMail(
          dto.email,
          host.name,
          inviteToken,
          webUrl,
          host.email,
        ),
      );

      console.log(mailResponse);

      return {
        success: true,
        message: 'Invitation sent successfully.',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong while inviting member. Please try again later',
      );
    }
  }
}
