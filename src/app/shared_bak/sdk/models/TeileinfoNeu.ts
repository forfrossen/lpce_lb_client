/* tslint:disable */

declare var Object: any;
export interface TeileinfoNeuInterface {
  "id": number;
  "zeichnungsnummer"?: string;
  "teileinfoAllg"?: string;
  "dateAllg"?: Date;
  "teileinfoSek"?: string;
  "dateSek"?: Date;
  "litm"?: string;
  "modified"?: Date;
  "created"?: Date;
  "created by"?: string;
}

export class TeileinfoNeu implements TeileinfoNeuInterface {
  "id": number;
  "zeichnungsnummer": string;
  "teileinfoAllg": string;
  "dateAllg": Date;
  "teileinfoSek": string;
  "dateSek": Date;
  "litm": string;
  "modified": Date;
  "created": Date;
  "created by": string;
  constructor(data?: TeileinfoNeuInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TeileinfoNeu`.
   */
  public static getModelName() {
    return "TeileinfoNeu";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TeileinfoNeu for dynamic purposes.
  **/
  public static factory(data: TeileinfoNeuInterface): TeileinfoNeu{
    return new TeileinfoNeu(data);
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
      name: 'TeileinfoNeu',
      plural: 'TeileinfoNeus',
      path: 'TeileinfoNeus',
      idName: '',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "zeichnungsnummer": {
          name: 'zeichnungsnummer',
          type: 'string'
        },
        "teileinfoAllg": {
          name: 'teileinfoAllg',
          type: 'string'
        },
        "dateAllg": {
          name: 'dateAllg',
          type: 'Date'
        },
        "teileinfoSek": {
          name: 'teileinfoSek',
          type: 'string'
        },
        "dateSek": {
          name: 'dateSek',
          type: 'Date'
        },
        "litm": {
          name: 'litm',
          type: 'string'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "created by": {
          name: 'created by',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
