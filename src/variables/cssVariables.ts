/** @desc Re-export parsed and typed scss variables */

import * as cssVariables from './variables-export.scss';

// See pre-exports in `variables-export.scss`
export interface TVariables {
  blockTopMenu: string;
  blockNavHeader: string;
  blockResponses: string;
}

const vars = cssVariables as TVariables;

const {
  // prettier-ignore
  blockTopMenu,
  blockNavHeader,
  blockResponses,
} = vars;

export {
  // prettier-ignore
  blockTopMenu,
  blockNavHeader,
  blockResponses,
};
