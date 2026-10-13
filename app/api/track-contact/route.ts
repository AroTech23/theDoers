import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { doerId, contactType = 'email' } = body

    if (!doerId) {
      return NextResponse.json({ error: 'Missing doerId' }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Try to record contact event in database if table exists
    try {
      await supabase.from('doer_contact_events').insert({
        doer_id: doerId,
        contact_type: contactType,
        created_at: new Date().toISOString()
      })
    } catch {
      // Table might not be migrated yet; ignore gracefully
    }

    // 2. Increment user contact count if column exists
    try {
      const { data: user } = await supabase
        .from('users')
        .select('contact_count')
        .eq('id', doerId)
        .maybeSingle()

      if (user && typeof user.contact_count === 'number') {
        await supabase
          .from('users')
          .update({ contact_count: user.contact_count + 1 })
          .eq('id', doerId)
      }
    } catch {
      // Column might not exist yet; ignore gracefully
    }

    return NextResponse.json({ success: true, timestamp: Date.now() })
  } catch (error: any) {
    console.error('Contact tracking error:', error)
    return NextResponse.json({ error: error.message || 'Tracking failed' }, { status: 500 })
  }
}
