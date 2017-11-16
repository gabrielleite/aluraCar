export interface Agendamento {
    modeloCarro: string;
    precoTotal: number;
    nomeCliente: string;
    enderecoCliente: string;
    emailCliente: string;
    data: string;
    confirmado?: boolean;
}