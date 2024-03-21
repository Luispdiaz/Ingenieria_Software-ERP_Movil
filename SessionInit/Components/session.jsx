import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { SupaClient } from '../../Supabase/supabase'
import { Log_in } from './Log_in'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function Session() {
    const Supa = SupaClient();
    const [session, setSession] = useState<Session | null>(null)
  

    useEffect(() => {
        Supa.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        Supa.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    return (
        <View>
        <Log_in />
        {session && session.user && <Text>{session.user.id}</Text>}
        </View>
    )
}