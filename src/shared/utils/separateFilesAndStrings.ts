export function separateFilesAndStrings(input: (File | string)[]): { files: File[]; strings: string[] } {
  const files: File[] = [];
  const strings: string[] = [];

  input.forEach((item) => {
    if (item instanceof File) {
      files.push(item);
    } else if (typeof item === "string") {
      strings.push(item);
    }
  });

  return { files, strings };
}
