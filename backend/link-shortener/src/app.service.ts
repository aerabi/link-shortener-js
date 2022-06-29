import { Inject, Injectable } from '@nestjs/common';
import { AppRepository, AppRepositoryTag } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    @Inject(AppRepositoryTag) private readonly appRepository: AppRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async shorten(url: string): Promise<string> {
    const hash = Math.random().toString(36).slice(7);
    await this.appRepository.put(hash, url);

    return hash;
  }

  retrieve(hash: string): Promise<string> {
    return this.appRepository.get(hash);
  }
}
