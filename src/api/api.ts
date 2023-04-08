import request from './request'

interface AdminLoginData {
    password: string,
    username: string
}

type PromiseRes<T = {}> = Promise<MabageResult<T>>

interface MabageResult<T> {
    code: number,
    data: T,
    // message: string
}

// 登录返回接口
interface AdminLoginRes {
    token: string
    tokenHead: string
}

// 当前的用户信息
interface AdminInfoRes {
    menus: [
        {
            id: number,
            parentId: number
        }
    ]
}

interface AdminListParams {
    keyword: string
    pageNum: number
    pageSize: number
}
 
// 登录返回token
export const adminLoginApi = (data: AdminLoginData): PromiseRes<AdminLoginRes> => request.post("/admin/login",data)

// 获取当前登录的用户信息
export const getAdminInfoApi = (): PromiseRes<AdminInfoRes> => 
request.get("/admin/info") 

// 获取用户数据列表
export const getAdminList = (data: AdminListParams): PromiseRes<{list: {}[]}> => 
request.get('/admin/list',{params: data})

// 修改用户xinxi
export const updateAdmin = (id: number,data: AdminObjItf): PromiseRes => 
request.post("/admin/update/" + id,data)

// 获取所有角色
export const getRoleListAll = ():PromiseRes<RoleObjItf[]> => 
request.get("/role/listAll")

// 根据用户id获取角色
export const getAdminRoleById = (id: number): PromiseRes<RoleObjItf[]> => 
request.get("/admin/role/" + id)

// 分配用户角色
export const updateAdminRole = (data: {adminId: number; roleIds: string}):PromiseRes => 
request.post("/admin/role/update",null,{params: data})
// form-data
// export const updateAdminRole = (data: {adminId: number; roleIds: number[]}):PromiseRes => 
// request.post("/admin/role/update",)