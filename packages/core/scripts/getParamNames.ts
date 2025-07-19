function isValidParam(param: string): boolean {
  return Boolean(param) && !param.startsWith('...');
}

function removeDefaultValues(param: string): string {
  return param.split('=')[0]; // Remove default values
}

export const getParamNames = (func: () => unknown): string[] => {
  const funcString = func.toString().replace(/\n/g, '');
  const paramPattern = new RegExp(`(?:${func.name}\\s*|^)\\((.*?)\\)`);
  const paramString = paramPattern.exec(funcString)?.[1] || '';

  return paramString
    .replace(/(\{[^}]*\}|\s*=\s*{[^}]*})/g, '') // Remove destructured params
    .replace(/\/\*.*?\*\//g, '') // Remove comments
    .replace(/ /g, '') // Remove spaces
    .split(',') // Split into array
    .filter(isValidParam) // Filter out invalid params
    .map(removeDefaultValues); // Extract parameter names
};
