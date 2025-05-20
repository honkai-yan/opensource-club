import { query } from "./connection";
import { User } from "./definition";

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
  return await query(`select pos_id from users_positions where user_id = ?`, [id]);
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
  let [user] = (await query(queryUserSQL + ` where u.id = ?`, [id])) as User[];
  return user as User;
};
