import {
  faArrowUpRightFromSquare,
  faSearch,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
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
import Heading from '../../components/heading';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { $api, components, usePagination, Utils } from '@etu-access/lib';

interface MemoTableProps {
  isLoading: boolean;
  data?: components['schemas']['StudentsResponseDTO'];
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
    key: 'dateOfBirth',
    label: 'Date of birth',
  },
  {
    key: 'registration',
    label: 'Registration',
  },
  {
    key: 'level',
    label: 'Level',
  },
  {
    key: 'speciality',
    label: 'Speciality',
  },
  {
    key: 'section',
    label: 'Section',
  },
  {
    key: 'directedWorkGroup',
    label: 'Directed Work Group',
  },
  {
    key: 'practicalWorkGroup',
    label: 'Practical Work Group',
  },
  {
    key: 'id',
    label: 'Id',
  },
];

const MemoTable = memo(({ isLoading, data }: MemoTableProps) => {
  const navigate = useNavigate();

  const renderCell = useCallback(
    (student: components['schemas']['StudentDTO'], columnKey: React.Key) => {
      const cellValue =
        student[columnKey as keyof components['schemas']['StudentDTO']];

      switch (columnKey) {
        case 'details':
          return (
            <Button
              variant="bordered"
              size="sm"
              isIconOnly
              onPress={() => navigate(`/dashboard/students/${student.id}`)}
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
              ></FontAwesomeIcon>
            </Button>
          );
        case 'dateOfBirth':
          return Utils.formatDate(new Date(student.dateOfBirth));
        default:
          return cellValue;
      }
    },
    [navigate],
  );

  return (
    <div className="overflow-x-hidden">
      <Table
        aria-label="Student list"
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
          {(student) => (
            <TableRow key={student.id}>
              {(columnKey) => (
                <TableCell>{renderCell(student, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export default function StudentsListPage() {
  const { handleChange, handleSubmit, setFieldValue, values, search } =
    usePagination();

  const { isLoading, data } = $api.useQuery('get', '/students', {
    params: {
      query: {
        page: values.page,
        search,
      },
    },
  });

  return (
    <div className="flex flex-col flex-1 p-[1rem] space-y-3">
      <Heading icon={faUsers} text="Students list"></Heading>

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
