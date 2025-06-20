import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PlanoModule } from '../src/plano.module';

describe('PlanoController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PlanoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/planos (POST) deve criar um plano', async () => {
    await request(app.getHttpServer())
      .post('/planos')
      .send({ id: 1, nome: 'Plano Residencial 100MB', valor: 99.90 })
      .expect(201);
  });

  it('/planos/1 (GET) deve buscar um plano', async () => {
    await request(app.getHttpServer())
      .post('/planos')
      .send({ id: 1, nome: 'Plano Residencial 100MB', valor: 99.90 })
      .expect(201);

    return request(app.getHttpServer())
      .get('/planos/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: 1,
          nome: 'Plano Residencial 100MB',
          valor: 99.90,
        });
      });
  });

  it('/planos/1 (DELETE) deve deletar um plano', async () => {
    await request(app.getHttpServer())
      .post('/planos')
      .send({ id: 1, nome: 'Plano Residencial 100MB', valor: 99.90 })
      .expect(201);

    return request(app.getHttpServer())
      .delete('/planos/1')
      .expect(200);
  });
});


