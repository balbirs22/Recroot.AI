'use client'
import React, { useEffect, useState, useContext } from 'react'
import { supabase } from '@/services/supabaseClient'
import { UserDetailContext } from '@/context/UserDetailContext'

// ✅ Main Provider
function Provider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    CreateNewUser()
  }, [])

  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return

      let { data: Users } = await supabase
        .from('Users')
        .select('*')
        .eq('email', user?.email)

      if (Users?.length === 0) {
        const { data } = await supabase.from('Users').insert([
          {
            name: user?.user_metadata?.name,
            email: user?.email,
            picture: user?.user_metadata?.picture,
          },
        ])
        console.log('Inserted:', data)
        setUser(user)
        return
      }

      setUser(Users[0])
    })
  }

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

// ✅ Hook to consume the context
export const useUser = () => {
  const context = useContext(UserDetailContext)
  return context
}

export default Provider
