import { Home, Users, Clock, Calendar, DollarSign } from 'lucide-react';

export const navbarLink = [
    {
        title: "Dashboard",
        icon: Home,
        path: "/",
    },
    {
        title: "Employee Management",
        icon: Users,
        path: "/Employee-Management"
    },
    {
        title: "Attendance and Timekeeping",
        icon: Clock,
        path: "/Timekeeping"
    },
    {
        title: "Leave Management",
        icon: Calendar,
        path: "Leave-Management"
    },
    {
        title: "Payroll Processing",
        icon: DollarSign,
        path: "/Payroll-Processing"
    }
];
