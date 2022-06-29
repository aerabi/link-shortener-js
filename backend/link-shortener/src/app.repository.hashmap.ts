import { AppRepository } from './app.repository';

export class AppRepositoryHashmap implements AppRepository {
  private readonly hashMap: Map<string, string>;

  constructor() {
    this.hashMap = new Map<string, string>();
  }

  async get(hash: string): Promise<string> {
    return this.hashMap.get(hash);
  }

  async put(hash: string, url: string): Promise<void> {
    this.hashMap.set(hash, url);
  }
}
