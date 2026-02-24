import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ConfigState {
  channel: string;
  setChannel: (channel: string) => void;
  volume: number;
  setVolume: (volume: number) => void;
  enableTimeout: boolean;
  setEnableTimeout: (enableTimeout: boolean) => void;
  timeoutMultiplier: number;
  setTimeoutMultiplier: (timeoutMultiplier: number) => void;
  timeoutBase: number;
  setTimeoutBase: (timeoutBase: number) => void;
  timeoutReason: string;
  setTimeoutReason: (timeoutReason: string) => void;
  banMods: boolean;
  setBanMods: (banMods: boolean) => void;
  modsTimeoutMultiplier: number;
  setModsTimeoutMultiplier: (modsTimeoutMultiplier: number) => void;
  sendMessage: boolean;
  setSendMessage: (sendMessage: boolean) => void;
}

const useConfig = create(
  persist<ConfigState>(
    (set) => ({
      channel: "",
      setChannel: (channel) => set({ channel }),
      volume: 0,
      setVolume: (volume) => set({ volume }),
      enableTimeout: false,
      setEnableTimeout: (enableTimeout) => set({ enableTimeout }),
      timeoutMultiplier: 10,
      setTimeoutMultiplier: (timeoutMultiplier) => set({ timeoutMultiplier }),
      timeoutBase: 0,
      setTimeoutBase: (timeoutBase) => set({ timeoutBase }),
      timeoutReason: "Numerica Rothio Skin - Timeout",
      setTimeoutReason: (timeoutReason) => set({ timeoutReason }),
      banMods: false,
      setBanMods: (banMods) => set({ banMods }),
      modsTimeoutMultiplier: 5,
      setModsTimeoutMultiplier: (modsTimeoutMultiplier) => set({ modsTimeoutMultiplier }),
      sendMessage: false,
      setSendMessage: (sendMessage) => set({ sendMessage }),
    }),
    { name: "numerica-config", version: 3 }
  )
);

export default useConfig;
