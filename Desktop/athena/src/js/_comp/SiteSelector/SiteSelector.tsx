import { CircularProgress, NativeSelect } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useState } from "react";
import { gql, useQuery } from "@apollo/client";
const GET_SITES = gql`
  query Get_Sites {
    sites {
      data {
        uuid
        name
      }
    }
  }
`;
interface Props {
  className?: string;
}
const useStyles = makeStyles({
  root: {
    width: 200,
  },
  control: {
    width: "100%",
  },
});
const SiteSelector: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_SITES);
  const classes = useStyles();
  const [selection, setSelection] = useState<string>("");
  const handleChange = useCallback(
    ({ target }) => {
      const value = target?.value;
      if (value) {
        setSelection(value);
      }
    },
    [setSelection],
  );
  const options: { value: any; label: string }[] = data?.sites?.data.map(
    (item: { uuid: string; name: string }) => ({
      label: item.name,
      value: item.uuid,
    }),
  );
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    <div> {error.message} </div>;
  }
  return (
    <div className={classes.root}>
      <NativeSelect
        value={selection}
        onChange={handleChange}
        inputProps={{
          name: "site",
          id: "filled-site-native-simple",
        }}
      >
        <option aria-label="None" value="" disabled>
          Select a Site
        </option>
        {options?.map(({ label, value }, index) => (
          <option value={value} key={index}>
            {label}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
};
export default SiteSelector;
