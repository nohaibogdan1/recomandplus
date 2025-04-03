import { SyntheticEvent, useState } from "react";
import Button from "./common/Button";

export default function RewardsForm({
  addedRewards = [],
  setAddedRewards }: {
    addedRewards: string[],
    setAddedRewards: (addedRewards: string[]) => void
  }) {
  const [reward, setReward] = useState('');

  const handleAddReward = (e: SyntheticEvent) => {
    e.preventDefault();
    if (reward.trim()) {
      setAddedRewards([...addedRewards, reward]);
      setReward('');
    }
  };

  const handleDeleteReward = (index: number) => {
    const updatedRewards = addedRewards.filter((_, i) => i !== index);
    setAddedRewards(updatedRewards);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Adaugă recompensa. Clientul va putea folosi una dintre opțiuni</label>
        <input
          type="text"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          placeholder="Introdu recompensa"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <Button onClick={handleAddReward} text="Adaugă"/>

      {addedRewards.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Optiuni:</h3>
          <ul >
            {addedRewards.map((reward, index) => (
              <li key={index} className="flex items-center text-gray-700 gap-4">
                <button
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault();
                    handleDeleteReward(index)
                  }
                  }
                  className="text-red-500 cursor-pointer text-sm"
                >
                  Șterge
                </button>
                <span className="mr-2">{reward}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};