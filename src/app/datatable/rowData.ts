import { signal, computed, Signal } from "@preact/signals-react";

export const numberTypes = new Set(["age", "visits", "progress"]);

export const dataRows = [
  {
    firstName: "Freddie",
    lastName: "Mann",
    age: 10,
    visits: 591,
    progress: 65,
    status: "complicated",
  },
  {
    firstName: "Chaim",
    lastName: "Schultz",
    age: 0,
    visits: 403,
    progress: 98,
    status: "complicated",
  },
  {
    firstName: "Hadley",
    lastName: "Heaney",
    age: 4,
    visits: 911,
    progress: 79,
    status: "relationship",
  },
  {
    firstName: "Lempi",
    lastName: "Maggio",
    age: 19,
    visits: 407,
    progress: 61,
    status: "single",
  },
  {
    firstName: "Miles",
    lastName: "Rice",
    age: 10,
    visits: 519,
    progress: 31,
    status: "relationship",
  },
  {
    firstName: "Justen",
    lastName: "Dickinson",
    age: 26,
    visits: 766,
    progress: 20,
    status: "single",
  },
  {
    firstName: "Cameron",
    lastName: "Crooks",
    age: 22,
    visits: 775,
    progress: 68,
    status: "single",
  },
  //   {
  //     firstName: "Cesar",
  //     lastName: "Thiel-Berge",
  //     age: 24,
  //     visits: 875,
  //     progress: 38,
  //     status: "complicated",
  //   },
  //   {
  //     firstName: "Rossie",
  //     lastName: "Satterfield",
  //     age: 21,
  //     visits: 649,
  //     progress: 82,
  //     status: "complicated",
  //   },
].map((el) => {
  const entries = Object.entries(el);
  return entries.reduce((acc, [k, v]) => {
    if (numberTypes.has(k)) {
      acc[k] = signal(v);
    } else {
      acc[k] = v;
    }
    return acc;
  }, {} as typeof el);
}) as unknown as {
  firstName: string;
  lastName: string;
  age: Signal<number>;
  visits: Signal<number>;
  progress: Signal<number>;
  status: string;
}[];

const getTotal = (accessorKey: string) =>
  dataRows.reduce((acc, el) => {
    return acc + el[accessorKey].value;
  }, 0);

export const totalRow = {
  firstName: "Total",
  lastName: "",
  age: computed(() => getTotal("age")),
  visits: computed(() => getTotal("visits")),
  progress: computed(() => getTotal("progress")),
  status: "",
  type: "aggregate",
};

export const rowData = dataRows.concat(totalRow);
