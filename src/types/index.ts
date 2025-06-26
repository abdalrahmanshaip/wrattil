export interface BatchesProps {
  name: string
  id: number
}

export interface ITrack {
  title: string;
  id: number;
}

export interface IAcademicYear {
  id: number;
  title: string;
}

export interface IAppointment {
  dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  startTime: string;
}

export interface IGroup {
  id: number;
  title: number;
  appointments: IAppointment[];
}

export interface ITajweed {
  tajweedTrainingId: number
  title: string
  appointments: {
    dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
    startTime: string
  }[]
} 
