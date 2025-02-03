import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHome(res: Response): Response<any, Record<string, any>>;
    getMp3(id: string): Promise<any>;
}
