import * as React from "react";
import { Table } from "./components/Table";
import { useAmounts } from "./hooks/useAmounts";
import { usePrises } from "./hooks/usePrises";
import {
  TableContext,
  contentWithIds,
  defaultValueSizes,
  defaultValueAmounts,
} from "./store/TableContext";
import "./App.css";

export default function Example() {
  const [valueSizes, setValueSizes] = React.useState(defaultValueSizes);
  const [valueAmounts, setValueAmounts] = useAmounts(defaultValueAmounts);
  const valuePrises = usePrises(valueSizes, valueAmounts);

  const clearValue = (id: string, index: number) => {
    const modelSizes = valueSizes[id].filter((_, i) => i !== index);
    setValueSizes({
      ...valueSizes,
      [id]: modelSizes.length ? modelSizes : [0],
    });

    const modelAmounts = valueAmounts[id].filter((_, i) => i !== index);
    setValueAmounts({
      ...valueAmounts,
      [id]: modelAmounts.length ? modelAmounts : [0],
    });
  };

  const addSize = (id: string) => {
    setValueSizes({ ...valueSizes, [id]: [...valueSizes[id], 0] });
    setValueAmounts({ ...valueAmounts, [id]: [...valueAmounts[id], 0] });
  };

  return (
    <TableContext.Provider
      value={{
        valueSizes,
        setValueSizes,
        valueAmounts,
        setValueAmounts,
        valuePrises,
        clearValue,
        addSize,
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Предварительный расчет
            </h1>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <Table tables={contentWithIds} />
            </div>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}
