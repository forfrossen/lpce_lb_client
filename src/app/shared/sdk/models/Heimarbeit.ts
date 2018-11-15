/* tslint:disable */

declare var Object: any;
export interface HeimarbeitInterface {
  "auftrag": string;
  "kostenstelle"?: string;
  "datum"?: Date;
  "wlopsq"?: number;
}

export class Heimarbeit implements HeimarbeitInterface {
  "auftrag": string;
  "kostenstelle": string;
  "datum": Date;
  "wlopsq": number;
  constructor(data?: HeimarbeitInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Heimarbeit`.
   */
  public static getModelName() {
    return "Heimarbeit";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Heimarbeit for dynamic purposes.
  **/
  public static factory(data: HeimarbeitInterface): Heimarbeit{
    return new Heimarbeit(data);
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
      name: 'Heimarbeit',
      plural: 'Heimarbeits',
      path: 'Heimarbeits',
      idName: '',
      properties: {
        "auftrag": {
          name: 'auftrag',
          type: 'string'
        },
        "kostenstelle": {
          name: 'kostenstelle',
          type: 'string'
        },
        "datum": {
          name: 'datum',
          type: 'Date'
        },
        "wlopsq": {
          name: 'wlopsq',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
