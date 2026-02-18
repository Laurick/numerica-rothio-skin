import useConfig from "../../../providers/ConfigContext";
import { useTwitchAuth } from "../../../providers/TwitchAuthProvider";
import AudioIcon from "../../icons/AudioIcon";
import useGameState from "../../../providers/GameContext";
import { useState } from "react";

export default function ConfigMenuContent() {
  const {
    channel,
    setChannel,
    volume,
    setVolume,
    enableTimeout,
    setEnableTimeout,
    timeoutMultiplier,
    setTimeoutMultiplier,
    timeoutBase,
    setTimeoutBase,
    timeoutReason,
    setTimeoutReason,
    banMods,
    setBanMods,
  } = useConfig();
  const { isAuthenticated, goToLogin, logOut } = useTwitchAuth();
  const resetGame = useGameState((state) => state.resetGame);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <fieldset>
        <legend>Channel</legend>
        <input
          type="text"
          name="channel"
          className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-2xl sm:leading-6"
          placeholder="Nombre de twitch..."
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Bubble Sounds</legend>
        <div className="flex flex-row items-center gap-2 py-1">
          <AudioIcon
            className="text-4xl"
            variant={
              volume === 0
                ? "mute"
                : volume < 0.25
                  ? "low"
                  : volume < 0.75
                    ? "medium"
                    : "high"
            }
          />
          <input
            className="accent-primary w-full"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
          <span className="w-[5ch] text-end">{Math.round(volume * 100)}%</span>
        </div>
      </fieldset>
      {!isAuthenticated ? (
        <button
          className="w-full py-2 px-4 bg-primary text-white rounded-2xl"
          onClick={goToLogin}
        >
          Login With Twitch
        </button>
      ) : (
        <>
          {/* TODO change to a switch */}
          <fieldset>
            <legend>Enable Timeout</legend>
            <input
              className="accent-primary"
              id="enable-timeout"
              type="checkbox"
              checked={enableTimeout}
              onChange={(e) => setEnableTimeout(e.target.checked)}
            />
          </fieldset>
          {enableTimeout && (
            <>
              <fieldset>
                <legend>Timeout Multiplier</legend>
                <input
                  type="number"
                  name="timeout-multiplier"
                  className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-2xl sm:leading-6"
                  placeholder="Timeout Multiplier"
                  value={timeoutMultiplier}
                  onChange={(e) => {
                    const number = Number(e.target.value);
                    const isFinite = Number.isFinite(number);
                    const isNotNegative = number >= 0;
                    const isInteger = Number.isInteger(number);
                    if (isFinite && isNotNegative && isInteger) {
                      setTimeoutMultiplier(number);
                    }
                  }}
                />
              </fieldset>
              <fieldset>
                <legend>Timeout Base</legend>
                <input
                  type="number"
                  name="timeout-base"
                  className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-2xl sm:leading-6"
                  placeholder="Timeout Base"
                  value={timeoutBase}
                  onChange={(e) => {
                    const number = Number(e.target.value);
                    const isFinite = Number.isFinite(number);
                    const isNotNegative = number >= 0;
                    const isInteger = Number.isInteger(number);
                    if (isFinite && isNotNegative && isInteger) {
                      setTimeoutBase(number);
                    }
                  }}
                />
              </fieldset>
              <fieldset title="Customize your ban message">
                <legend>Timeout Reason</legend>
                <input
                  type="text"
                  name="timeout-reason"
                  className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-2xl sm:leading-6"
                  placeholder="Numerica Rothio Skin - Timeout"
                  value={timeoutReason}
                  onChange={(e) => setTimeoutReason(e.target.value)}
                />
              </fieldset>
              <fieldset title="Enable o dissable moderator ban">
                <legend>Ban Mods</legend>
                <input
                  className="accent-primary"
                  id="enable-timeout"
                  type="checkbox"
                  checked={banMods}
                  onChange={(e) => setBanMods(e.target.checked)}
                />
              </fieldset>
              <fieldset title="Are you brave enough? >:)">
                <legend>Super secret setting</legend>
                <input
                  className="accent-primary"
                  id="enable-timeout"
                  type="checkbox"
                />
              </fieldset>
            </>
          )}

          <button
            className="w-full py-2 px-4 bg-secondary text-black rounded-2xl"
            onClick={() => setShowClearConfirm(true)}
          >
            Clear data & reset
          </button>
          <button
            className="w-full py-2 px-4 bg-primary text-white rounded-2xl"
            onClick={() => setShowLogoutConfirm(true)}
          >
            LogOut
          </button>
        </>
      )}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-700 rounded-2xl p-6 flex flex-col gap-4 max-w-sm mx-4">
            <p className="text-white text-center text-lg">
              Are you sure you want to clear all data?
            </p>
            <div className="flex gap-2">
              <button
                className="flex-1 py-2 px-4 bg-slate-500 text-white rounded-2xl"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 px-4 bg-secondary text-black rounded-2xl"
                onClick={() => {
                  resetGame();
                  setShowClearConfirm(false);
                }}
              >
                Yes, please
              </button>
            </div>
          </div>
        </div>
      )}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-700 rounded-2xl p-6 flex flex-col gap-4 max-w-sm mx-4">
            <p className="text-white text-center text-lg">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-2">
              <button
                className="flex-1 py-2 px-4 bg-slate-500 text-white rounded-2xl"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Nope
              </button>
              <button
                className="flex-1 py-2 px-4 bg-secondary text-black rounded-2xl"
                onClick={() => {
                  logOut();
                  setShowLogoutConfirm(false);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
