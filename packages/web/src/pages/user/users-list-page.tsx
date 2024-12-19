import {
  faArrowUpRightFromSquare,
  faSearch,
  faUsersGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Chip,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { $api, components, usePagination } from '@etu-access/lib';
import { Heading } from '@etu-access/lib';

interface MemoTableProps {
  isLoading: boolean;
  data?: components['schemas']['UsersResponseDTO'];
}

const columns = [
  {
    key: 'details',
    label: '',
  },
  {
    key: 'firstName',
    label: 'First name',
  },
  {
    key: 'lastName',
    label: 'Last name',
  },
  {
    key: 'email',
    label: 'E-mail',
  },
  {
    key: 'isAdmin',
    label: 'Is admin',
  },
  {
    key: 'id',
    label: 'Id',
  },
];

const MemoTable = memo(({ isLoading, data }: MemoTableProps) => {
  const navigate = useNavigate();

  const renderCell = useCallback(
    (user: components['schemas']['UserDTO'], columnKey: React.Key) => {
      const cellValue =
        user[columnKey as keyof components['schemas']['UserDTO']];

      switch (columnKey) {
        case 'details':
          return (
            <Button
              variant="bordered"
              size="sm"
              isIconOnly
              onPress={() => navigate(`/dashboard/users/${user.id}`)}
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
              ></FontAwesomeIcon>
            </Button>
          );
        case 'isAdmin':
          return user.isAdmin ? (
            <Chip color="success">Yes</Chip>
          ) : (
            <Chip color="default">No</Chip>
          );
        default:
          return cellValue;
      }
    },
    [navigate],
  );

  return (
    <div className="overflow-x-hidden">
      <Table
        aria-label="User list"
        isStriped
        shadow="none"
        classNames={{
          wrapper: 'border border-divider',
          td: 'whitespace-nowrap',
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No content'}
          loadingState={isLoading ? 'loading' : 'idle'}
          loadingContent={<Spinner color="primary" size="lg"></Spinner>}
          items={data?.items || []}
        >
          {(user) => (
            <TableRow key={user.id}>
              {(columnKey) => (
                <TableCell>{renderCell(user, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export default function UsersListPage() {
  const { handleChange, handleSubmit, setFieldValue, values, search } =
    usePagination();

  const { isLoading, data } = $api.useQuery('get', '/users', {
    params: {
      query: {
        page: values.page,
        search,
      },
    },
  });

  return (
    <div className="flex flex-col flex-1 p-[1rem] space-y-3">
      <Heading icon={faUsersGear} text="User list"></Heading>

      <form onSubmit={handleSubmit}>
        <Input
          classNames={{ inputWrapper: 'bg-background' }}
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

      <MemoTable isLoading={isLoading} data={data}></MemoTable>

      {data?.pages ? (
        <div className="flex justify-center">
          <Pagination
            variant="bordered"
            showControls
            total={data.pages}
            page={values.page}
            onChange={(page) => setFieldValue('page', page)}
          />
        </div>
      ) : null}
    </div>
  );
}
