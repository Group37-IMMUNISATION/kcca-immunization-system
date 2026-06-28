export const getRoleName = (roleId) => {

    switch (roleId) {

        case 1:
            return "Super Admin";

        case 2:
            return "Nurse";

        case 3:
            return "Clinical Officer";

        case 4:
            return "Data Clerk";

        case 5:
            return "Facility Admin";

        default:
            return "Unknown Role";

    }

};