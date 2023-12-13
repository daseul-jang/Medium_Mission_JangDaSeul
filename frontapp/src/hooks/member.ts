import { JoinInfo } from '@/model/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchJoin } from './api-fetcher/memberFetcher';
import { useRouter } from 'next/navigation';

interface JoinProps {}

export const useJoin = (member: JoinInfo, afterAuthViewHandler: () => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitJoin,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => fetchJoin(member),
    onSuccess: (res) => {
      console.log('회원가입 성공');
      console.log(res);

      if (!(res.data.status >= 200 && res.data.status < 400)) {
        alert('회원가입에 실패했어요 🥴');
        return;
      }

      //alert('회원가입에 성공했어요! 🎉');
      afterAuthViewHandler();
    },
    onError: (err) => {
      console.log('회원가입 실패');
      console.log(err);
    },
  });

  return { submitJoin, isPending, isError };
};
