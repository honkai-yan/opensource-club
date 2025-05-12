export type User = {
  id: number;
  name: string;
  password: string | null;
  nick_name: string;
  avatar_src: string;
  sch_id: string;
  description: string;

  cur_point: number;
  total_point: number;
  
  join_date: string;
  delete_date: string | null;
  is_deleted: boolean;
};
