import React from "react";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, Pagination } from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {columns, users, statusOptions, languageOptions, typeOptions} from "./data";
import {capitalize} from "./utils";
import { useNavigate } from "react-router-dom";


export default function Movies() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState("all");
  const [sucursalFilter, setsucursalFilter] = React.useState("all");
  const [languageFilter, setLanguageFilter] = React.useState("all");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState("");
  const [page, setPage] = React.useState(1);
  const navigate=useNavigate();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (sucursalFilter !== "all" && Array.from(sucursalFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(sucursalFilter).includes(user.sucursal),
      );
    }
    if (languageFilter !== "all" && Array.from(languageFilter).length !== languageOptions.length) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(languageFilter).includes(user.language),
        );
    }
    if (typeFilter !== "all" && Array.from(typeFilter).length !== typeOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(typeFilter).includes(user.type),
      );
    }

    return filteredUsers;
  }, [users, filterValue, sucursalFilter, languageFilter, typeFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div>
            <figure>
                <img className="posters" src={user.avatar} />
            </figure>
            <div>
					    <p className="titles">{user.name}</p>
              
				    </div>
            <Button onClick={()=>{navigate("/cine/peliculas/entradas/")}} className="btn-cartelera">
              Conseguir entradas
            </Button>
            </div>
        );
      case "detalles":
        return (
          <div>
            {user.description}
            <div>
              <div>
                Idioma:
                <Chip className="capitalize" size="sm" variant="flat">
                  {user.language}
                </Chip>
              </div>
              <div>
                Duración:
                <Chip className="capitalize" size="sm" variant="flat">
                  {user.duration}
                </Chip>
              </div>
              <div>
                Género:
                <Chip className="capitalize" size="sm" variant="flat">
                  {user.type}
                </Chip>
              </div>
              <div>
                Clasificación:
                <Chip className="capitalize" size="sm" variant="flat">
                  {user.classification}
                </Chip>
              </div>
              <div>
                Hora:
                <Chip className="capitalize" size="sm" variant="flat">
                  {user.time}
                </Chip>
              </div>
              <div>
                Sucursal:
                <Chip className="capitalize" size="sm" variant="flat">
                  {user.sucursal}
                </Chip>
              </div>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 paddings">
        <div className="flex justify-between gap-3 items-center">
          <Input
            isClearable
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button className="paddings" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Sucursal
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={sucursalFilter}
                selectionMode="multiple"
                onSelectionChange={setsucursalFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button className="paddings" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Idioma
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={languageFilter}
                selectionMode="multiple"
                onSelectionChange={setLanguageFilter}
              >
                {languageOptions.map((language) => (
                  <DropdownItem key={language.uid} className="capitalize">
                    {capitalize(language.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button className="paddings" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Género
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={typeFilter}
                selectionMode="multiple"
                onSelectionChange={setTypeFilter}
              >
                {typeOptions.map((type) => (
                  <DropdownItem key={type.uid} className="capitalize">
                    {capitalize(type.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">{users.length} resultados en total.</span>
          <label className="flex items-center text-default-400 text-small">
            Resultados por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    sucursalFilter,
    languageFilter,
    typeFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="sm:flex w-[30%] justify-end gap-2">
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Ninguna película cumple con los filtros."} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
