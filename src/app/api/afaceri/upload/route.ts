import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { del } from '@vercel/blob';

import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        const split = pathname.split("picture-business-");
        const userIdFromPathname = split[1];
        // picture-business-${user!.id}

        if (!user?.id || userIdFromPathname !== user.id) {
          throw Error("User not correct");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
          tokenPayload: user.id,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        const userId = tokenPayload;
        // Run any logic after the file upload completed
        const res = await supabase.from("businesses").select("*").eq("user_id", userId);
        if (res.error) {
           console.error("Error business: ", res.error);
           return;
        }
        const business = res.data[0];
        if (!business) {
          return;
        }
        const prevPhotoUrl = business.photo;

        const { error } = await supabase
          .from("businesses")
          .update({
            photo: blob.url,
          })
          .eq("user_id", userId);
        if (error) {
          console.error("Error update photo: ", error);
        } else {
          if (prevPhotoUrl) {
            await del(prevPhotoUrl)
          }
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Photo webhook: ", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
}
