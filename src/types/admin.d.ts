interface AdminObjItf {
    id?: number
    username?: string
    nickName?: string
    email?: string
    password?: string
    note?: string
    status?: number
  }

interface AdminRoleFormDate {
  userRoles: RoleObjItf[]
  roleLists: RoleObjItf[]
  adminId: number,
}