import { Form, useSearchParams } from "@remix-run/react";

export default function SearchForm({ query, placeholder = "Search..." }: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Form
      method="get"
      className="flex  lg:max-w-[500px] rounded-lg border-gray-400 border-opacity-65 border bg-gray-100 px-2"
    >
      <input
        type="text"
        name="q"
        className="flex w-full bg-transparent px-3 text-gray-700 rtl:text-right outline-0"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />

      <div className="border-gray-400 border-opacity-70 my-1 border-l"></div>

      <button
        type="submit"
        className="relative rounded-full bg-transparent px-2 py-3"
      >
         🔍
      </button>
    </Form>
  );
}
