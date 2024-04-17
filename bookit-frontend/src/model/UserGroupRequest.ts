export class UserGroupRequest {
    userEmail: string
    groupName: string
    groupPassword: string

    constructor(userEmail: string, groupName: string, groupPassword: string) {
        this.userEmail = userEmail
        this.groupName = groupName
        this.groupPassword = groupPassword
    }
}