import Head from "next/head"
import Link from "next/link"

import { AuthLayout } from "@/components/AuthLayout"
import { Button } from "@/components/Button"
import { SelectField, TextField } from "@/components/Fields"
import { Logo } from "@/components/Logo"
import { redirect } from "next/dist/server/api-utils"

export default function Register() {
  return (
    <>
      <Head>
        <title>Call Call-e</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <span className="text-2xl font-bold text-blue-600">
              Welcome to CALL-E
            </span>
          </Link>
          <div className="mt-16">
            <h2 className="text-lg font-semibold text-gray-900">
              Call-E Demo Number:
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Phone: (US) +1 213-267-9794
            </p>
          </div>
        </div>
        <a href="/">
          <Button variant="solid" color="blue" className="mt-20 w-full">
            <span>Return Home</span>
          </Button>
        </a>
      </AuthLayout>
    </>
  )
}
