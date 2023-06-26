import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const slug = request.nextUrl.searchParams.get("slug");

  revalidatePath(slug);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
