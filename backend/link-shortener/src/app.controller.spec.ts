import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { AppRepositoryTag } from "./app.repository";
import { AppRepositoryHashmap } from "./app.repository.hashmap";


describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppRepositoryTag, useClass: AppRepositoryHashmap },
        AppService,
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('retrieve', () => {
    it('should retrieve the saved URL', async () => {
      const url = 'docker.com';
      const hash = await appService.shorten(url);
      const retrieveResult =  await appService.retrieve(hash)));
expect(retrieved).toEqual(url);

    });
  });
});
