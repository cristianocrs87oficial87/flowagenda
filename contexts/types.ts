export interface BookingData {
  empresa?: string;

  servico?: {
    id: string;
    nome: string;
    preco: number;
    duracao: number;
  };

  profissional?: {
    id: string;
    nome: string;
  };

  data?: string;

  horario?: string;

  cliente?: {
    nome: string;
    whatsapp: string;
  };
}