import { routeLegacyTask } from './ai/legacyTaskRouter'
import { createAdminClient, verifyToken } from './utils/supabase'
import type { UserTier } from '../src/lib/ai/types'

async function getUserTier(userId: string): Promise<UserTier> {
    const supabase = createAdminClient()
    const { data, error } = await supabase
        .from('ready_profiles')
        .select('tier')
        .eq('id', userId)
        .single()

    if (error || !data) {
        return 'free'
    }
    return (data.tier as UserTier) || 'free'
}

export const handler = async (event: any) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }

    try {
        const { rejectionText, context } = JSON.parse(event.body)

        if (!rejectionText) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing rejectionText' }) }
        }

        // Verify User
        const authHeader = event.headers.authorization || event.headers.Authorization
        const { userId, error: authError } = await verifyToken(authHeader)
        if (authError || !userId) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
        }

        // Call AI for rejection coaching using the user's actual tier
        const tier = await getUserTier(userId)
        const result = await routeLegacyTask('rejection-coaching', {
            rejectionText,
            context: context || {}
        }, {
            userId,
            tier,
        })

        if (!result.ok) {
            throw new Error(result.error_message || 'AI generation failed')
        }

        const analysis = (result.output as any)?.data || result.output

        // Optionally save to database for tracking
        try {
            const supabase = createAdminClient()
            await supabase
                .from('rejection_analyses')
                .insert({
                    user_id: userId,
                    rejection_text: rejectionText,
                    analysis: analysis,
                    created_at: new Date().toISOString()
                })
        } catch (dbErr) {
            console.warn('Failed to save rejection analysis:', dbErr)
            // Continue anyway
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                ok: true,
                data: analysis,
                trace_id: result.trace_id
            }),
        }

    } catch (error: any) {
        console.error('Error analyzing rejection:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        }
    }
}
