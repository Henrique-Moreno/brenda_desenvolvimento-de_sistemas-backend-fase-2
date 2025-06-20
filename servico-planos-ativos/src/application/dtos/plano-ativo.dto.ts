import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanoAtivoDto {
  @ApiProperty({ description: 'ID do cliente' })
  @IsNumber()
  clienteId: number;

  @ApiProperty({ description: 'ID do plano' })
  @IsNumber()
  planoId: number;

  @ApiProperty({ description: 'Nome do plano' })
  @IsString()
  nomePlano: string;

  @ApiProperty({ description: 'Valor do plano' })
  @IsNumber()
  valor: number;

  @ApiProperty({ description: 'Data de ativação do plano' })
  @IsDateString()
  dataAtivacao: string;

  @ApiProperty({ description: 'Status do plano' })
  @IsBoolean()
  ativo: boolean;
}