import { pick } from "lodash";

export const convertFromApiCollectionToListCollection = (
  collection: { [key: string]: any }[],
  fields: string[],
) => {
  return collection?.map((item) => {
    return Object.values(pick(item, [item?.uuid ? "uuid" : "id", ...fields]));
  });
};
