import { Group } from '../model/Group.ts'
import { UserGroupRequest } from '../model/UserGroupRequest.ts';

export class GroupsService {
    async getGroupById(id: string) : Promise<string>{
        const response = await fetch('http://localhost:7777/api/groups/get/'+id);
        return await response.json();
    }

    async getAllGroups() : Promise<string> {
        const response = await fetch('http://localhost:7777/api/groups/getAllGroups');
        return await response.json();
    }

    async createGroups(group: [Group]) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(group)
        };
        const response = await fetch('http://localhost:7777/api/groups/createGroups', requestOptions);
        return await response.json();
    }

    async addUserToGroup(request: UserGroupRequest) : Promise<string>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        };
        const response = await fetch('http://localhost:7777/api/groups/addUserToGroup',requestOptions);
        return await response.json();
    }
}
