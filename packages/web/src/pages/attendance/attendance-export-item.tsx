import { $api, components, Utils } from '@etu-access/lib';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardBody } from '@nextui-org/react';
import * as XLSX from 'xlsx';

interface Props {
  attendanceExport: components['schemas']['AttendanceExportDTO'];
}

export default function AttendanceExportItem({ attendanceExport }: Props) {
  const { mutate, isPending } = $api.useMutation(
    'get',
    '/attendance/students/{id}',
    {
      onSuccess(data) {
        try {
          console.log(data);

          const rows = data.map((item) => ({
            Timestamp: Utils.formatDateTime(new Date(item.timestamp)),
            'First name': item.student.firstName,
            'Last name': item.student.lastName,
            Registration: item.student.registration,
            'Card ID': item.student.cardId,
            Speciality: item.student.speciality,
            Section: item.student.section,
            'Directed work group': item.student.directedWorkGroup,
            'Practical work group': item.student.practicalWorkGroup,
          }));

          const worksheet = XLSX.utils.json_to_sheet(rows);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          XLSX.writeFile(
            workbook,
            `attendance-list-${attendanceExport.id}.xlsx`,
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
  );

  return (
    <Card shadow="none" className="border border-divider">
      <CardBody className="flex-row justify-between items-center">
        <div className="flex space-x-2">
          <div className="flex">
            {Utils.formatDateTime(new Date(attendanceExport.timestamp))}
          </div>
          <div className="flex text-primary">
            ({attendanceExport._count.attendances} attendance)
          </div>
        </div>

        <Button
          isLoading={isPending}
          startContent={<FontAwesomeIcon icon={faFileExcel}></FontAwesomeIcon>}
          color="primary"
          className="bg-[#077b3e]"
          onPress={() => {
            mutate({
              params: {
                path: {
                  id: attendanceExport.id,
                },
              },
            });
          }}
        >
          Export as XLSX
        </Button>
      </CardBody>
    </Card>
  );
}
