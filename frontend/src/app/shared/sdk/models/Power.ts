/* tslint:disable */

declare var Object: any;
export interface PowerInterface {
  "name": string;
  "textType": string;
  "originType": string;
  "originName": string;
  "level"?: number;
  "description"?: string;
  "type"?: string;
  "frequency"?: string;
  "keywords"?: Array<any>;
  "typeAction"?: string;
  "typeAttaque"?: string;
  "scope"?: string;
  "text": string;
  "book"?: any;
  "card"?: string;
  "id"?: any;
}

export class Power implements PowerInterface {
  "name": string;
  "textType": string;
  "originType": string;
  "originName": string;
  "level": number;
  "description": string;
  "type": string;
  "frequency": string;
  "keywords": Array<any>;
  "typeAction": string;
  "typeAttaque": string;
  "scope": string;
  "text": string;
  "book": any;
  "card": string;
  "id": any;
  constructor(data?: PowerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Power`.
   */
  public static getModelName() {
    return "Power";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Power for dynamic purposes.
  **/
  public static factory(data: PowerInterface): Power{
    return new Power(data);
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
      name: 'Power',
      plural: 'Powers',
      path: 'Powers',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "textType": {
          name: 'textType',
          type: 'string'
        },
        "originType": {
          name: 'originType',
          type: 'string'
        },
        "originName": {
          name: 'originName',
          type: 'string'
        },
        "level": {
          name: 'level',
          type: 'number'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "frequency": {
          name: 'frequency',
          type: 'string'
        },
        "keywords": {
          name: 'keywords',
          type: 'Array&lt;any&gt;'
        },
        "typeAction": {
          name: 'typeAction',
          type: 'string'
        },
        "typeAttaque": {
          name: 'typeAttaque',
          type: 'string'
        },
        "scope": {
          name: 'scope',
          type: 'string'
        },
        "text": {
          name: 'text',
          type: 'string'
        },
        "book": {
          name: 'book',
          type: 'any'
        },
        "card": {
          name: 'card',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
