export class GroupsService {
    async getGroupById(id: string) : Promise<string>{
        const response = await fetch('http://localhost:7777/api/groups/get/'+id);
        return await response.json();
    }

    async getAllGroups() : Promise<string> {
        const response = await fetch('http://localhost:7777/api/groups/getAllGroups');
        return await response.json();
    }

    async createGroups() {
        const response = await fetch('http://localhost:7777/api/groups/createGroups');
        return await response.json();
    }

    async addUserToGroup() : Promise<string>{
        const response = await fetch('http://localhost:7777/api/groups/addUserToGroup');
        return await response.json();
    }
}
