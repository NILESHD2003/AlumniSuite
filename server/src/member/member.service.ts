import { HttpStatus, Injectable } from '@nestjs/common';
import {
  MemberOnboardingBodyDto,
  MemberOnboardingQueryDto,
} from './dto/memberOnboarding.dto';
import Invite from '../host/schema/invite.schema';
import Member from './schema/member.schema';

@Injectable()
export class MemberService {
  async onboarding(
    body: MemberOnboardingBodyDto,
    query: MemberOnboardingQueryDto,
  ) {
    //check if invite code is valid
    const inviteCode = await Invite.findOne({ token: query.invite });
    if (!inviteCode) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid Invite Code or Invite Code Expired',
      };
    }
    //check if email is already registered
    const member = await Member.findOne({
      email: inviteCode.email,
    });

    if (member) {
      //TODO: incase email is already registered then add directly to the community
    } else {
      //create a new member
      await Member.create({
        role: inviteCode.role,
        name: body.name,
        gender: body.gender,
        email: inviteCode.email,
        dob: body.dob,
        location: body.location,
        phone: body.phone,
        password: body.password,
      });
    }

    //send welcome email
    //TODO: Send a welcome email
    return {
      status: HttpStatus.CREATED,
      message: 'Member Onboarding Success',
    };
  }
}
