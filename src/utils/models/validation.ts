export enum ValidationError {
  Login = "Invalid login. 3- 20 characters, Latin, can contain numbers, but not consist of them, without spaces, without special characters (hyphens and underscores are allowed)",
  Password = "Invalid password. 8-40 characters, at least one capital letter and a number are required",
  Email = "Invalid Email. Latin, can include numbers and special characters like a hyphen, there must be (@) and a dot after it, but there must be letters before the dot",
  First_name = "Invalid Name. Latin or Cyrillic, the first letter must be uppercase, without spaces and without numbers, there are no special characters (only a hyphen is allowed)",
  Second_name = "Invalid Surname. Latin or Cyrillic, the first letter must be uppercase, without spaces and without numbers, there are no special characters (only a hyphen is allowed)",
  Phone = "Invalid phone number. 10-15 characters, consists of digits, can start with a plus"
}

export enum ValidationPattern {
  Login = "^[a-zA-Z][a-zA-Z0-9-_]{2,20}$",
  Password = "^^(?=.*[A-Z]{1,})" +
    "(?=.*[a-z]{1,})(?=.*[0-9]{1,})" +
    "[a-zA-Z0-9!@#$-_?.:{]{8,40}$",
  Email = "[\\w.-]+@([A-Za-z0-9-]+\\.)+[A-Za-z0-9]+",
  First_name = "[A-ZА-Я]{1,}.*" + "[^0-9]" + "[^+=~!?@#$%^&*;\\.\\()\\[\\]\\|:]",
  Second_name = "[A-ZА-Я]{1,}.*" + "[^0-9]" + "[^+=~!?@#$%^&*;\\.\\()\\[\\]\\|:]",
  Phone = "^(\\+[0-9]|[0-9])\\s?\\(?[0-9]{3}\\)?\\s?[0-9]{7}$"
}
