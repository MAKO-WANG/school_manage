import { apiUrl } from './domain';
import { request } from './util';

// 登录
export const login = async (username: string, password: string) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/login/`,
    data: {
      username,
      password,
    },
  });
};

// 获取用户详情
export const getUserItem = async (id: number) => {
  return await request({
    url: `${apiUrl}/users/${id}/`,
  });
};

// 获取年级
export const getGrades = async (params?: Record<string, any>) => {
  return await request({
    url: `${apiUrl}/grades/`,
    params,
  });
};

// 获取年级详情
export const getGradeItem = async (id: number) => {
  return await request({
    url: `${apiUrl}/grades/${id}/`,
  });
};

// 新增年级
export const addGradeItem = async (name: string) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/grades/`,
    data: {
      name,
    },
  });
};

// 批量新增年级
export const bulkAddGradeItem = async (data: { name: string }[]) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/grades/bulk_create/`,
    data,
  });
};

// 修改年级
export const updateGradeItem = async (id: number, name: string) => {
  return await request({
    method: 'put',
    url: `${apiUrl}/grades/${id}/`,
    data: {
      name,
    },
  });
};

// 批量修改年级
export const bulkUpdateGradeItem = async (
  data: { id: number; name: string }[],
) => {
  return await request({
    method: 'put',
    url: `${apiUrl}/grades/bulk_update/`,
    data,
  });
};

// 删除年级
export const delGradeItem = async (id: number) => {
  return await request({
    method: 'delete',
    url: `${apiUrl}/grades/${id}/`,
  });
};

// 批量删除年级
export const bulkDelGradeItem = async (ids: number[]) => {
  return await request({
    method: 'delete',
    url: `${apiUrl}/grades/bulk_delete/`,
    params: { ids: ids.join(',') },
  });
};

// 获取班级
export const getGroups = async (params?: Record<string, any>) => {
  return await request({
    url: `${apiUrl}/groups/`,
    params,
  });
};

// 获取班级详情
export const getGroupItem = async (id: number) => {
  return await request({
    url: `${apiUrl}/groups/${id}/`,
  });
};

// 新增班级
export const addGroupItem = async (name: string, grade_id: number) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/groups/`,
    data: {
      name,
      grade_id,
    },
  });
};

// 修改班级
export const updateGroupItem = async (
  id: number,
  name: string,
  grade_id: number,
) => {
  return await request({
    method: 'put',
    url: `${apiUrl}/groups/${id}/`,
    data: {
      name,
      grade_id,
    },
  });
};

// 删除班级
export const delGroupItem = async (id: number) => {
  return await request({
    method: 'delete',
    url: `${apiUrl}/groups/${id}/`,
  });
};

// 获取学科
export const getSubjects = async (params?: Record<string, any>) => {
  return await request({
    url: `${apiUrl}/subjects/`,
    params,
  });
};

// 获取学科详情
export const getSubjectItem = async (id: number) => {
  return await request({
    url: `${apiUrl}/subjects/${id}/`,
  });
};

// 新增学科
export const addSubjectItem = async (name: string) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/subjects/`,
    data: {
      name,
    },
  });
};

// 修改学科
export const updateSubjectItem = async (id: number, name: string) => {
  return await request({
    method: 'put',
    url: `${apiUrl}/subjects/${id}/`,
    data: {
      name,
    },
  });
};

// 删除学科
export const delSubjectItem = async (id: number) => {
  return await request({
    method: 'delete',
    url: `${apiUrl}/subjects/${id}/`,
  });
};

// 获取老师
export const getTeachers = async (params?: Record<string, any>) => {
  return await request({
    url: `${apiUrl}/teachers/`,
    params,
  });
};

// 获取老师详情
export const getTeacherItem = async (id: number) => {
  return await request({
    url: `${apiUrl}/teachers/${id}/`,
  });
};

// 新增老师
export const addTeacherItem = async (data: Record<string, any>) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/teachers/`,
    data,
  });
};

// 修改老师
export const updateTeacherItem = async (
  id: number,
  data: Record<string, any>,
) => {
  return await request({
    method: 'put',
    url: `${apiUrl}/teachers/${id}/`,
    data,
  });
};

// 删除老师
export const delTeacherItem = async (id: number) => {
  return await request({
    method: 'delete',
    url: `${apiUrl}/teachers/${id}/`,
  });
};

// 获取老师职位
export const getJobs = async () => {
  return await request({
    url: `${apiUrl}/teachers/jobs/`,
    params: {
      current: 0,
    },
  });
};

// 获取老师状态
export const getStatus = async () => {
  return await request({
    url: `${apiUrl}/teachers/status/`,
    params: {
      current: 0,
    },
  });
};

// 获取学生
export const getStudents = async (params?: Record<string, any>) => {
  return await request({
    url: `${apiUrl}/students/`,
    params,
  });
};

// 获取学生详情
export const getStudentItem = async (id: number) => {
  return await request({
    url: `${apiUrl}/students/${id}/`,
  });
};

// 新增学生
export const addStudentItem = async (data: Record<string, any>) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/students/`,
    data,
  });
};

// 修改学生
export const updateStudentItem = async (
  id: number,
  data: Record<string, any>,
) => {
  return await request({
    method: 'put',
    url: `${apiUrl}/students/${id}/`,
    data,
  });
};

// 批量新增学生
export const bulkAddStudentItem = async (data: Record<string, any>[]) => {
  return await request({
    method: 'post',
    url: `${apiUrl}/students/bulk_create/`,
    data,
  });
};
