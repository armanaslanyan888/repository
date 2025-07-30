export async function TIMEOUT(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function EXECUTION_TIMEOUT() {
  return Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
}
