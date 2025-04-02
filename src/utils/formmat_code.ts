export const detectLanguage = (code: string): string => {
    if (code.includes("package main")) return "go";
    if (code.includes("func ")) return "go";
    if (code.includes("function")) return "javascript";
    return "text";
};