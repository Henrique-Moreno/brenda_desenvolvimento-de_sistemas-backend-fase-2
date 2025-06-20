export class Plano {
  private id: number;
  private nome: string;
  private valor: number;

  constructor(id: number, nome: string, valor: number) {
    this.id = id;
    this.nome = nome;
    this.valor = valor;
  }

  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getValor(): number {
    return this.valor;
  }
}