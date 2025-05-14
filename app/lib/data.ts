import { User } from "./definition";
import { query } from "./connection";

export const defaultUserdata: User = {
  id: 0,
  name: "",
  nick_name: "",
  password: "",
  avatar_src: "",
  sch_id: "",
  description: "",
  cur_point: 0,
  total_point: 0,
  join_date: "",
  delete_date: null,
  is_deleted: false,
};

export async function getUserRoleIdById(id: number) {
  return await query(`select pos_id from users_positions where user_id = ?`, [id]);
}
