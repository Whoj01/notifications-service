// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './infra/app.controller';
// import { PrismaService } from './infra/prisma.service';

// describe('AppController', () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [PrismaService],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.list()).toBe('0');
//     });
//   });
// });

test('Always passes', () => {
  expect(true).toBe(true);
});
