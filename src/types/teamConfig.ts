export interface CalendarUsers {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
    color: string;
    visible: boolean;
}

export interface TeamConfig {
    teams: CalendarUsers[];
}
