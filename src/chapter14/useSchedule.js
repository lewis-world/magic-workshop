// hooks/useSchedule.js
import { useEffect, useState } from 'react';
import { mockSupabase } from './mockSupabase';
import { unstable_cache } from './cache';

const getSchedule = unstable_cache(
  async () => {
    const { data } = await mockSupabase
      .from('schedule')
      .select();
    return data;
  },
  ['schedule'],
  { revalidate: 3600 } // 1小时缓存
);

export function useSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSchedule();
      setSchedule(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { schedule, loading };
}