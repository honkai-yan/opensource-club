import { User } from "./definition";

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
  role: "",
  department: "",
  group_name: "",
  direction: "",
};

export const adminRoles = ["会长", "副会长", "秘书处"];
