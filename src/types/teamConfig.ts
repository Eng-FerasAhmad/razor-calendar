export interface CalendarUsers {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
    color: string;
}

export interface TeamConfig {
    teams: CalendarUsers[];
}
