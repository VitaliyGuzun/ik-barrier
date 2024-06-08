import * as React from "react";
import { HEADER } from "../constants/content";
import {
  AMOUNT_KEY,
  DESCRIPTION_KEY,
  ITablesWithIds,
  NAME_KEY,
  PRISE_KEY,
  SIZE_KEY,
  TOTAL_KEY,
} from "../types";
import { SizeSelect } from "./SizeSelect";
import { AmountInput } from "./AmountInput";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Table = ({ tables }: { tables: ITablesWithIds }) => {
  return (
    <table className="min-w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            {HEADER[NAME_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
          >
            {HEADER[DESCRIPTION_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
          >
            {HEADER[SIZE_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
          >
            {HEADER[AMOUNT_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
          >
            {HEADER[TOTAL_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
          >
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      {tables.map((table, index) => {
        return (
          <tbody key={index}>
            <tr className="border-t border-gray-200">
              <th
                colSpan={6}
                scope="colgroup"
                className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
              >
                {table.title}
              </th>
            </tr>
            {table.models.map((model, index) => {
              const isSizeAvailable = Object.keys(model[PRISE_KEY]).length > 1;

              return (
                <tr key={index}>
                  <td
                    className={classNames(
                      index !== table.models.length - 1
                        ? "border-b border-gray-200 w-32"
                        : "",
                      "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 w-32"
                    )}
                  >
                    {model[NAME_KEY]}
                  </td>
                  <td
                    className={classNames(
                      index !== table.models.length - 1
                        ? "border-b border-gray-200 text-wrap max-w-64"
                        : "",
                      "hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell text-wrap max-w-64"
                    )}
                  >
                    {model[DESCRIPTION_KEY]}
                  </td>
                  <td
                    className={classNames(
                      index !== table.models.length - 1
                        ? "border-b border-gray-200 w-40"
                        : "",
                      "hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell w-40"
                    )}
                  >
                    {isSizeAvailable && (
                      <SizeSelect
                        index={0}
                        sizes={model[PRISE_KEY]}
                        id={model.id}
                      />
                    )}
                  </td>
                  <td
                    className={classNames(
                      index !== table.models.length - 1
                        ? "border-b border-gray-200"
                        : "",
                      "whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-40"
                    )}
                  >
                    <AmountInput id={model.id} index={index} />
                  </td>
                  <td
                    className={classNames(
                      index !== table.models.length - 1
                        ? "border-b border-gray-200"
                        : "",
                      "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    )}
                  >
                    {"TOTAL"}
                  </td>
                  <td
                    className={classNames(
                      index !== table.models.length - 1
                        ? "border-b border-gray-200"
                        : "",
                      "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                    )}
                  >
                    ОЧИСТИТЬ
                  </td>
                </tr>
              );
            })}
          </tbody>
        );
      })}
    </table>
  );
};
