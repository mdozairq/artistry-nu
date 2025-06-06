"use server"

import { db } from "@/lib/firebase/server"

export async function fetchDashboardStats() {
  const usersRef = db.collection("users")
  const tournamentsRef = db.collection("tournaments")
  const submissionsRef = db.collection("submissions")
  const certificatesRef = db.collection("certificates")
  const paymentsRef = db.collection("payments")

  const [
    userSnap,
    tournamentSnap,
    submissionSnap,
    pendingSnap,
    certificateSnap,
    paymentCountSnap,
    paymentSnap,
  ] = await Promise.all([
    usersRef.count().get(),
    tournamentsRef.count().get(),
    submissionsRef.count().get(),
    submissionsRef.where("status", "==", "pending").count().get(),
    certificatesRef.count().get(),
    paymentsRef.count().get(),
    paymentsRef.get(),
  ])

  const payments = paymentSnap.docs.map(doc => doc.data().paid_amount || 0);
  const totalPaymentAmount = Number((payments.reduce((acc: number, amount: number) => acc + amount, 0) / 100).toFixed(2)) || 0;

  return {
    totalUsers: userSnap.data().count,
    totalTournaments: tournamentSnap.data().count,
    totalSubmissions: submissionSnap.data().count,
    pendingSubmissions: pendingSnap.data().count,
    totalCertificates: certificateSnap.data().count,
    totalPayments: paymentCountSnap.data().count,
    totalPaymentAmount: totalPaymentAmount
  }
}
