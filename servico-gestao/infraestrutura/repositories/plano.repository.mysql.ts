import { Injectable } from '@nestjs/common';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';
import { Plano } from '../../dominio/plano.entity';
import { mysqlConfig } from '../database/mysql.config';
import { RowDataPacket } from 'mysql2/promise'; 

@Injectable()
export class PlanoRepositoryMySQL implements IPlanoRepository {
  private pool = mysqlConfig.pool;

  async findById(id: number): Promise<Plano | null> {
    const [rows] = await this.pool.query('SELECT * FROM planos WHERE id = ?', [id]) as [RowDataPacket[], any];
    if (Array.isArray(rows) && rows.length > 0) {
      const row = rows[0];
      return new Plano(Number(row.id), String(row.nome), Number(row.valor));
    }
    return null;
  }

  async save(plano: Plano): Promise<void> {
    await this.pool.query(
      'INSERT INTO planos (id, nome, valor) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nome = ?, valor = ?',
      [plano.getId(), plano.getNome(), plano.getValor(), plano.getNome(), plano.getValor()]
    );
  }

  async delete(id: number): Promise<void> {
    await this.pool.query('DELETE FROM planos WHERE id = ?', [id]);
  }
}