export interface AppRepository {
  put(hash: string, url: string): Promise<void>;
  get(hash: string): Promise<string>;
}

export const AppRepositoryTag = 'AppRepository';
