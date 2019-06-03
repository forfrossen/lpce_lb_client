/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AccessToken } from '../../models/AccessToken';
import { Message } from '../../models/Message';
import { Teileinfo } from '../../models/Teileinfo';
import { Heimarbeiter } from '../../models/Heimarbeiter';
import { Heimarbeit } from '../../models/Heimarbeit';
import { Item } from '../../models/Item';
import { OpenOrder } from '../../models/OpenOrder';
import { OpenOrderComment } from '../../models/OpenOrderComment';
import { Workorder } from '../../models/Workorder';
import { EnoviaOfflineSearchFile } from '../../models/EnoviaOfflineSearchFile';
import { EnoviaReferenceItem } from '../../models/EnoviaReferenceItem';
import { Montageanweisung } from '../../models/Montageanweisung';
import { TBWEDATEN } from '../../models/TBWEDATEN';
import { PlanerNrToADID } from '../../models/PlanerNrToADID';
import { HttpForwarding } from '../../models/HttpForwarding';
import { Artikelstammanlage } from '../../models/Artikelstammanlage';
import { UserIdentity } from '../../models/UserIdentity';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    AccessToken: AccessToken,
    Message: Message,
    Teileinfo: Teileinfo,
    Heimarbeiter: Heimarbeiter,
    Heimarbeit: Heimarbeit,
    Item: Item,
    OpenOrder: OpenOrder,
    OpenOrderComment: OpenOrderComment,
    Workorder: Workorder,
    EnoviaOfflineSearchFile: EnoviaOfflineSearchFile,
    EnoviaReferenceItem: EnoviaReferenceItem,
    Montageanweisung: Montageanweisung,
    TBWEDATEN: TBWEDATEN,
    PlanerNrToADID: PlanerNrToADID,
    HttpForwarding: HttpForwarding,
    Artikelstammanlage: Artikelstammanlage,
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
