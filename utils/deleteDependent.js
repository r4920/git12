/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Event = require('../model/Event');
let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteEvent = async (filter) =>{
  try {
    return await Event.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

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
      const EventFilter6865 = { 'updatedBy': { '$in': user } };
      const Event0786 = await deleteEvent(EventFilter6865);
      const EventFilter7841 = { 'addedBy': { '$in': user } };
      const Event7953 = await deleteEvent(EventFilter7841);
      const BlogFilter2167 = { 'updatedBy': { '$in': user } };
      const Blog1708 = await deleteBlog(BlogFilter2167);
      const BlogFilter0830 = { 'addedBy': { '$in': user } };
      const Blog7213 = await deleteBlog(BlogFilter0830);
      const userFilter9578 = { 'addedBy': { '$in': user } };
      const user7433 = await deleteUser(userFilter9578);
      const userFilter8056 = { 'updatedBy': { '$in': user } };
      const user7900 = await deleteUser(userFilter8056);
      const userTokensFilter8663 = { 'userId': { '$in': user } };
      const userTokens2282 = await deleteUserTokens(userTokensFilter8663);
      const userTokensFilter2024 = { 'addedBy': { '$in': user } };
      const userTokens3969 = await deleteUserTokens(userTokensFilter2024);
      const userTokensFilter0654 = { 'updatedBy': { '$in': user } };
      const userTokens8959 = await deleteUserTokens(userTokensFilter0654);
      const roleFilter1108 = { 'addedBy': { '$in': user } };
      const role2777 = await deleteRole(roleFilter1108);
      const roleFilter3172 = { 'updatedBy': { '$in': user } };
      const role6252 = await deleteRole(roleFilter3172);
      const projectRouteFilter5225 = { 'addedBy': { '$in': user } };
      const projectRoute6389 = await deleteProjectRoute(projectRouteFilter5225);
      const projectRouteFilter4723 = { 'updatedBy': { '$in': user } };
      const projectRoute1789 = await deleteProjectRoute(projectRouteFilter4723);
      const routeRoleFilter8805 = { 'addedBy': { '$in': user } };
      const routeRole5180 = await deleteRouteRole(routeRoleFilter8805);
      const routeRoleFilter1340 = { 'updatedBy': { '$in': user } };
      const routeRole7826 = await deleteRouteRole(routeRoleFilter1340);
      const userRoleFilter4518 = { 'userId': { '$in': user } };
      const userRole9657 = await deleteUserRole(userRoleFilter4518);
      const userRoleFilter8789 = { 'addedBy': { '$in': user } };
      const userRole9772 = await deleteUserRole(userRoleFilter8789);
      const userRoleFilter1935 = { 'updatedBy': { '$in': user } };
      const userRole6307 = await deleteUserRole(userRoleFilter1935);
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
      const routeRoleFilter5166 = { 'roleId': { '$in': role } };
      const routeRole8138 = await deleteRouteRole(routeRoleFilter5166);
      const userRoleFilter7890 = { 'roleId': { '$in': role } };
      const userRole4645 = await deleteUserRole(userRoleFilter7890);
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
      const routeRoleFilter4431 = { 'routeId': { '$in': projectroute } };
      const routeRole0336 = await deleteRouteRole(routeRoleFilter4431);
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

const countEvent = async (filter) =>{
  try {
        
    const EventCnt =  await Event.countDocuments(filter);
    return { Event : EventCnt };
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

      const EventFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const EventCnt =  await dbService.countDocument(Event,EventFilter);

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
        Event : EventCnt,
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

const softDeleteEvent = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Event.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
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
      const EventFilter9460 = { 'updatedBy': { '$in': user } };
      const Event4216 = await softDeleteEvent(EventFilter9460, updateBody);
      const EventFilter6408 = { 'addedBy': { '$in': user } };
      const Event2911 = await softDeleteEvent(EventFilter6408, updateBody);
      const BlogFilter4921 = { 'updatedBy': { '$in': user } };
      const Blog0757 = await softDeleteBlog(BlogFilter4921, updateBody);
      const BlogFilter7954 = { 'addedBy': { '$in': user } };
      const Blog8148 = await softDeleteBlog(BlogFilter7954, updateBody);
      const userFilter0240 = { 'addedBy': { '$in': user } };
      const user9761 = await softDeleteUser(userFilter0240, updateBody);
      const userFilter0609 = { 'updatedBy': { '$in': user } };
      const user7642 = await softDeleteUser(userFilter0609, updateBody);
      const userTokensFilter7568 = { 'userId': { '$in': user } };
      const userTokens3397 = await softDeleteUserTokens(userTokensFilter7568, updateBody);
      const userTokensFilter7544 = { 'addedBy': { '$in': user } };
      const userTokens4195 = await softDeleteUserTokens(userTokensFilter7544, updateBody);
      const userTokensFilter1348 = { 'updatedBy': { '$in': user } };
      const userTokens5997 = await softDeleteUserTokens(userTokensFilter1348, updateBody);
      const roleFilter3354 = { 'addedBy': { '$in': user } };
      const role8133 = await softDeleteRole(roleFilter3354, updateBody);
      const roleFilter6999 = { 'updatedBy': { '$in': user } };
      const role4093 = await softDeleteRole(roleFilter6999, updateBody);
      const projectRouteFilter9127 = { 'addedBy': { '$in': user } };
      const projectRoute2657 = await softDeleteProjectRoute(projectRouteFilter9127, updateBody);
      const projectRouteFilter7146 = { 'updatedBy': { '$in': user } };
      const projectRoute8404 = await softDeleteProjectRoute(projectRouteFilter7146, updateBody);
      const routeRoleFilter3071 = { 'addedBy': { '$in': user } };
      const routeRole3123 = await softDeleteRouteRole(routeRoleFilter3071, updateBody);
      const routeRoleFilter3031 = { 'updatedBy': { '$in': user } };
      const routeRole3853 = await softDeleteRouteRole(routeRoleFilter3031, updateBody);
      const userRoleFilter7386 = { 'userId': { '$in': user } };
      const userRole1091 = await softDeleteUserRole(userRoleFilter7386, updateBody);
      const userRoleFilter2355 = { 'addedBy': { '$in': user } };
      const userRole9728 = await softDeleteUserRole(userRoleFilter2355, updateBody);
      const userRoleFilter0678 = { 'updatedBy': { '$in': user } };
      const userRole7240 = await softDeleteUserRole(userRoleFilter0678, updateBody);
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
      const routeRoleFilter1395 = { 'roleId': { '$in': role } };
      const routeRole3548 = await softDeleteRouteRole(routeRoleFilter1395, updateBody);
      const userRoleFilter2416 = { 'roleId': { '$in': role } };
      const userRole8833 = await softDeleteUserRole(userRoleFilter2416, updateBody);
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
      const routeRoleFilter4251 = { 'routeId': { '$in': projectroute } };
      const routeRole8434 = await softDeleteRouteRole(routeRoleFilter4251, updateBody);
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
  deleteEvent,
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countEvent,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteEvent,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
