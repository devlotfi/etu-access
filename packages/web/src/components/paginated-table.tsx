import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Input, Pagination } from '@nextui-org/react';
import { ChangeEventHandler, FormEventHandler, PropsWithChildren } from 'react';
import { FormikErrors } from 'formik';
import { components, PaginationData } from '@etu-access/lib';

interface Props<T extends components['schemas']['PaginationResult']> {
  data?: T;
  values: PaginationData;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<PaginationData>>;
}

export default function PaginatedTable<
  T extends components['schemas']['PaginationResult'],
>({
  children,
  data,
  handleChange,
  handleSubmit,
  setFieldValue,
  values,
}: PropsWithChildren<Props<T>>) {
  return (
    <div className="overflow-x-hidden">
      <Table
        aria-label="Table"
        isStriped
        shadow="none"
        classNames={{
          wrapper: 'border border-divider',
        }}
        topContent={
          <form onSubmit={handleSubmit} className="flex">
            <Input
              name="search"
              value={values.search}
              onChange={handleChange}
              variant="bordered"
              type="text"
              label="Search"
              placeholder="Search"
              startContent={<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>}
            />
          </form>
        }
        bottomContent={
          data?.pages ? (
            <div className="flex justify-center">
              <Pagination
                variant="bordered"
                showControls
                total={data.pages}
                page={values.page}
                initialPage={values.page}
                onChange={(page) => setFieldValue('page', page)}
              />
            </div>
          ) : null
        }
      >
        {children as unknown as never}
      </Table>
    </div>
  );
}
