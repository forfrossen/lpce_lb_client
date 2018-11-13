/* tslint:disable */

declare var Object: any;
export interface HeimarbeiterInterface {
  "kostenstelle"?: string;
  "name"?: string;
}

export class Heimarbeiter implements HeimarbeiterInterface {
  "kostenstelle": string;
  "name": string;
  constructor(data?: HeimarbeiterInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Heimarbeiter`.
   */
  public static getModelName() {
    return "Heimarbeiter";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Heimarbeiter for dynamic purposes.
  **/
  public static factory(data: HeimarbeiterInterface): Heimarbeiter{
    return new Heimarbeiter(data);
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
      name: 'Heimarbeiter',
      plural: 'Heimarbeiters',
      path: 'Heimarbeiters',
      idName: '',
      properties: {
        "kostenstelle": {
          name: 'kostenstelle',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
