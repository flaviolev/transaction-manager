export interface Transaction {
    userId?: number;
    source: string;
    target: string;
    amount: number;
    balance?: number;
    creationDate?: Date;
}