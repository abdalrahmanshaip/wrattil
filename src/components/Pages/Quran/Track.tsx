import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import AddTrack from "./_components/AddTrack";
import AddBatch from "./_components/AddBatch";
import TrackCards from "./_components/TrackCards";
import API from "@/api";

interface Group {
  title: string;
  id: number;
}

interface Batch {
  id: number;
  name: string;
}

const Track = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedQuranTrackId, setSelectedQuranTrackId] = useState<number | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);

  // Fetch Quran tracks/groups once on mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await API.get("/quran-tracks");
        setGroups(response.data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    fetchGroups();
  }, []);

  // Fetch batches when selectedQuranTrackId changes
  useEffect(() => {
    if (selectedQuranTrackId === null) {
      setBatches([]);
      return;
    }

    const fetchBatches = async () => {
      try {
        const response = await API.get("/academic-years", {
          params: { quranTrackId: selectedQuranTrackId },
        });
        // Map response to { id, name } for TrackCards
        const formattedBatches = response.data.map((batch: any) => ({
          id: batch.id,
          name: batch.title,
        }));
        setBatches(formattedBatches);
      } catch (error) {
        console.error("Failed to fetch batches:", error);
      }
    };

    fetchBatches();
  }, [selectedQuranTrackId]);

  // Add a new batch to state after creation
  const handleAddBatch = (newBatch: Batch) => {
    setBatches((prev) => [...prev, newBatch]);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-1.5 items-center lg:flex-row flex-col">
        <Select
          value={selectedQuranTrackId?.toString() || ""}
          onValueChange={(value) => setSelectedQuranTrackId(Number(value))}
        >
          <SelectTrigger
            className="w-full bg-our-brown-400 text-white py-[30px] border-none"
            dir="rtl"
          >
            <SelectValue placeholder="أختر المسار" className="text-white" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup dir="rtl">
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id.toString()} dir="rtl">
                  {group.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <AddTrack />
      </div>

     <TrackCards data={batches} quranTrackId={selectedQuranTrackId} />

      <AddBatch quranTrackId={selectedQuranTrackId} onAddBatch={handleAddBatch} />
    </div>
  );
};

export default Track;
