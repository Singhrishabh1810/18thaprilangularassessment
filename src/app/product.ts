export class Product {
    pid: number;
    pname: string;
    price: number;
    category: string;

    constructor(pid: number, pname: string, price: number, category: string) {
        this.pid = pid;
        this.pname = pname;
        this.price = price;
        this.category = category;
    }
}
