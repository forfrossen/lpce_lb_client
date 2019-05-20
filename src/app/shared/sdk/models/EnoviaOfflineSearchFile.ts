/* tslint:disable */

declare var Object: any;
export interface EnoviaOfflineSearchFileInterface {
  "type"?: string;
  "name"?: string;
  "revision"?: string;
  "locationname"?: string;
  "locationserver"?: string;
  "locationpath"?: string;
  "filename"?: string;
  "encryptedfilename"?: string;
  "originateddate"?: string;
  "state"?: string;
  "description"?: string;
}

export class EnoviaOfflineSearchFile implements EnoviaOfflineSearchFileInterface {
  "type": string;
  "name": string;
  "revision": string;
  "locationname": string;
  "locationserver": string;
  "locationpath": string;
  "filename": string;
  "encryptedfilename": string;
  "originateddate": string;
  "state": string;
  "description": string;
  constructor(data?: EnoviaOfflineSearchFileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EnoviaOfflineSearchFile`.
   */
  public static getModelName() {
    return "EnoviaOfflineSearchFile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EnoviaOfflineSearchFile for dynamic purposes.
  **/
  public static factory(data: EnoviaOfflineSearchFileInterface): EnoviaOfflineSearchFile{
    return new EnoviaOfflineSearchFile(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'EnoviaOfflineSearchFile',
      plural: 'EnoviaOfflineSearchFiles',
      path: 'EnoviaOfflineSearchFiles',
      idName: '',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "revision": {
          name: 'revision',
          type: 'string'
        },
        "locationname": {
          name: 'locationname',
          type: 'string'
        },
        "locationserver": {
          name: 'locationserver',
          type: 'string'
        },
        "locationpath": {
          name: 'locationpath',
          type: 'string'
        },
        "filename": {
          name: 'filename',
          type: 'string'
        },
        "encryptedfilename": {
          name: 'encryptedfilename',
          type: 'string'
        },
        "originateddate": {
          name: 'originateddate',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
