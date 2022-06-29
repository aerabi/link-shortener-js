import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

interface ShortenResponse {
  hash: string;
}

interface ErrorResponse {
  error: string;
  code: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shorten')
  async shorten(
    @Body('url') url: string,
  ): Promise<ShortenResponse | ErrorResponse> {
    if (!url) {
      return {
        error: `No url provided. Please provide in the body. E.g. {'url':'https://google.com'}`,
        code: 400,
      };
    }
    const hash = await this.appService.shorten(url);

    return { hash };
  }

  @Get(':hash')
  @Redirect()
  async retrieveAndRedirect(@Param('hash') hash): Promise<{ url: string }> {
    return { url: await this.appService.retrieve(hash) };
  }
}
