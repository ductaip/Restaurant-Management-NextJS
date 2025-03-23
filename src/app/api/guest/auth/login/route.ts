import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";
import { GuestLoginBodyType } from "@/schemas/guest.schema";
import guestApi from "@/apis/guest";

export async function POST(request: Request) {
  const body = (await request.json()) as GuestLoginBodyType;
  const cookieStore = await cookies();
  try {
    const { payload } = await guestApi.sLogin(body);
    const {
      data: { accessToken, refreshToken },
    } = payload;

    const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number };

    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: decodeAccessToken.exp * 1000,
    });

    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: decodeRefreshToken.exp * 1000,
    });

    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        { message: `Có lỗi xảy ra khi login` },
        { status: 500 }
      );
    }
  }
}
