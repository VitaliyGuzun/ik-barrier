import { useContext } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { TableContext } from "../store/TableContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ISizeSelect {
  sizes: Record<string, number>;
  id: string;
  index: number;
}

export const SizeSelect = ({ sizes, id, index }: ISizeSelect) => {
  const options = Object.keys(sizes).sort();
  const context = useContext(TableContext);
  const valueSizes = context.valueSizes[id];

  const onChange = (value: number): void => {
    const newModelSizes = valueSizes.map((item, i) =>
      i === index ? Number(value) : item
    );
    context.setValueSizes({ ...context.valueSizes, [id]: newModelSizes });
  };

  const value = valueSizes[index];

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative max-w-24">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <span className="block truncate">{`${value} м`}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            show={open}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <ListboxOption
                  key={index}
                  className={({ focus }) =>
                    classNames(
                      focus ? "bg-indigo-600 text-white" : "",
                      !focus ? "text-gray-900" : "",
                      "relative cursor-default select-none py-2 pl-8 pr-4"
                    )
                  }
                  value={option}
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {`${option} м`}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            focus ? "text-white" : "text-indigo-600",
                            "absolute inset-y-0 left-0 flex items-center pl-1.5"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
