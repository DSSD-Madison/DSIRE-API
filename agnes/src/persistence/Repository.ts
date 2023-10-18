export interface Page {
    limit?: number
    offset?: number
}

export interface Repository<O extends object, W extends object> {
    get: (page?: Page, where?: W) => Promise<O[]>
}
