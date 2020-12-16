import { head, keys, startCase } from "lodash";
import React, { FC, memo, useEffect, useState } from "react";
import { List, ListProps } from "./List";

export interface ResourceListFieldProps {
  value: (data: any, rowIndex?: number) => any;
  label: string;
}

export interface ResourceListConfigProps {
  source: string;
  list?: {
    fields: ResourceListFieldProps[];
  };
}

export interface RListProps extends Partial<ListProps> {
  config: ResourceListConfigProps;
}

export const ResourceList: FC<RListProps> = memo(
  ({ config: { source, list }, collection }) => {
    const [headers, setHeaders] = useState<string[]>(
      list?.fields.map(({ label }) => label) ?? [],
    );
    const [data, setData] = useState<string[][]>([]);
    const [fields, setFields] = useState<ResourceListFieldProps[]>(
      list?.fields ?? [],
    );

    useEffect(() => {
      if (!headers) {
        setHeaders(keys(head(collection)).map((item) => startCase(item)));
      }

      if (fields && collection) {
        setData(collection.map((row) => fields.map(({ value }) => value(row))));
      }
    }, [fields, collection, setFields]);

    return (
      <div className="list list__resource">
        <div className="list__head">
          <h2 className="list__title">{source}</h2>
        </div>
        {fields && <List headers={headers} collection={data} />}
      </div>
    );
  },
);
