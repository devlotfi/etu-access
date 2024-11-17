import { faDoorOpen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Pagination } from '@nextui-org/react';
import AccessControlItem from '../../components/access-control-item';
import { $api, PageLoading, usePagination } from '@etu-access/lib';
import { Heading } from '@etu-access/lib';

export default function AccessControlsListPage() {
  const { handleChange, handleSubmit, setFieldValue, values, search } =
    usePagination();

  const { isLoading, data } = $api.useQuery('get', '/access-controls/all', {
    params: {
      query: {
        page: values.page,
        search,
      },
    },
  });

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-1 flex-col w-full max-w-screen-lg p-[1rem] space-y-3">
        <Heading icon={faDoorOpen} text="Access controls list"></Heading>

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

        {isLoading ? (
          <PageLoading></PageLoading>
        ) : data && data.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-[1rem]">
            {data?.items.map((accessControl) => (
              <AccessControlItem
                key={accessControl.id}
                accessControl={accessControl}
              ></AccessControlItem>
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
