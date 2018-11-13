/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Message } from '../../models/Message';
import { TeileinfoNeu } from '../../models/TeileinfoNeu';
import { Heimarbeiter } from '../../models/Heimarbeiter';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Message: Message,
    TeileinfoNeu: TeileinfoNeu,
    Heimarbeiter: Heimarbeiter,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
