import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateCobrancaDto } from 'aplicacao/dtos/cobranca.dto';
import { mysqlConfig } from 'infraestrutura/database/mysql.config';

@Controller()
export class CobrancaMessagingController {
  async saveCobrancaLog(dto: CreateCobrancaDto) {
    const connection = await mysqlConfig.pool.getConnection();
    try {
      await connection.execute(
        'INSERT INTO cobranca_logs (cobranca_id, cliente_id, valor, status, data_vencimento) VALUES (?, ?, ?, ?, ?)',
        [dto.cobrancaId, dto.clienteId, dto.valor, dto.status, dto.dataVencimento],
      );
    } finally {
      connection.release();
    }
  }

  @EventPattern('cobranca.created')
  async handleCobrancaCreated(@Payload() dto: CreateCobrancaDto) {
    console.log('Cobrança criada recebida no servico-gestao:', dto);
    await this.saveCobrancaLog(dto);
  }
}