
const LOGIN_WITH_GOOGLE = { id:1, name:'LOGIN-WITH-GOOGLE'} as const;
const VERIFY_EMAIL_COMPLETE = { id:2, name:'VERIFY-GOOGLE-EMAIL-COMPLETE'} as const;

export const SystemAuditableEnum = {
    LOGIN_WITH_GOOGLE,
    VERIFY_EMAIL_COMPLETE

} as const;