import { query } from "./connection";
import { AccessTokenPayload, User } from "./definition";
import { cookies } from "next/headers";
import { verifyJwt } from "./utils/jwt";

const queryUserSQL = `
    select
        u.id,
        u.name,
        u.nick_name,
        u.description,
        u.avatar_src,
        p.name as role,
        sd.name as direction,
        d.name as department
    from users u
    -- 职位信息
    left join users_positions up on u.id = up.user_id
    left join positions p on up.pos_id = p.id
    -- 学习方向信息
    left join users_study_directions usd on u.id = usd.user_id
    left join study_directions sd on usd.study_dir_id = sd.id
    -- 部门
    left join users_departments ud on u.id = ud.user_id
    left join departments d on ud.dep_id = d.id
  `;

export async function queryUserRoleIdById(id: number) {
  const [result] = await query(`select pos_id from users_positions where user_id = ?`, [id]);
  return result as number;
}

export async function queryUsersByName(name: string) {
  let users: User[];
  if (name === "") {
    users = await query(queryUserSQL);
  } else {
    users = await query(queryUserSQL + ` where u.name like ? or u.nick_name like ?`, [`%${name}%`, `%${name}%`]);
  }
  return users as User[];
}

export const queryUserById = async (id: number) => {
  let user: User[] = await query(queryUserSQL + ` where u.id = ?`, [id]);
  return user[0];
};

export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")!.value;
    const userdata: AccessTokenPayload = (await verifyJwt(accessToken)) as any;
    const user = await queryUserById(userdata.userId);
    return user;
  } catch (err) {
    return null;
  }
};
