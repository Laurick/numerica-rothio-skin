import { useCallback, useState } from "react";
import useTwitchAuthStore from "../../providers/TwitchAuthProvider/useTwitchAuthStore";

const { VITE_TWITCH_CLIENT_ID } = import.meta.env;

export interface MessageUserOptions {
  broadcasterId: string;
  senderId: string;
  message: string;
}

const useMessageUser = () => {
  const { accessToken } = useTwitchAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const messageUser = useCallback(
    async ({
      broadcasterId,
      senderId,
      message,
    }: MessageUserOptions) => {
      setLoading(true);
      setError(null);
      try {
        const url = new URL("https://api.twitch.tv/helix/chat/messages");
        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Client-Id": VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            broadcaster_id: broadcasterId,
            sender_id: senderId,
            message: message || "Numerica Rothio Skin - Timeout",
          }),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return await response.json();
      } catch (error) {
        // TODO handle token expired error
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return [messageUser, { loading, error }] as const;
};

export default useMessageUser;
