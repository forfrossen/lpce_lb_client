/* tslint:disable */

declare var Object: any;
export interface WorkorderInterface {
  "wamcu": string;
  "wadoco": number;
  "warorn": string;
  "walnid": number;
  "waptwo"?: number;
  "wasrst"?: string;
  "wadcg"?: Date;
  "watrdj"?: Date;
  "wastrt"?: Date;
  "wadrqj"?: Date;
  "wastrx"?: Date;
  "wappdt"?: Date;
  "waitm"?: number;
  "walitm"?: string;
  "wauorg"?: number;
  "wasoqs"?: number;
  "watbm"?: string;
  "watrt"?: string;
  "wlmcu"?: string;
  "wlrunm"?: number;
  "wlrunl"?: number;
  "wlsetl"?: number;
  "wlopsq"?: number;
  "wahrso"?: number;
  "wahrsa"?: number;
  "wamoh"?: number;
  "waltcm"?: number;
  "wlrorn"?: string;
  "wlrlln"?: number;
  "cwadcg"?: string;
  "cwatrdj"?: string;
  "cwastrt"?: string;
  "cwadrqj"?: string;
  "cwastrx"?: string;
  "cwappdt"?: string;
  "wavr01"?: string;
}

export class Workorder implements WorkorderInterface {
  "wamcu": string;
  "wadoco": number;
  "warorn": string;
  "walnid": number;
  "waptwo": number;
  "wasrst": string;
  "wadcg": Date;
  "watrdj": Date;
  "wastrt": Date;
  "wadrqj": Date;
  "wastrx": Date;
  "wappdt": Date;
  "waitm": number;
  "walitm": string;
  "wauorg": number;
  "wasoqs": number;
  "watbm": string;
  "watrt": string;
  "wlmcu": string;
  "wlrunm": number;
  "wlrunl": number;
  "wlsetl": number;
  "wlopsq": number;
  "wahrso": number;
  "wahrsa": number;
  "wamoh": number;
  "waltcm": number;
  "wlrorn": string;
  "wlrlln": number;
  "cwadcg": string;
  "cwatrdj": string;
  "cwastrt": string;
  "cwadrqj": string;
  "cwastrx": string;
  "cwappdt": string;
  "wavr01": string;
  constructor(data?: WorkorderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Workorder`.
   */
  public static getModelName() {
    return "Workorder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Workorder for dynamic purposes.
  **/
  public static factory(data: WorkorderInterface): Workorder{
    return new Workorder(data);
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
      name: 'Workorder',
      plural: 'Workorders',
      path: 'Workorders',
      idName: '',
      properties: {
        "wamcu": {
          name: 'wamcu',
          type: 'string'
        },
        "wadoco": {
          name: 'wadoco',
          type: 'number'
        },
        "warorn": {
          name: 'warorn',
          type: 'string'
        },
        "walnid": {
          name: 'walnid',
          type: 'number'
        },
        "waptwo": {
          name: 'waptwo',
          type: 'number'
        },
        "wasrst": {
          name: 'wasrst',
          type: 'string'
        },
        "wadcg": {
          name: 'wadcg',
          type: 'Date'
        },
        "watrdj": {
          name: 'watrdj',
          type: 'Date'
        },
        "wastrt": {
          name: 'wastrt',
          type: 'Date'
        },
        "wadrqj": {
          name: 'wadrqj',
          type: 'Date'
        },
        "wastrx": {
          name: 'wastrx',
          type: 'Date'
        },
        "wappdt": {
          name: 'wappdt',
          type: 'Date'
        },
        "waitm": {
          name: 'waitm',
          type: 'number'
        },
        "walitm": {
          name: 'walitm',
          type: 'string'
        },
        "wauorg": {
          name: 'wauorg',
          type: 'number'
        },
        "wasoqs": {
          name: 'wasoqs',
          type: 'number'
        },
        "watbm": {
          name: 'watbm',
          type: 'string'
        },
        "watrt": {
          name: 'watrt',
          type: 'string'
        },
        "wlmcu": {
          name: 'wlmcu',
          type: 'string'
        },
        "wlrunm": {
          name: 'wlrunm',
          type: 'number'
        },
        "wlrunl": {
          name: 'wlrunl',
          type: 'number'
        },
        "wlsetl": {
          name: 'wlsetl',
          type: 'number'
        },
        "wlopsq": {
          name: 'wlopsq',
          type: 'number'
        },
        "wahrso": {
          name: 'wahrso',
          type: 'number'
        },
        "wahrsa": {
          name: 'wahrsa',
          type: 'number'
        },
        "wamoh": {
          name: 'wamoh',
          type: 'number'
        },
        "waltcm": {
          name: 'waltcm',
          type: 'number'
        },
        "wlrorn": {
          name: 'wlrorn',
          type: 'string'
        },
        "wlrlln": {
          name: 'wlrlln',
          type: 'number'
        },
        "cwadcg": {
          name: 'cwadcg',
          type: 'string'
        },
        "cwatrdj": {
          name: 'cwatrdj',
          type: 'string'
        },
        "cwastrt": {
          name: 'cwastrt',
          type: 'string'
        },
        "cwadrqj": {
          name: 'cwadrqj',
          type: 'string'
        },
        "cwastrx": {
          name: 'cwastrx',
          type: 'string'
        },
        "cwappdt": {
          name: 'cwappdt',
          type: 'string'
        },
        "wavr01": {
          name: 'wavr01',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
