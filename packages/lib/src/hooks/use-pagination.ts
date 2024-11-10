import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { PaginationData } from '../types/pagination-data';

const initialValues: PaginationData = {
  search: '',
  page: 1,
};

export function usePagination() {
  const [search, setSearch] = useState<string>('');

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit(values) {
      setSearch(values.search);
    },
  });

  useEffect(() => {
    setFieldValue('page', 1);
  }, [search, setFieldValue]);

  return {
    search,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  };
}
