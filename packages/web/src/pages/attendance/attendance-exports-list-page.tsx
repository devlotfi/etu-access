import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '@nextui-org/react';
import { $api, PageLoading, usePagination } from '@etu-access/lib';
import { Heading } from '@etu-access/lib';
import { useParams } from 'react-router';
import AttendanceExportItem from './attendance-export-item';

export default function AttendanceExportsListPage() {
  const { id } = useParams();
  const { setFieldValue, values } = usePagination();

  const { isLoading, data } = $api.useQuery('get', '/attendance/{id}', {
    params: {
      path: {
        id: id!,
      },
      query: {
        page: values.page,
      },
    },
  });

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-1 flex-col w-full max-w-screen-lg p-[1rem] space-y-3">
        <Heading icon={faFileExport} text="Attendance exports list"></Heading>

        {isLoading ? (
          <PageLoading></PageLoading>
        ) : data && data.items.length > 0 ? (
          <div className="flex flex-col space-y-3 py-[1rem]">
            {data?.items.map((attendanceExport) => (
              <AttendanceExportItem
                key={attendanceExport.id}
                attendanceExport={attendanceExport}
              ></AttendanceExportItem>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 justify-center items-center">
            <div className="flex">No data</div>
          </div>
        )}

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
    </div>
  );
}
