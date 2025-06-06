"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchDashboardStats } from "@/app/actions/user-stats"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    totalCertificates: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated" && session?.user) {
      fetchData(session.user.id)
    }
  }, [status, session, router])

  const fetchData = async (userId: string) => {
    setIsLoading(true)
    try {
      const data = await fetchDashboardStats(userId)
      setStats(data)
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {   
      return (
        <div className="container px-4 sm:px-6 md:px-8 py-10 md:py-20 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Submissions" value={stats.totalSubmissions} onClick={() => router.push("/dashboard/submissions")} />
        <StatCard title="Pending Review" value={stats.pendingSubmissions} onClick={() => router.push("/dashboard/submissions")} />
        <StatCard title="Approved Submissions" value={stats.approvedSubmissions} onClick={() => router.push("/dashboard/submissions")} />
        <StatCard title="Certificates Earned" value={stats.totalCertificates} onClick={() => router.push("/dashboard/certificates")} />
      </div>
    </div>
  )
}

function StatCard({ title, value, onClick }: { title: string; value: number; onClick: () => void }) {
  return (
    <Card onClick={onClick} className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
