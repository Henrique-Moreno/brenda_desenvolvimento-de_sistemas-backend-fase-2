export class Cliente {
  private id: number;
  private nome: string;
  private planoId: number;

  constructor(id: number, nome: string, planoId: number) {
    this.id = id;
    this.nome = nome;
    this.planoId = planoId;
  }

  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getPlanoId(): number {
    return this.planoId;
  }
}