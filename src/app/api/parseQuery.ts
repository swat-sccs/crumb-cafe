import { NextRequest } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

declare type ParseQueryReturnType<T> = { ok: true; data: T } | { ok: false; data: string };

export function parseQuery<T>(schema: z.ZodSchema<T>, req: NextRequest): ParseQueryReturnType<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {};
  for (const [key, val] of req.nextUrl.searchParams.entries()) {
    params[key] = val;
  }

  const parsed = schema.safeParse(params);

  if (parsed.success) {
    return {
      ok: true,
      data: parsed.data,
    };
  } else {
    return {
      ok: false,
      data: fromZodError(parsed.error).message,
    };
  }
}

export async function parseBody<T>(
  schema: z.ZodSchema<T>,
  req: NextRequest,
): Promise<ParseQueryReturnType<T>> {
  const parsed = schema.safeParse(await req.json());

  if (parsed.success) {
    return {
      ok: true,
      data: parsed.data,
    };
  } else {
    return {
      ok: false,
      data: fromZodError(parsed.error).message,
    };
  }
}
