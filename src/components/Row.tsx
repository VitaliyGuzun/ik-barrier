import { DESCRIPTION_KEY, IModelWithId, NAME_KEY, PRISE_KEY } from "../types";
import { SizeSelect } from "./SizeSelect";
import { AmountInput } from "./AmountInput";
import { TableContext } from "../store/TableContext";
import { useContext } from "react";
import { formatPrice } from "../utils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IRow {
  model: IModelWithId;
  index: number;
  isLast: boolean;
}

export const Row = ({ model, index, isLast }: IRow) => {
  const isSizeAvailable = Object.keys(model[PRISE_KEY]).length > 1;
  const context = useContext(TableContext);
  const modelTotals = context.valuePrises[model.id];

  return (
    <tr>
      <td
        className={classNames(
          isLast ? "border-b border-gray-200 w-32" : "",
          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 w-32"
        )}
      >
        {model[NAME_KEY]}
      </td>
      <td
        className={classNames(
          isLast ? "border-b border-gray-200 text-wrap max-w-64" : "",
          "hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell text-wrap max-w-64"
        )}
      >
        {model[DESCRIPTION_KEY]}
      </td>
      <td
        className={classNames(
          isLast ? "border-b border-gray-200 w-32" : "",
          "hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell w-32"
        )}
      >
        {isSizeAvailable && (
          <SizeSelect index={0} sizes={model[PRISE_KEY]} id={model.id} />
        )}
      </td>
      <td
        className={classNames(
          isLast ? "border-b border-gray-200 w-32" : "",
          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-32"
        )}
      >
        <AmountInput id={model.id} index={index} />
      </td>
      <td
        className={classNames(
          isLast ? "border-b border-gray-200 w-48" : "",
          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-48"
        )}
        colSpan={2}
      >
        {modelTotals.map((total, index) => {
          return (
            <div key={index} className="flex w-full justify-between">
              <div>{total ? formatPrice(total) : ""}</div>
              {!!total && (
                <button
                  type="button"
                  className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
                  onClick={() => context.clearValue(model.id, index)}
                >
                  Очистить
                </button>
              )}
              <button
                type="button"
                className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
                onClick={() => context.addSize(model.id)}
              >
                Добавить размер
              </button>
            </div>
          );
        })}
      </td>
    </tr>
  );
};
