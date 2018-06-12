/* tslint:disable */
import {
  Power
} from '../index';

declare var Object: any;
export interface GroupPowerInterface {
  "name": string;
  "id"?: any;
  powers?: Power[];
}

export class GroupPower implements GroupPowerInterface {
  "name": string;
  "id": any;
  powers: Power[];
  constructor(data?: GroupPowerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `GroupPower`.
   */
  public static getModelName() {
    return "GroupPower";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of GroupPower for dynamic purposes.
  **/
  public static factory(data: GroupPowerInterface): GroupPower{
    return new GroupPower(data);
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
      name: 'GroupPower',
      plural: 'GroupPowers',
      path: 'GroupPowers',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        powers: {
          name: 'powers',
          type: 'Power[]',
          model: 'Power',
          relationType: 'hasMany',
          modelThrough: 'GroupPowerPower',
          keyThrough: 'powerId',
          keyFrom: 'id',
          keyTo: 'groupPowerId'
        },
      }
    }
  }
}
