import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

import { createClient } from "@/utils/supabase/server";

 
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
 
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  console.log("user", user);

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        clientPayload
      ) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
 
       const {userId} = JSON.parse(clientPayload!); 

        if (userId && user!.id !== userId)
        {
            throw Error("User not correct");
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: clientPayload,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow
 
        console.log('blob upload completed', blob, tokenPayload);

        const {userId, businessId} = JSON.parse(tokenPayload!); 

        if (!businessId || (userId && user!.id !== userId))
        {
            throw Error("User not correct");
        }
 
        try {
          // Run any logic after the file upload completed
          const { error } = await supabase.from("businesses").update({
            photo: blob.url
           }).eq('business_id', businessId);
           if (error){
            throw error;
           }
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });
 
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}