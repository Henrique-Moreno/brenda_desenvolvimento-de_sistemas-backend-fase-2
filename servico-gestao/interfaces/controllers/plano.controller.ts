import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { PlanoService } from '../../aplicacao/services/plano.service';
import { Plano } from '../../dominio/plano.entity';

@Controller('planos')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  async createPlano(@Body() planoData: { id: number; nome: string; valor: number }): Promise<void> {
    const plano = new Plano(planoData.id, planoData.nome, planoData.valor);
    await this.planoService.criarPlano(plano);
  }

  @Get(':id')
  async getPlano(@Param('id') id: string): Promise<Plano | null> {
    return await this.planoService.buscarPlano(Number(id));
  }

  @Delete(':id')
  async deletePlano(@Param('id') id: string): Promise<void> {
    await this.planoService.deletarPlano(Number(id));
  }
}