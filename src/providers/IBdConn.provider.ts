export interface IBdConfig {
    host?: string;
    user: string;
    password: string;
    database: string;
}

export interface IBdConn {
    connect(config: IBdConfig): Promise<void>;
}

