/* tslint:disable */

declare var Object: any;
export interface PlanerNrToADIDInterface {
  "aban8": number;
  "username": string;
}

export class PlanerNrToADID implements PlanerNrToADIDInterface {
  "aban8": number;
  "username": string;
  constructor(data?: PlanerNrToADIDInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PlanerNrToADID`.
   */
  public static getModelName() {
    return "PlanerNrToADID";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PlanerNrToADID for dynamic purposes.
  **/
  public static factory(data: PlanerNrToADIDInterface): PlanerNrToADID{
    return new PlanerNrToADID(data);
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
      name: 'PlanerNrToADID',
      plural: 'PlanerNrToADIDs',
      path: 'PlanerNrToADIDs',
      idName: '',
      properties: {
        "aban8": {
          name: 'aban8',
          type: 'number'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
