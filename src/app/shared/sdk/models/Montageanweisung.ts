/* tslint:disable */

declare var Object: any;
export interface MontageanweisungInterface {
  "artikel": string;
  "loctite"?: string;
  "fett"?: string;
  "schrauber"?: string;
  "pruefprogramm"?: string;
  "pruefadapter"?: string;
  "bemerkung"?: string;
  "anhang1"?: string;
  "anhang2"?: string;
  "anhang3"?: string;
  "created"?: Date;
  "changed"?: Date;
  "createdby"?: string;
  "changedby"?: string;
}

export class Montageanweisung implements MontageanweisungInterface {
  "artikel": string;
  "loctite": string;
  "fett": string;
  "schrauber": string;
  "pruefprogramm": string;
  "pruefadapter": string;
  "bemerkung": string;
  "anhang1": string;
  "anhang2": string;
  "anhang3": string;
  "created": Date;
  "changed": Date;
  "createdby": string;
  "changedby": string;
  constructor(data?: MontageanweisungInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Montageanweisung`.
   */
  public static getModelName() {
    return "Montageanweisung";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Montageanweisung for dynamic purposes.
  **/
  public static factory(data: MontageanweisungInterface): Montageanweisung{
    return new Montageanweisung(data);
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
      name: 'Montageanweisung',
      plural: 'Montageanweisungen',
      path: 'Montageanweisungen',
      idName: 'artikel',
      properties: {
        "artikel": {
          name: 'artikel',
          type: 'string'
        },
        "loctite": {
          name: 'loctite',
          type: 'string'
        },
        "fett": {
          name: 'fett',
          type: 'string'
        },
        "schrauber": {
          name: 'schrauber',
          type: 'string'
        },
        "pruefprogramm": {
          name: 'pruefprogramm',
          type: 'string'
        },
        "pruefadapter": {
          name: 'pruefadapter',
          type: 'string'
        },
        "bemerkung": {
          name: 'bemerkung',
          type: 'string'
        },
        "anhang1": {
          name: 'anhang1',
          type: 'string'
        },
        "anhang2": {
          name: 'anhang2',
          type: 'string'
        },
        "anhang3": {
          name: 'anhang3',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "changed": {
          name: 'changed',
          type: 'Date'
        },
        "createdby": {
          name: 'createdby',
          type: 'string'
        },
        "changedby": {
          name: 'changedby',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
