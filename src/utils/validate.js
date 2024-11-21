export const checkValidData = (name, email, password) => {
    // Optional name validation
    if (name && name.trim() && !/^[A-Za-z\s]{3,16}$/.test(name)) {
        return "Name is not Valid";
    }

    // Email validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) return "Email ID is not Valid";

    // Password validation
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!isPasswordValid) return "Password is not Valid";

    return null;
};
