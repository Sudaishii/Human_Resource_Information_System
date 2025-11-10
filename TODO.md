# TODO: Remove Username from Registration and Login

## Tasks
- [x] Update `src/pages/Register.jsx`:
  - Remove username state, field, and related validations.
  - Change database insert to use 'password' instead of 'user_pass' to match schema.
  - Remove 'user_name' from insert.
- [x] Update `src/pages/Login.jsx`:
  - Change label from "Email or Username" to "Email".
  - Change placeholder from "Enter your email or username" to "Enter your email".
- [x] Update `src/utils/validation.jsx`:
  - Remove `validateUsername` and `existingUsername` functions.
- [x] Test registration and login flows.
- [x] Verify no other references to username in codebase.
