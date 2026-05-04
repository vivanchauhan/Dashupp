// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";

// export default function Integrations() {
//   const [googleConnected, setGoogleConnected] = useState(false);
//   const [facebookConnected, setFacebookConnected] = useState(false);
//   // const [fbcampaign, setFbCampaign] = useState<any[]>([]);

//   // useEffect(() => {
//   //   const fetchAds = async () => {
//   //     const { data } = await supabase.auth.getUser();
//   //     const user = data.user;

//   //     if (!user) return;

//   //     // 🔥 CHECK CONNECTION FIRST
//   //     const { data: integration } = await supabase
//   //       .from("integrations")
//   //       .select("*")
//   //       .eq("user_id", user.id)
//   //       .eq("provider", "facebook")
//   //       .single();

//   //     if (!integration?.connected) {
//   //       console.log("⛔ Facebook not connected");
//   //       setFbCampaign([]); // clear UI
//   //       return;
//   //     }

//   //     // ✅ ONLY FETCH IF CONNECTED
//   //     const res = await fetch("/api/facebook/ads", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         userId: user.id,
//   //       }),
//   //     });

//   //     const result = await res.json();
//   //     setFbCampaign(result?.campaigns || []);
//   //   };

//   //   fetchAds();
//   // }, []);

//   // // ✅ CHECK EXISTING CONNECTIONS
//   // useEffect(() => {
//   //   const checkConnections = async () => {
//   //     const { data: userData } = await supabase.auth.getUser();
//   //     const user = userData.user;
//   //     if (!user) return;

//   //     const { data } = await supabase
//   //       .from("integrations")
//   //       .select("*")
//   //       .eq("user_id", user.id);

//   //     if (!data) return;

//   //     const google = data.find((i) => i.provider === "google");
//   //     const facebook = data.find((i) => i.provider === "facebook");

//   //     if (google?.connected) setGoogleConnected(true);
//   //     setFacebookConnected(!!facebook?.connected);
//   //   };

//   //   checkConnections();
//   // }, []);
//   useEffect(() => {
//     const handleFacebookOAuth = async () => {
//       const isConnecting = localStorage.getItem("fb_connecting");
//       if (!isConnecting) return;

//       const { data: userData } = await supabase.auth.getUser();
//       const user = userData.user;
//       if (!user) return;

//       console.log("🔥 FB setup running");

//       await fetch("/api/facebook", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId: user.id }),
//       });

//       const { data: updated } = await supabase
//         .from("integrations")
//         .select("*")
//         .eq("user_id", user.id)
//         .eq("provider", "facebook")
//         .single();

//       setFacebookConnected(!!updated?.connected);

//       localStorage.removeItem("fb_connecting");
//     };

//     handleFacebookOAuth();
//   }, []);

//   // 🔗 CONNECT GOOGLE (handled in backend)
//   const connectGoogle = async () => {
//     const { data } = await supabase.auth.getUser();
//     const user = data.user;
//     if (!user) return;

//     const authUrl =
//       `https://accounts.google.com/o/oauth2/v2/auth?` +
//       `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
//       `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}` +
//       `&response_type=code` +
//       `&scope=https://www.googleapis.com/auth/adwords` +
//       `&access_type=offline` +
//       `&prompt=consent select_account` +
//       `&state=${user.id}`;

//     window.open(authUrl, "_self");
//   };

//   // 🔗 CONNECT FACEBOOK
//   //
//   const connectFacebook = async () => {
//     localStorage.setItem("fb_connecting", "true");

//     await supabase.auth.signInWithOAuth({
//       provider: "facebook",
//       options: {
//         redirectTo: "http://localhost:3000/dashboard/integrations",
//         scopes: "ads_read ads_management",
//       },
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Integrations</h1>

//       <div className="flex gap-4">
//         {/* GOOGLE */}

//         {googleConnected ? (
//           <button
//             className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)]"
//             onClick={async () => {
//               const { data } = await supabase.auth.getUser();
//               const user = data.user;
//               await fetch("/api/google-ads/disconnect", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ userId: user?.id }),
//               });
//               setGoogleConnected(false);
//             }}
//           >
//             Disconnect Google ❌
//           </button>
//         ) : (
//           <button
//             className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)]"
//             onClick={connectGoogle}
//           >
//             Connect Google
//           </button>
//         )}

//         {/* FACEBOOK */}

//         {facebookConnected ? (
//           <button
//             className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)]"
//             onClick={async () => {
//               const { data } = await supabase.auth.getUser();
//               const user = data.user;

//               await fetch("/api/facebook/disconnect", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ userId: user?.id }),
//               });

//               setFacebookConnected(false);
//             }}
//           >
//             Disconnect Facebook ❌
//           </button>
//         ) : (
//           <button
//             className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)]"
//             onClick={connectFacebook}
//           >
//             Connect Facebook
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function IntegrationContent() {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(false);

  // 🔥 HANDLE FACEBOOK OAUTH (ONLY AFTER CLICK CONNECT)
  useEffect(() => {
    const handleFacebookOAuth = async () => {
      const isConnecting = localStorage.getItem("fb_connecting");
      if (!isConnecting) return;

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      console.log("🔥 FB setup running");

      await fetch("/api/facebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const { data: updated } = await supabase
        .from("integrations")
        .select("*")
        .eq("user_id", user.id)
        .eq("provider", "facebook")
        .single();

      setFacebookConnected(!!updated?.connected);

      localStorage.removeItem("fb_connecting");
    };

    handleFacebookOAuth();
  }, []);

  // ✅ CHECK EXISTING CONNECTIONS (ON PAGE LOAD)
  useEffect(() => {
    const checkConnections = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      const { data } = await supabase
        .from("integrations")
        .select("*")
        .eq("user_id", user.id);

      if (!data) return;

      const google = data.find((i) => i.provider === "google");
      const facebook = data.find((i) => i.provider === "facebook");

      setGoogleConnected(!!google?.connected);
      setFacebookConnected(!!facebook?.connected);
    };

    checkConnections();
  }, []);

  // 🔗 CONNECT GOOGLE
  const connectGoogle = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return;

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}` +
      `&response_type=code` +
      `&scope=https://www.googleapis.com/auth/adwords` +
      `&access_type=offline` +
      `&prompt=consent select_account` +
      `&state=${user.id}`;

    window.open(authUrl, "_self");
  };

  // 🔗 CONNECT FACEBOOK
  const connectFacebook = async () => {
    localStorage.setItem("fb_connecting", "true");

    await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "http://localhost:3000/dashboard/integrations",
        scopes: "ads_read ads_management",
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Integrations</h1>

      <div className="flex gap-4">
        {/* GOOGLE */}
        {googleConnected ? (
          <button
            className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]"
            onClick={async () => {
              const { data } = await supabase.auth.getUser();
              const user = data.user;

              await fetch("/api/google-ads/disconnect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id }),
              });

              setGoogleConnected(false);
            }}
          >
            Disconnect Google ❌
          </button>
        ) : (
          <button
            className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]"
            onClick={connectGoogle}
          >
            Connect Google
          </button>
        )}

        {/* FACEBOOK */}
        {facebookConnected ? (
          <button
            className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]"
            onClick={async () => {
              const { data } = await supabase.auth.getUser();
              const user = data.user;

              await fetch("/api/facebook/disconnect", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user?.id }),
              });

              setFacebookConnected(false);
            }}
          >
            Disconnect Facebook ❌
          </button>
        ) : (
          <button
            className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]"
            onClick={connectFacebook}
          >
            Connect Facebook
          </button>
        )}
      </div>
    </div>
  );
}
