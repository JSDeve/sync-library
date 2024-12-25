import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SyncService } from './sync.service';

describe('AppController', () => {
  let appController: AppController;
  let syncService: SyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: SyncService,
          useValue: {
            syncAuthors: jest.fn().mockResolvedValue(5),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    syncService = module.get<SyncService>(SyncService);
  });

  it('should call syncAuthors and return the processed count', async () => {
    const result = await appController.sync('test');
    expect(syncService.syncAuthors).toHaveBeenCalledWith('test');
    expect(result).toEqual({ message: '5 authors processed' });
  });
});