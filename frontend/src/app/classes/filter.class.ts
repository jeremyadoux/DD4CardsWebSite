import { LoopBackFilter } from '../shared/sdk/models/BaseModels';

export class FilterClass implements LoopBackFilter {
  fields?: any;
  include?: any;
  limit?: any;
  order?: any;
  skip?: any;
  offset?: any;
  where?: any;
}
