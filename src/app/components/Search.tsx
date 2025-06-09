import Image from "next/image";


import React, { useEffect, useState } from "react";
export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState("") //useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  return (
 
    <div className="relative w-full md:max-w-[480px]">
      <div className="flex h-[52px] flex-1 items-center gap-3 rounded-full px-4 shadow-drop-3">
        <Image
          src="images/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <input
          value={query}
          placeholder="Search..."
          className="search-input body-2 shad-no-focus  placeholder:body-1 w-full border-none p-0 shadow-none placeholder:text-light-200 focus: bg-grey-300"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <>
          </>
        )}
      </div>
    </div>
  );
}
    