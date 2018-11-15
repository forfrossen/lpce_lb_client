/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AccessToken } from '../../models/AccessToken';
import { Message } from '../../models/Message';
import { TeileinfoNeu } from '../../models/TeileinfoNeu';
import { Heimarbeiter } from '../../models/Heimarbeiter';
import { Heimarbeit } from '../../models/Heimarbeit';
import { UserIdentity } from '../../models/UserIdentity';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    AccessToken: AccessToken,
    Message: Message,
    TeileinfoNeu: TeileinfoNeu,
    Heimarbeiter: Heimarbeiter,
    Heimarbeit: Heimarbeit,
    UserIdentity: UserIdentity,
    
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
