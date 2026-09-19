import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { setGlobalOptions } from 'firebase-functions/v2';
import { logger } from 'firebase-functions';

initializeApp();
setGlobalOptions({ region: 'europe-west1', maxInstances: 10 });

const db = getFirestore();

/** Topic devices of the Exotour team subscribe to for new-lead push notifications. */
const TEAM_NOTIFICATION_TOPIC = 'exotour-team-leads';

interface SubmitLeadRequest {
  agencyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function assertValidLead(data: unknown): asserts data is SubmitLeadRequest {
  if (typeof data !== 'object' || data === null) {
    throw new HttpsError('invalid-argument', 'Missing lead payload.');
  }

  const payload = data as Record<string, unknown>;
  const requiredStringFields: (keyof SubmitLeadRequest)[] = [
    'agencyName',
    'contactName',
    'email',
    'message',
    'locale'
  ];

  for (const field of requiredStringFields) {
    if (typeof payload[field] !== 'string' || (payload[field] as string).trim().length === 0) {
      throw new HttpsError('invalid-argument', `Field "${field}" is required.`);
    }
  }

  if (typeof payload.phone !== 'string') {
    throw new HttpsError('invalid-argument', 'Field "phone" must be a string.');
  }

  if (!emailPattern.test(payload.email as string)) {
    throw new HttpsError('invalid-argument', 'Field "email" is not a valid email address.');
  }
}

/**
 * Receives a partner qualification lead from the public contact form,
 * persists it to Firestore, and lets the onDocumentCreated trigger below
 * notify the team. Writes never happen directly from the client.
 */
export const submitLead = onCall<SubmitLeadRequest>({ cors: true }, async (request) => {
  assertValidLead(request.data);
  const { agencyName, contactName, email, phone, message, locale } = request.data;

  const docRef = await db.collection('leads').add({
    agencyName: agencyName.trim(),
    contactName: contactName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    message: message.trim(),
    locale,
    status: 'new',
    source: 'website-partnership-form',
    createdAt: FieldValue.serverTimestamp()
  });

  logger.info('New lead created', { leadId: docRef.id });

  return { success: true, leadId: docRef.id };
});

/**
 * Fires whenever a new lead lands in Firestore and pushes a notification to
 * the Exotour team topic via FCM. Team devices/browsers subscribe to
 * `exotour-team-leads` from the (future) partner/admin space.
 */
export const notifyTeamOnNewLead = onDocumentCreated('leads/{leadId}', async (event) => {
  const lead = event.data?.data();
  if (!lead) return;

  try {
    await getMessaging().send({
      topic: TEAM_NOTIFICATION_TOPIC,
      notification: {
        title: 'Nouveau lead Exotour',
        body: `${lead.agencyName} — ${lead.contactName} (${lead.email})`
      },
      data: {
        leadId: event.params.leadId,
        agencyName: String(lead.agencyName ?? ''),
        email: String(lead.email ?? '')
      }
    });
  } catch (error) {
    // No devices subscribed yet (no partner space in this v1) — don't fail the write.
    logger.warn('FCM notification not sent', { error: (error as Error).message });
  }
});
