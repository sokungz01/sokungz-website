export interface SettingsItem {
    settingsName: string;
    settingsValue: string;
}

export interface AcademicItem {
    academic_id: number;
    academic_year: string;
}

export interface ClassScheduleType {
    class_id: number,
    class_subject: string,
    class_subject_no: string,
    class_room: string,
    startTime: string,
    endTime: string,
    day: string,
    academic_id: number
 }