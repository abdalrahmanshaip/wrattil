import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import GroupCards from './_components/GroupCards'
import AddGroup from './_components/AddGroup'
import API from '@/api'

interface Track {
  id: number
  title: string
}

interface Batch {
  id: number
  title: string
}

interface Group {
  id: number
  name: string
}

const Groups = () => {
  // Read batchId from URL param and quranTrackId from query string
  const { batchId } = useParams()
  const [searchParams] = useSearchParams()
  const quranTrackIdFromUrl = searchParams.get('quranTrackId') || ''

  // State for tracks, batches, groups
  const [tracks, setTracks] = useState<Track[]>([])
  const [batches, setBatches] = useState<Batch[]>([])
  const [groups, setGroups] = useState<Group[]>([])

  // Selected track and batch IDs (strings for the select components)
  const [selectedTrackId, setSelectedTrackId] = useState<string>(quranTrackIdFromUrl)
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batchId || '')

  // Show/hide AddGroup popup dialog
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false)

  // Fetch tracks on component mount
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await API.get('/quran-tracks')
        setTracks(response.data)
      } catch (error) {
        console.error('Failed to fetch tracks:', error)
      }
    }
    fetchTracks()
  }, [])

  // Fetch batches when selectedTrackId changes
  useEffect(() => {
    if (!selectedTrackId) {
      setBatches([])
      setSelectedBatchId('')
      return
    }
    const fetchBatches = async () => {
      try {
        const response = await API.get('/academic-years', { params: { quranTrackId: selectedTrackId } })
        setBatches(response.data)
        if (!response.data.some((batch: Batch) => batch.id.toString() === selectedBatchId)) {
          setSelectedBatchId('')
        }
      } catch (error) {
        console.error('Failed to fetch batches:', error)
      }
    }
    fetchBatches()
  }, [selectedTrackId])

  // Validate batch selection on batches update
  useEffect(() => {
    if (batches.length > 0 && selectedBatchId) {
      const found = batches.find((b) => b.id.toString() === selectedBatchId)
      if (!found) {
        setSelectedBatchId('')
      }
    }
  }, [batches])

  // Fetch groups when selectedBatchId changes
  useEffect(() => {
    if (!selectedBatchId) {
      setGroups([])
      return
    }
    const fetchGroups = async () => {
      try {
        const response = await API.get('/groups', { params: { academicYearId: selectedBatchId } })
        // Map response to local Group interface {id, name}
        const mappedGroups = response.data.map((g: any) => ({
          id: g.id,
          name: g.title,
        }))
        setGroups(mappedGroups)
      } catch (error) {
        console.error('Failed to fetch groups:', error)
      }
    }
    fetchGroups()
  }, [selectedBatchId])

  // Handler to refresh groups list after adding a group
  const handleGroupAdded = () => {
    if (selectedBatchId) {
      API.get('/groups', { params: { academicYearId: selectedBatchId } })
        .then((response) => {
          const mappedGroups = response.data.map((g: any) => ({
            id: g.id,
            name: g.title,
          }))
          setGroups(mappedGroups)
        })
        .catch((err) => console.error(err))
    }
    setShowAddGroupDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-1.5 items-center lg:flex-row flex-col">
        {/* Track Select */}
        <Select
          value={selectedTrackId}
          onValueChange={(value) => {
            setSelectedTrackId(value)
            setSelectedBatchId('') // reset batch on track change
          }}
        >
          <SelectTrigger className="w-full bg-our-black text-white py-[30px] border-none" dir="rtl">
            <SelectValue placeholder="أختر المسار" className="text-white" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup dir="rtl">
              {tracks.map((track) => (
                <SelectItem key={track.id} value={track.id.toString()} dir="rtl">
                  {track.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Batch Select */}
        <Select
          value={selectedBatchId}
          onValueChange={setSelectedBatchId}
          disabled={!selectedTrackId}
        >
          <SelectTrigger className="w-full bg-our-brown-400 text-white py-[30px] border-none" dir="rtl">
            <SelectValue placeholder="أختر الفرقة" className="text-white" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup dir="rtl">
              {batches.map((batch) => (
                <SelectItem key={batch.id} value={batch.id.toString()} dir="rtl">
                  {batch.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Groups list */}
      <GroupCards data={groups} />

      {/* Add Group button */}
      <Button
        onClick={() => setShowAddGroupDialog(true)}
        className="text-lg text-our-white-100 bg-our-brown-200 py-8 w-full rounded-xl"
        size="lg"
        variant="noHover"
      >
        <div className="rounded-full bg-our-white-100 text-our-black text-base">
          <Plus className="[&_size]:size-2 text-our-orange" size={20} />
        </div>
        إضافة مجموعة
      </Button>

      {/* AddGroup popup */}
      {showAddGroupDialog && (
        <AddGroup
          academicYearId={Number(selectedBatchId)} // pass selected batch id here
          isOpen={showAddGroupDialog}
          setIsOpen={setShowAddGroupDialog}
          onSuccess={handleGroupAdded}
        />
      )}
    </div>
  )
}

export default Groups
