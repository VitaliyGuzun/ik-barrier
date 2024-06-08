import { HEADER } from "../constants/content";
import {
  AMOUNT_KEY,
  DESCRIPTION_KEY,
  ITablesWithIds,
  NAME_KEY,
  SIZE_KEY,
  TOTAL_KEY,
} from "../types";
import { Row } from "./Row";

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
            ИТОГО
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
              const isLast = index !== table.models.length - 1;

              return (
                <Row model={model} key={index} index={index} isLast={isLast} />
              );
            })}
          </tbody>
        );
      })}
    </table>
  );
};
