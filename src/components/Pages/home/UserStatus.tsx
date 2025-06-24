import { useEffect, useState } from 'react'
import axios from 'axios'
import { BGBlue, BGGreen, BGOrange, BGPink, BGYellow } from '@/assets'
import UserStatusItem from './_components/UserStatusItem'
import API from '@/api'

const UserStatus = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTracks: 0,
    totalAcademicYears: 0,
    totalGroups: 0,
    totalAdmins: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get('/dashboard/stats')
        setStats(response.data)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      }
    }

    fetchStats()
  }, [])

  const statusData = [
    {
      image: BGBlue,
      number: stats.totalStudents,
      color: 'text-our-blue',
      title: 'طالب',
    },
    {
      image: BGOrange,
      number: stats.totalTracks,
      color: 'text-our-orange',
      title: 'مسار',
    },
    {
      image: BGYellow,
      number: stats.totalAcademicYears,
      color: 'text-our-yellow',
      title: 'مرحلة',
    },
    {
      image: BGGreen,
      number: stats.totalGroups,
      color: 'text-our-green',
      title: 'مجموعة',
    },
    {
      image: BGPink,
      number: stats.totalAdmins,
      color: 'text-our-pink',
      title: 'مشرف',
    },
  ]

  return (
    <div className="p-12 bg-our-white-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 rounded-2xl w-full">
      {statusData.map((item, index) => (
        <UserStatusItem key={index} item={item} />
      ))}
    </div>
  )
}

export default UserStatus
