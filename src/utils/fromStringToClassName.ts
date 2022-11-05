export function fromStringToClassName(arrayOfStrings: string[]): string {
  return arrayOfStrings.map((cl:string) => "." + cl).join("");
}
