/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter8235 = { 'updatedBy': { '$in': user } };
      const Blog9591 = await deleteBlog(BlogFilter8235);
      const BlogFilter4274 = { 'addedBy': { '$in': user } };
      const Blog5793 = await deleteBlog(BlogFilter4274);
      const userFilter8506 = { 'addedBy': { '$in': user } };
      const user7798 = await deleteUser(userFilter8506);
      const userFilter2026 = { 'updatedBy': { '$in': user } };
      const user7721 = await deleteUser(userFilter2026);
      const userTokensFilter1432 = { 'userId': { '$in': user } };
      const userTokens7136 = await deleteUserTokens(userTokensFilter1432);
      const userTokensFilter1208 = { 'addedBy': { '$in': user } };
      const userTokens2455 = await deleteUserTokens(userTokensFilter1208);
      const userTokensFilter3216 = { 'updatedBy': { '$in': user } };
      const userTokens9779 = await deleteUserTokens(userTokensFilter3216);
      const roleFilter6417 = { 'addedBy': { '$in': user } };
      const role5952 = await deleteRole(roleFilter6417);
      const roleFilter6199 = { 'updatedBy': { '$in': user } };
      const role4966 = await deleteRole(roleFilter6199);
      const projectRouteFilter6485 = { 'addedBy': { '$in': user } };
      const projectRoute0708 = await deleteProjectRoute(projectRouteFilter6485);
      const projectRouteFilter8847 = { 'updatedBy': { '$in': user } };
      const projectRoute4540 = await deleteProjectRoute(projectRouteFilter8847);
      const routeRoleFilter9903 = { 'addedBy': { '$in': user } };
      const routeRole5612 = await deleteRouteRole(routeRoleFilter9903);
      const routeRoleFilter4732 = { 'updatedBy': { '$in': user } };
      const routeRole1170 = await deleteRouteRole(routeRoleFilter4732);
      const userRoleFilter4729 = { 'userId': { '$in': user } };
      const userRole3013 = await deleteUserRole(userRoleFilter4729);
      const userRoleFilter2533 = { 'addedBy': { '$in': user } };
      const userRole1961 = await deleteUserRole(userRoleFilter2533);
      const userRoleFilter9669 = { 'updatedBy': { '$in': user } };
      const userRole8570 = await deleteUserRole(userRoleFilter9669);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter8549 = { 'roleId': { '$in': role } };
      const routeRole3826 = await deleteRouteRole(routeRoleFilter8549);
      const userRoleFilter9774 = { 'roleId': { '$in': role } };
      const userRole5576 = await deleteUserRole(userRoleFilter9774);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter6840 = { 'routeId': { '$in': projectroute } };
      const routeRole5721 = await deleteRouteRole(routeRoleFilter6840);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter3213 = { 'updatedBy': { '$in': user } };
      const Blog2781 = await softDeleteBlog(BlogFilter3213, updateBody);
      const BlogFilter6613 = { 'addedBy': { '$in': user } };
      const Blog2587 = await softDeleteBlog(BlogFilter6613, updateBody);
      const userFilter1603 = { 'addedBy': { '$in': user } };
      const user9367 = await softDeleteUser(userFilter1603, updateBody);
      const userFilter9080 = { 'updatedBy': { '$in': user } };
      const user6073 = await softDeleteUser(userFilter9080, updateBody);
      const userTokensFilter3930 = { 'userId': { '$in': user } };
      const userTokens7415 = await softDeleteUserTokens(userTokensFilter3930, updateBody);
      const userTokensFilter0128 = { 'addedBy': { '$in': user } };
      const userTokens6990 = await softDeleteUserTokens(userTokensFilter0128, updateBody);
      const userTokensFilter6107 = { 'updatedBy': { '$in': user } };
      const userTokens3868 = await softDeleteUserTokens(userTokensFilter6107, updateBody);
      const roleFilter5726 = { 'addedBy': { '$in': user } };
      const role0984 = await softDeleteRole(roleFilter5726, updateBody);
      const roleFilter2477 = { 'updatedBy': { '$in': user } };
      const role1365 = await softDeleteRole(roleFilter2477, updateBody);
      const projectRouteFilter3094 = { 'addedBy': { '$in': user } };
      const projectRoute5979 = await softDeleteProjectRoute(projectRouteFilter3094, updateBody);
      const projectRouteFilter8886 = { 'updatedBy': { '$in': user } };
      const projectRoute0134 = await softDeleteProjectRoute(projectRouteFilter8886, updateBody);
      const routeRoleFilter9869 = { 'addedBy': { '$in': user } };
      const routeRole4172 = await softDeleteRouteRole(routeRoleFilter9869, updateBody);
      const routeRoleFilter2618 = { 'updatedBy': { '$in': user } };
      const routeRole8485 = await softDeleteRouteRole(routeRoleFilter2618, updateBody);
      const userRoleFilter2371 = { 'userId': { '$in': user } };
      const userRole4779 = await softDeleteUserRole(userRoleFilter2371, updateBody);
      const userRoleFilter7910 = { 'addedBy': { '$in': user } };
      const userRole6043 = await softDeleteUserRole(userRoleFilter7910, updateBody);
      const userRoleFilter5304 = { 'updatedBy': { '$in': user } };
      const userRole2626 = await softDeleteUserRole(userRoleFilter5304, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9823 = { 'roleId': { '$in': role } };
      const routeRole5635 = await softDeleteRouteRole(routeRoleFilter9823, updateBody);
      const userRoleFilter7126 = { 'roleId': { '$in': role } };
      const userRole9846 = await softDeleteUserRole(userRoleFilter7126, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5031 = { 'routeId': { '$in': projectroute } };
      const routeRole5354 = await softDeleteRouteRole(routeRoleFilter5031, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
