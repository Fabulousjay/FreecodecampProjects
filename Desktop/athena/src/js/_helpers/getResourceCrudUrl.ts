import pluralize from "pluralize";

export const GET_COLLECTION = "GET_COLLECTION";
export const GET_COLLECTION_ITEM = "GET_COLLECTION_ITEM";
export const POST_COLLECTION_ITEM = "POST_COLLECTION_ITEM";
export const PUT_COLLECTION_ITEM = "PUT_COLLECTION_ITEM";
export const DELETE_COLLECTION_ITEM = "DELETE_COLLECTION_ITEM";

const API_URL = process.env.REACT_APP_API_URL;

interface ResourceCrudUrlProps {
  type:
    | "GET_COLLECTION"
    | "GET_COLLECTION_ITEM"
    | "POST_COLLECTION_ITEM"
    | "PUT_COLLECTION_ITEM"
    | "DELETE_COLLECTION_ITEM";
  params: { resource: string; identifier?: string };
}

export const getResourceCrudUrl = ({
  type,
  params: { resource, identifier },
}: ResourceCrudUrlProps): string | null => {
  switch (type) {
    case GET_COLLECTION:
      return `${API_URL}\\${pluralize(resource)}`;
    case POST_COLLECTION_ITEM:
    case GET_COLLECTION_ITEM:
    case PUT_COLLECTION_ITEM:
    case DELETE_COLLECTION_ITEM:
      return `${API_URL}\\${pluralize(resource)}\\${identifier}`;
    default:
      return null;
  }
};
