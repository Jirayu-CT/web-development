'use client'

import { use, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';



const Search = () => {
  const searchParam = useSearchParams()
  const { replace } = useRouter()
  const [search, setSearch] = useState(searchParam.get("search")?.toString() || "")

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParam)

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    replace(`/?${params.toString()}`)


  }, 500)

  useEffect(() => {
    //code body
    if(!searchParam.get("search")) {
      setSearch('')
    }
  }, [searchParam.get("search")]);

  return (
    <Input
      type="text"
      placeholder="Search Camping..."
      className="max-w-xs"
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
      value={search}
    />
  )
}
export default Search