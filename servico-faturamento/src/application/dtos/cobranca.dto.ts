import { IsNumber, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCobrancaDto {
  @ApiProperty({ description: 'Identificador único da cobrança', example: 1 })
  @IsNumber()
  cobrancaId: number;

  @ApiProperty({ description: 'Identificador do cliente', example: 100 })
  @IsNumber()
  clienteId: number;

  @ApiProperty({ description: 'Valor da cobrança', example: 99.90 })
  @IsNumber()
  valor: number;

  @ApiProperty({ description: 'Status da cobrança', example: 'pendente', enum: ['pendente', 'pago', 'cancelado'] })
  @IsEnum(['pendente', 'pago', 'cancelado'])
  status: string;

  @ApiProperty({ description: 'Data de vencimento da cobrança', example: '2025-12-31' })
  @IsDateString()
  dataVencimento: string;
}

export class UpdateCobrancaDto {
  @ApiProperty({ description: 'Valor da cobrança', example: 99.90, required: false })
  @IsNumber({ allowNaN: false }, { message: 'Valor deve ser um número válido' })
  valor?: number;

  @ApiProperty({ description: 'Status da cobrança', example: 'pago', enum: ['pendente', 'pago', 'cancelado'], required: false })
  @IsEnum(['pendente', 'pago', 'cancelado'], { message: 'Status deve ser pendente, pago ou cancelado' })
  status?: string;

  @ApiProperty({ description: 'Data de vencimento da cobrança', example: '2025-12-31', required: false })
  @IsDateString({}, { message: 'Data de vencimento deve ser uma data válida' })
  dataVencimento?: string;
}