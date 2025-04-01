import { ChangeEvent, useState } from "react";
import RewardsForm from "./RewardsForm";
import Problem from "./Problem";
import Button, { ButtonVariants } from "./common/Button";

export default function ChangeRewardForm({ changed }: { changed: () => void }) {
  const [addedRewards, setAddedRewards] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleChangeReward() {
    setLoading(true);
    const response = await fetch('/api/campanii/recompense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rewards: addedRewards,
      }),
    });

    if (response.ok) {
      changed();
    } else {
      if (response.status === 500) {
        setError(true);
        setTimeout(() => { setError(false); }, 2000);
      }
    }
    setLoading(false);
  }

  return (
    <div className="w-96">
      <RewardsForm addedRewards={addedRewards} setAddedRewards={setAddedRewards} />
      {!!addedRewards.length &&
        <>
          <div className="flex align-center gap-3 mb-3">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={agreed}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="agree">
              Sunt de acord cu modificarile
            </label>
          </div>
          {agreed &&
            <Button
              onClick={handleChangeReward}
              loading={loading}
              text="Schimba"
              variant={ButtonVariants.PRIMARY}
            />
          }
          {error && <Problem />}
        </>
      }
    </div>
  )
}