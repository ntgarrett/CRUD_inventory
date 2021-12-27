import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useUser() {
  const { data: user, mutate } = useSWR("/api/user", fetcher, { refreshInterval: 1 });

  return {
    user: user,
    mutate
  };
};