export interface paths {
    "/auth/sign-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_signIn"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sign-in/refresh-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_signInRefreshToken"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sign-out": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_signOut"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UsersController_users"];
        put?: never;
        post: operations["UsersController_addUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UsersController_userDetails"];
        put?: never;
        post?: never;
        delete: operations["UsersController_deleteUser"];
        options?: never;
        head?: never;
        patch: operations["UsersController_editUser"];
        trace?: never;
    };
    "/access-controls/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AccessControlsController_accessControls"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/access-controls/all/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AccessControlsController_accessControlDetails"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/access-controls/available": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AccessControlsController_availableAccessControls"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/access-controls": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AccessControlsController_addAccessControl"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/access-controls/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AccessControlsController_deleteAccessControl"];
        options?: never;
        head?: never;
        patch: operations["AccessControlsController_editAccessControl"];
        trace?: never;
    };
    "/students": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["StudentsController_students"];
        put?: never;
        post: operations["StudentsController_addStudent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/students/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["StudentsController_studentDetails"];
        put?: never;
        post?: never;
        delete: operations["StudentsController_deleteUser"];
        options?: never;
        head?: never;
        patch: operations["StudentsController_editUser"];
        trace?: never;
    };
    "/students/student-id-cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["StudentsController_studentsByCardIds"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/attendance/export/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AttendanceController_exportAttendanceList"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SignInDTO: {
            email: string;
            password: string;
            /** @enum {string} */
            tokenType: "USER" | "ACCESS_POINT";
        };
        UserDTO: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            isAdmin: boolean;
        };
        SignInResponseDTO: {
            user: components["schemas"]["UserDTO"];
            accessToken: string;
            refreshToken: string;
        };
        ApiException: {
            /** @enum {string} */
            message: "WRONG_USERNAME_OR_PASSWORD" | "NO_TOKEN" | "INVALID_TOKEN" | "NOT_FOUND" | "UNIQUE_CONSTRAINT_VIOLATION" | "FOREIGN_KEY_CONSTRAINT_VIOLATION" | "PERMISSION_DENIED" | "INTERNAL_SERVER_ERROR";
            statusCode: number;
        };
        SignInRefreshTokenResponseDTO: {
            user: components["schemas"]["UserDTO"];
            accessToken: string;
        };
        SignOutResponseDTO: {
            success: boolean;
        };
        UsersResponseDTO: {
            pages: number;
            items: components["schemas"]["UserDTO"][];
        };
        AddUserDTO: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            isAdmin: boolean;
        };
        EditUserDTO: {
            firstName?: string;
            lastName?: string;
            email?: string;
            password?: string;
            isAdmin?: boolean;
        };
        AccessControlDTO: {
            id: string;
            userId: string;
            name: string;
            open: boolean;
            /** Format: date-time */
            createdAt: string;
        };
        AccessControlsResponseDTO: {
            pages: number;
            items: components["schemas"]["AccessControlDTO"][];
        };
        AddAccessControlDTO: {
            name: string;
            open: boolean;
        };
        EditAccessControlDTO: {
            name?: string;
            open?: boolean;
        };
        StudentDTO: {
            id: string;
            firstName: string;
            lastName: string;
            /** Format: date-time */
            dateOfBirth: string;
            registration: string;
            cardId: string;
            level: string;
            speciality: string;
            section: string;
            directedWorkGroup: string;
            practicalWorkGroup: string;
        };
        StudentsResponseDTO: {
            pages: number;
            items: components["schemas"]["StudentDTO"][];
        };
        StudentsByIdCardsDTO: {
            studentIdCards: string[];
        };
        AddStudentDTO: {
            firstName: string;
            lastName: string;
            /** Format: date-time */
            dateOfBirth: string;
            registration: string;
            cardId: string;
            level: string;
            speciality: string;
            section: string;
            directedWorkGroup: string;
            practicalWorkGroup: string;
        };
        EditStudentDTO: {
            firstName?: string;
            lastName?: string;
            /** Format: date-time */
            dateOfBirth?: string;
            registration?: string;
            cardId?: string;
            level?: string;
            speciality?: string;
            section: string;
            directedWorkGroup: string;
            practicalWorkGroup: string;
        };
        CreateAttendanceDTO: {
            cardId: string;
            /** Format: date-time */
            timestamp: string;
        };
        ExportAttandanceListDTO: {
            attendanceList: components["schemas"]["CreateAttendanceDTO"][];
        };
        AttendanceDTO: {
            id: string;
            studentId: string;
            attendanceExportId: string;
            /** Format: date-time */
            timestamp: string;
        };
        AttendanceExportDTO: {
            id: string;
            accessControlId: string;
            attendances: components["schemas"]["AttendanceDTO"][];
        };
        PaginationResult: {
            pages: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AuthController_signIn: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignInDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignInResponseDTO"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    AuthController_signInRefreshToken: {
        parameters: {
            query?: {
                refreshToken?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignInRefreshTokenResponseDTO"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    AuthController_signOut: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignOutResponseDTO"];
                };
            };
        };
    };
    UsersController_users: {
        parameters: {
            query: {
                search: string;
                page: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UsersResponseDTO"];
                };
            };
        };
    };
    UsersController_addUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddUserDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    UsersController_userDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDTO"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    UsersController_deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    UsersController_editUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EditUserDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    AccessControlsController_accessControls: {
        parameters: {
            query: {
                search: string;
                page: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessControlsResponseDTO"];
                };
            };
        };
    };
    AccessControlsController_accessControlDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessControlDTO"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    AccessControlsController_availableAccessControls: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessControlDTO"][];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    AccessControlsController_addAccessControl: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddAccessControlDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessControlDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    AccessControlsController_deleteAccessControl: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessControlDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    AccessControlsController_editAccessControl: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EditAccessControlDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessControlDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    StudentsController_students: {
        parameters: {
            query: {
                search: string;
                page: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StudentsResponseDTO"];
                };
            };
        };
    };
    StudentsController_addStudent: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddStudentDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StudentDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    StudentsController_studentDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StudentDTO"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    StudentsController_deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StudentDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    StudentsController_editUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EditStudentDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StudentDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
    StudentsController_studentsByCardIds: {
        parameters: {
            query: {
                search: string;
                page: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StudentsByIdCardsDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StudentsResponseDTO"];
                };
            };
        };
    };
    AttendanceController_exportAttendanceList: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ExportAttandanceListDTO"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AttendanceExportDTO"];
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiException"];
                };
            };
        };
    };
}
