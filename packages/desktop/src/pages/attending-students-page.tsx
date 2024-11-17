import {
  faArrowUpRightFromSquare,
  faSearch,
  faTrash,
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
  useDisclosure,
} from '@nextui-org/react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { $api, components, usePagination, Utils } from '@etu-access/lib';
import { Heading } from '@etu-access/lib';
import { AttendanceStore } from '../attendance-store';
import { ResetAttendanceListModal } from '../components/reset-attendance-list-modal';
import { ExportAttandanceListModal } from '../components/export-attendance-list-modal';

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
    key: 'cardId',
    label: 'Card Id',
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

export default function AttendingStudentsListPage() {
  const { handleChange, handleSubmit, setFieldValue, values, search } =
    usePagination();
  const {
    isOpen: resetAttendanceListModalIsOpen,
    onOpenChange: resetAttendanceListModalonOpenChange,
    onOpen: resetAttendanceListModalOnOpen,
  } = useDisclosure();
  const {
    isOpen: exportAttendanceListModalIsOpen,
    onOpenChange: exportAttendanceListModalonOpenChange,
    onOpen: exportAttendanceListModalOnOpen,
  } = useDisclosure();

  const { isLoading, data } = $api.useQuery(
    'post',
    '/students/student-id-cards',
    {
      params: {
        query: {
          page: values.page,
          search,
        },
      },
      body: {
        studentIdCards: AttendanceStore.attendanceList.map(
          (attendance) => attendance.cardId,
        ),
      },
    },
  );

  return (
    <div className="flex flex-col flex-1 p-[1rem] space-y-3">
      <div className="flex items-center justify-between">
        <Heading
          icon={faUsers}
          text={`Attending students list (${data ? data.items.length : ''})`}
        ></Heading>
        <div className="flex space-x-1">
          <Button
            variant="bordered"
            color="danger"
            startContent={<FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>}
            onPress={() => resetAttendanceListModalOnOpen()}
          >
            Reset
          </Button>
          <Button
            color="primary"
            startContent={
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
              ></FontAwesomeIcon>
            }
            onPress={() => exportAttendanceListModalOnOpen()}
          >
            Export
          </Button>
        </div>
      </div>

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

      <ResetAttendanceListModal
        isOpen={resetAttendanceListModalIsOpen}
        onOpenChange={resetAttendanceListModalonOpenChange}
      ></ResetAttendanceListModal>
      <ExportAttandanceListModal
        isOpen={exportAttendanceListModalIsOpen}
        onOpenChange={exportAttendanceListModalonOpenChange}
      ></ExportAttandanceListModal>
    </div>
  );
}
