export interface Agendamento {
    carro: string;
    precoTotal: number;
    cliente: string;
    endereco: string;
    email: string;
    data: string;
    confirmado?: boolean;
}