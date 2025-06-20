import { Test, TestingModule } from '@nestjs/testing';
import { PlanoService } from '../aplicacao/services/plano.service';
import { PLANO_REPOSITORY, IPlanoRepository } from '../dominio/plano.repository.interface';
import { Plano } from '../dominio/plano.entity';

describe('PlanoService', () => {
  let planoService: PlanoService;
  let planoRepository: IPlanoRepository;

  const mockPlanoRepository = {
    findById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanoService,
        {
          provide: PLANO_REPOSITORY,
          useValue: mockPlanoRepository,
        },
      ],
    }).compile();

    planoService = module.get<PlanoService>(PlanoService);
    planoRepository = module.get<IPlanoRepository>(PLANO_REPOSITORY);
  });

  it('deve criar um plano com sucesso', async () => {
    const plano = new Plano(1, 'Plano Residencial 100MB', 99.90);
    await planoService.criarPlano(plano);
    expect(planoRepository.save).toHaveBeenCalledWith(plano);
  });

  it('deve buscar um plano por ID', async () => {
    const plano = new Plano(1, 'Plano Residencial 100MB', 99.90);
    mockPlanoRepository.findById.mockResolvedValue(plano);
    const result = await planoService.buscarPlano(1);
    expect(result).toEqual(plano);
    expect(planoRepository.findById).toHaveBeenCalledWith(1);
  });

  it('deve deletar um plano por ID', async () => {
    await planoService.deletarPlano(1);
    expect(planoRepository.delete).toHaveBeenCalledWith(1);
  });
});