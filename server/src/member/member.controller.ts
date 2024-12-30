import { Body, Controller, Post, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import {
  MemberOnboardingBodyDto,
  MemberOnboardingQueryDto,
} from './dto/memberOnboarding.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // TODO: Member Onboarding
  @Post('onboard')
  async onboarding(
    @Body() body: MemberOnboardingBodyDto,
    @Query() query: MemberOnboardingQueryDto,
  ) {
    return await this.memberService.onboarding(body, query);
  }
}
