import { Apis } from '@/constants/apis';
import { httpRequest } from '@/utils/axios';

export const parseIonFile = async (file: File) => {
  const form = new FormData();
  form.append('file', file);
  const { response } = await httpRequest({
    method: 'POST',
    url: Apis.ParseIonFile,
    data: form,
  });
  return response;
};
