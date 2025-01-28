export interface TeamMember {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
    color: string;
    visible: boolean;
    isPassive?: boolean;
}

export interface TeamModel {
    users: TeamMember[];
    showLastName?: boolean;
}
