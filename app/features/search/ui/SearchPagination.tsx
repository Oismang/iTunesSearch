"use client";

import Pagination from '@mui/material/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SearchPagination({
  pages
}: {
  pages: number
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleOnChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination
      count={pages}
      sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      page={parseInt(searchParams.get('page')?.toString() || "1")}
      onChange={handleOnChange}
    />
  )
}