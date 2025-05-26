/*const [cache, setCache] = useState(new Map());

export function getCachedProject(id) {
    const cachedData=cache.get(id);
    if(cachedData){
      const {project,user}=cachedData;
      return {project,user}
    }
}

export const cacheProject = (projectId, projectData) => {
    const userData = users.get(projectData.creatorId);

    setCache(prev => new Map(prev).set(projectId, { project: projectData, user: userData }));
};*/

export function cacheUser(id, user) {
  localStorage.setItem(`user_${id}`, JSON.stringify(user));
 
}
export function getUser(id) {
    return JSON.parse(localStorage.getItem(`user${id}`));
}

